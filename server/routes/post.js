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
      let creationDate = moment().format('DD-MM-YY')
      let titleToUrl = body.titleEn
        .trim().toLowerCase()
        .substring(0, 30)
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
          views: 0,
          exclusive: '',
          comments: [],
          url: url,
          oldUrl: url,
          sharedWith: [],
          en: {
            title: body.titleEn.trim(),
            lead: '',
            content: '',
            textContent: ''
          },
          ru: {
            title: body.titleRu.trim(),
            lead: '',
            content: '',
            textContent: ''
          }
        }
        Post.insertOne(newPost)

        res.json({url: url})
      } else {
        res.status(400).send()
      }
    })
  })

  // Save titles and leads with different languages
  app.post('/post/edit/text', (req, res) => {
    const id = req.body.post
    const lang = req.body.lang
    const name = req.body.name
    const content = req.body[name]

    if(id && name && content && lang) {
      Post.findOne({_id: id}, (err, post) => {
        if(post) {
          if(req.user && (req.user._id === post.author || req.user.role === 'A'
            || post.sharedWith.indexOf(req.user._id) !== -1)) {

            let field = lang + '.' + name
            Post.findOneAndUpdate({_id: id}, {$set: { [field]: content}})
            res.json({message: 'Done'})
          } else {
            res.json({message: 'Go Fuck Yourself'})
          }
        } else {
          res.json({message: 'Go Fuck Yourself'})
        }
      })
    } else {
      res.json({message: 'No post id, name, content or language provided'})
    }
  })

  // Save image on Amazon S3
  app.post('/post/edit/img', (req, res) => {
    const id = parseInt(req.query.post)

    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {

      // If image was pasted into editor from, like, another language - do nothing
      if(!fields.url || fields.url.indexOf(bucket) === -1) {
        Post.findOne({_id: id}, (err, post) => {
          if(post) {
            if(req.user && (req.user._id === post.author || req.user.role === 'A'
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
      } else {
        res.json({message: 'Done', url: fields.url})
      }
    })
  })

  app.post('/post/images', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOne({_id: id}, {projection: {img: 1, images: 1}}, (err, post) => {
        if(!post) {
          res.json({message: 'No such post'})
        } else {
          res.json({message: 'Done', post: post})
        }
      })
    } else {
      res.json({message: 'No ID provided'})
    }
  })

  // Change Cover image
  app.post('/post/edit/changeCover', (req, res) => {
    const id = parseInt(req.body.post), img = req.body.img
    if(id && img) {
      Post.findOne({_id: id}, (err, post) => {
        if(req.user && (req.user._id === post.author || req.user.role === 'A'
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
        if(req.user && (req.user._id === post.author || req.user.role === 'A'
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
        if(req.user && (req.user._id === post.author || req.user.role === 'A')) {
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

  // Get the stats of the post before publishing
  app.post('/post/publishData', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOne({_id: id}, async (err, post) => {
        if(post) {

          post.author = await User.findOne({_id: post.author}, {projection: {password: 0}})
          if(req.user && (req.user._id === post.author._id || req.user.role === 'A'
            || post.sharedWith.indexOf(req.user._id) !== -1)) {

            res.json(checkPost(post))

          } else {
            res.status(403).json({message: 'Not allowed'})
          }
        } else {
          res.json({message: 'No such post'})
        }
      })
    } else {
      res.json({message: 'No ID provided'})
    }
  })

  // Publish the post, check whether it's an exclusive
  app.post('/post/publish', (req, res) => {
    const id = req.body.post, exclusive = req.body.exclusive
    if(id && exclusive !== undefined) {
      Post.findOne({_id: id}, async (err, post) => {
        if (post) {

          post.author = await User.findOne({_id: post.author}, {projection: {password: 0}})
          if (req.user && (req.user._id === post.author._id || req.user.role === 'A'
            || post.sharedWith.indexOf(req.user._id) !== -1)) {

            if(post.status !== 'A') {
              let publishDate = moment().format('DD-MM-YY')
              let titleToUrl = post.en.title
                .trim().toLowerCase()
                .substring(0, 30)
                .replace(/[^A-Za-z0-9 ]/g, '')
                .replace(/ /g, '-')

              if(titleToUrl !== '') {
                let url = publishDate + '-' + titleToUrl

                if(exclusive) {
                  let check = checkPost(post)
                  Post.findOneAndUpdate({_id: id}, {$set: {
                      exclusive: check.exclusive,
                      status: 'P',
                      publishTime: moment().format('YYYY-MM-DD HH:mm'),
                      url: url
                    }})
                  res.json({message: 'Success', url: url})

                } else {
                  Post.findOneAndUpdate({_id: id}, {$set: {
                      status: 'P',
                      exclusive: '',
                      publishTime: moment().format('YYYY-MM-DD HH:mm'),
                      url: url
                    }})
                  res.json({message: 'Success', url: url})
                }
              } else {
                res.json({message: 'Wrong title'})
              }
            } else {
              // If it was archived - just change status
              Post.findOneAndUpdate({_id: id}, {$set: {status: 'P'}})
              res.json({message: 'Success', url: post.url})
            }
          } else {
            res.status(403).json({message: 'Not allowed'})
          }
        } else {
          res.json({message: 'No such post'})
        }
      })
    } else {
      res.json({message: 'Not enough data'})
    }
  })

  // Archive the post
  app.post('/post/archive', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOne({_id: id}, async (err, post) => {
        if(!err && post) {
          if(req.user._id === post.author || req.user.role === 'A') {
            Post.findOneAndUpdate({_id: id}, {$set: {status: 'A'}})
            res.json({message: 'Archived'})
          } else {
            res.status(403).json({message: 'Not enough privileges'})
          }
        } else {
          res.json({message: 'Nothing to archive'})
        }
      })
    } else {
      res.json({message: 'No id'})
    }
  })

  // Increase views count
  app.post('/post/views', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOneAndUpdate({_id: id}, {$inc: {views: 1}})
      res.json({message: 'Done'})
    } else {
      res.json({message: 'No post id provided'})
    }
  })

  // Get a post page
  app.get('/post/:url', (req, res) => {
    Post.findOne({$or: [{url: req.params.url}, {oldUrl: req.params.url}]}, async (err, post) => {
      if(!err && post) {
        post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
        if(!req.user) {
          server.render(req, res, '/post', {slug: post.url, post: post, role: 'U'})
        } else if(req.user._id === post.author._id || req.user.role === 'A') {
          server.render(req, res, '/post', {slug: post.url, post: post, role: 'A'})
        } else if(post.sharedWith.indexOf(req.user._id) !== -1) {
          server.render(req, res, '/post', {slug: post.url, post: post, role: 'E'})
        }
      } else {
        server.render(req, res, '/post', {post: null, isAuthor: null})
      }
    })
  })

  app.post('/post/:url', (req, res) => {
    Post.findOne({$or: [{url: req.params.url}, {oldUrl: req.params.url}]}, async (err, post) => {
      if(!err && post) {
        post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
        if(!req.user) {
          res.json({slug: post.url, post: post, role: 'U'})
        } else if(req.user._id === post.author._id || req.user.role === 'A') {
          res.json({slug: post.url, post: post, role: 'A'})
        } else if(post.sharedWith.indexOf(req.user._id) !== -1) {
          res.json({slug: post.url, post: post, role: 'E'})
        }
      } else {
        res.json({post: null, isAuthor: null})
      }
    })
  })


  // Get and send posts on index or tag

  app.get(['/', '/tag/:slug'], (req, res) => {
    let match = {
      status: 'P'
    }
    if(req.params.slug) match.tag = req.params.slug.replace(/-/, ' ').toLowerCase()

    aggregatePosts(match, (err, posts) => {
      server.render(req, res, '/' + (req.params.slug ? 'tag' : ''), {slug: req.params.slug || '', posts: posts})
    })
  })

  app.post(['/', '/tag'], (req, res) => {

    let match = {
      status: 'P'
    }
    if(req.query.slug) match.tag = req.query.slug.replace(/ /, '').toLowerCase()

    aggregatePosts(match, (err, posts) => {
      res.json({posts: posts})
    })
  })


  // Delete post
  app.delete('/post/delete', (req, res) => {
    const id = req.body.post
    if(id) {
      Post.findOne({_id: id}, async (err, post) => {
        if(!err && post) {
          if(req.user._id === post.author || req.user.role === 'A') {
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

const aggregatePosts = (match, cb) => {
  Post.aggregate([
    {
      $match : {
        ...match
      }
    }, {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },{
      $unwind: '$author'
    }, {
      $project: {
        'author.signedDate': 0,
        'author.password': 0,
        'author.request': 0,
        'creationDate': 0,
        'sharedWith': 0,
        'en.content': 0,
        'ru.content': 0,
        'comments': 0
      }
    }
  ]).collation({ locale: 'en', strength: 2 }).sort({publishTime: -1}).toArray(cb)
}

const checkPost = (post) => {
  let content = post.en.content ? JSON.parse(post.en.content) : ''
  let contentRu = post.ru.content ? JSON.parse(post.ru.content) : ''

  let data = {
    en: {
      title: post.en.title !== '',
      lead: post.en.lead !== '',
      content: content === '' ? false :
        !(content.blocks[0].type === 'unstyled' && content.blocks[0].text === '')
    },
    ru: {
      title: post.ru.title !== '',
      lead: post.ru.lead !== '',
      content: contentRu === '' ? false :
        !(contentRu.blocks[0].type === 'unstyled' && contentRu.blocks[0].text === '')
    },
    author: {
      en: {
        name: post.author.en.name !== '',
        surname: post.author.en.surname !== ''
      },
      ru: {
        name: post.author.ru.name !== '',
        surname: post.author.ru.surname !== ''
      },
      website: post.author.en.website !== '',
    },
    cover: post.img !== '',
  }

  let codes = [], exclusive = ''
  if( (!data.en.title || !data.en.lead || !data.en.content) && (!data.ru.title || !data.ru.lead || !data.ru.content)) {
    codes.push(0)
  } else if(!data.en.title || !data.en.lead || !data.en.content) {
    codes.push(1)
    exclusive = 'ru'
  } else if(!data.ru.title || !data.ru.lead || !data.ru.content) {
    codes.push(2)
    exclusive = 'en'
  }
  if(!data.cover) codes.push(3)
  if((!data.author.en.name || !data.author.en.surname) && (!data.author.ru.name || !data.author.ru.surname)) {
    codes.push(4)
  } else if(!data.author.en.name || !data.author.en.surname) {
    codes.push(5)
  } else if(!data.author.ru.name || !data.author.ru.surname) {
    codes.push(6)
  }
  if(!data.author.website) codes.push(7)

  return {codes: codes, data: data, exclusive: exclusive, author: post.author.username}
}
