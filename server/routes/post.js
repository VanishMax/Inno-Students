const db = require('../config/connection')
const fetch = require('isomorphic-unfetch')
const fs = require('fs')
const formidable = require('formidable')
const FormData = require('form-data')
const moment = require('moment')
const bucket = 'http://inno-students.s3.amazonaws.com/'

let Post, Counter, User
db.getInstance((p_db) => {
  Counter = p_db.collection('counters')
  Post = p_db.collection('posts')
  User = p_db.collection('users')
})

module.exports = (app, server) => {

  // Create a post
  app.post('/post/new', (req, res) => {
    const body = req.body
    Counter.findOneAndUpdate({ _id: 'postid' }, { $inc: { seq: 1 } }, { new: true }, (err, seq) => {
      let creationDate = moment().format('YY-MM-DD')
      let titleToUrl = body.titleEn
        .trim().toLowerCase()
        .replace(/[^A-Za-z0-9 ]/g, '')
        .replace(/ /g, '-')

      if(titleToUrl !== '') {
        let url = creationDate + '-' + titleToUrl

        let newPost = {
          _id: seq.value.seq,
          status: 'E', // Possible: P (published), A (archieved), E (editing)
          author: body.user,
          creationDate: moment().format('DD-MM-YYYY'),
          tag: body.tag,
          images: [],
          img: '',
          publishTime: null,
          views: null,
          comments: [],
          url: url,
          sharedWith: [],
          en: {
            title: body.titleEn.trim(),
            lead: '',
            content: ''
          },
          ru: {
            title: body.titleRu.trim(),
            lead: '',
            content: ''
          }
        }
        Post.insertOne(newPost)

        res.json({url: url})
      } else {
        res.status(400).send()
      }
    })
  })

  // Save titles, leads and content with different languages
  app.post('/post/edit/text', (req, res) => {
    Post.findOne({_id: req.body.post}, (err, post) => {
      if(post) {
        if(req.user && (req.user._id === post.author._id || req.user.role === 'A'
          || post.sharedWith.indexOf(req.user._id) !== -1)) {

          let field = req.body.lang + '.' + req.body.name
          Post.findOneAndUpdate({_id: req.body.post}, {$set: {[field]: req.body[req.body.name]}})
          res.json({message: 'Done'})
        } else {
          res.json({message: 'Go Fuck Yourself'})
        }
      } else {
        res.json({message: 'Go Fuck Yourself'})
      }
    })
  })


  // Save image on Amazon S3
  app.post('/post/edit/img', (req, res) => {
    const id = parseInt(req.query.post)

    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {

      Post.findOne({_id: id}, (err, post) => {
        if(post) {
          if(req.user && (req.user._id === post.author._id || req.user.role === 'A'
            || post.sharedWith.indexOf(req.user._id) !== -1)) {

            fs.readFile(files.file['path'], async (err, image) => {
              if (err) throw err

              let name = 'images/' + post.url + '-' + (post.images.length + 1) + '.' + files.file['name'].split('.')[1]

              const formData = new FormData();
              formData.append('key', name)
              formData.append('file', image, {
                filepath: files.file['path'],
                contentType: 'image/jpeg',
              })

              let data = await fetch(bucket, {
                method: 'POST',
                body: formData
              }).then(response => response.status)

              if(data === 204){
                let ready
                if(post.img !== '') {
                  ready = await Post.findOneAndUpdate({_id: id}, {$push: {images: name}})
                } else {
                  ready = await Post.findOneAndUpdate({_id: id}, {$set: {img: name}, $push: {images: name}})
                }
                if(ready) res.json({message: 'Done', url: bucket + name})
              } else {
                res.json({message: 'Cannot upload'})
              }
            })
          } else {
            res.json({message: 'Go Fuck Yourself'})
          }
        } else {
          res.json({message: 'Go Fuck Yourself'})
        }
      })
    })
  })

  // Change Cover image
  app.post('/post/edit/changeCover', (req, res) => {
    const id = parseInt(req.body.post), img = req.body.img
    if(id && img) {
      Post.findOne({_id: id}, (err, post) => {
        if(req.user && (req.user._id === post.author._id || req.user.role === 'A'
          || post.sharedWith.indexOf(req.user._id) !== -1)) {

          Post.findOneAndUpdate({_id: id}, {$set: {img: img}})
          res.json({message: 'Done'})
        } else {
          res.json({message: 'Go Fuck Yourself'})
        }
      })
    } else {
      res.json({message: 'Go Fuck Yourself'})
    }
  })

  // Delete image
  app.post('/post/edit/imgRemove', (req, res) => {
    const id = parseInt(req.body.post), img = req.body.img
    if(id && img) {
      Post.findOne({_id: id}, (err, post) => {
        if(req.user && (req.user._id === post.author._id || req.user.role === 'A'
          || post.sharedWith.indexOf(req.user._id) !== -1)) {

          Post.findOneAndUpdate({_id: id}, {$pull: {images: img}})
          res.json({message: 'Done'})
        } else {
          res.json({message: 'Go Fuck Yourself'})
        }
      })
    } else {
      res.json({message: 'Go Fuck Yourself'})
    }
  })

  // Only author or the admin can share the post
  app.post('/post/edit/share', (req, res) => {
    const id = req.body.post, user = req.body.user, action = req.body.action
    if(id && user) {
      Post.findOne({_id: id}, (err, post) => {
        if(req.user && (req.user._id === post.author._id || req.user.role === 'A')) {
          if(action === 'Share') {
            Post.findOneAndUpdate({_id: id}, {$push: {sharedWith: user}})
            User.findOneAndUpdate({_id: user}, {$push: {accessTo: id}})
            res.json({message: 'Shared'})
          } else if(action === 'Deshare') {
            Post.findOneAndUpdate({_id: id}, {$pull: {sharedWith: user}})
            User.findOneAndUpdate({_id: user}, {$pull: {accessTo: id}})
            res.json({message: 'Deshared'})
          } else {
            res.json({message: 'No action'})
          }
        } else {
          res.status(403).json({message: 'No the author'})
        }
      })
    } else {
      res.status(403).json({message: 'Go Fuck Yourself'})
    }
  })


  // Get a post page
  app.get('/post/:url', (req, res) => {
    Post.findOne({url: req.params.url}, async (err, post) => {
      if(!err && post) {
        post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
        if(!req.user) {
          server.render(req, res, '/post', {slug: req.params.url, post: post, user: {}, role: 'U'})
        } else if(req.user._id === post.author._id || req.user.role === 'A') {
          server.render(req, res, '/post', {slug: req.params.url, post: post, user: req.user, role: 'A'})
        } else if(post.sharedWith.indexOf(req.user._id) !== -1) {
          server.render(req, res, '/post', {slug: req.params.url, post: post, user: req.user, role: 'E'})
        }
      } else {
        server.render(req, res, '/post', {post: null, user: null, isAuthor: null})
      }
    })
  })

  app.post('/post/:url', (req, res) => {
    Post.findOne({url: req.params.url}, async (err, post) => {
      if(!err && post) {
        post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
        if(!req.user) {
          res.json({slug: req.params.url, post: post, user: {}, role: 'U'})
        } else if(req.user._id === post.author._id || req.user.role === 'A') {
          res.json({slug: req.params.url, post: post, user: req.user, role: 'A'})
        } else if(post.sharedWith.indexOf(req.user._id) !== -1) {
          res.json({slug: req.params.url, post: post, user: req.user, role: 'E'})
        }
      } else {
        res.json({post: null, user: null, isAuthor: null})
      }
    })
  })

  // Delete post
  app.delete('/post/delete', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOne({_id: id}, async (err, post) => {
        if(!err && post) {
          if(req.user._id === post.author._id || req.user.role === 'A') {
            Post.remove({_id: id}, true)
            res.json({message: 'Deleted'})
          } else {
            res.status(403).json({message: 'Not enough privileges'})
          }
        } else {
          res.json({message: 'Nothing to delete'})
        }
      })
    } else {
     res.json({message: 'No id'})
    }
  })
}
