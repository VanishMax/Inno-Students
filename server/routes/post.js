const db = require('../config/connection')
const moment = require('moment')

let Post, Counter
db.getInstance((p_db) => {
  Counter = p_db.collection('counters')
  Post = p_db.collection('posts')
})

module.exports = (app, server) => {

  // My published posts
  app.get('/user/posts', (req, res) => {
    if(req.user) {
      Post.find({status: 'P', author: req.user._id}).toArray((err, posts) => {
        server.render(req, res, '/user/posts', {posts: posts, user: req.user})
      })
    } else {
      server.render(req, res, '/user/posts', {})
    }
  })

  app.post('/user/posts', (req, res) => {
    if (req.user) {
      Post.find({status: 'P', author: req.user._id}).toArray((err, posts) => {
        res.json({posts: posts, user: req.user})
      })
    } else {
      res.json({})
    }
  })

  // My drafts
  app.get('/user/drafts', (req, res) => {
    if(req.user) {
      Post.find({status: 'E', author: req.user._id}).toArray((err, posts) => {
        server.render(req, res, '/user/drafts', {posts: posts, user: req.user})
      })
    } else {
      server.render(req, res, '/user/drafts', {})
    }
  })

  app.post('/user/drafts', (req, res) => {
    if(req.user) {
      Post.find({status: 'E', author: req.user._id}).toArray((err, posts) => {
        res.json({posts: posts, user: req.user})
      })
    } else {
      res.json({})
    }
  })

  // Admin's all drafts
  app.get('/user/alldrafts', (req, res) => {
    if(req.user && req.user.role === 'A') {
      Post.find({status: 'E'}).toArray((err, posts) => {
        server.render(req, res, '/user/alldrafts', {posts: posts, user: req.user})
      })
    } else {
      server.render(req, res, '/user/alldrafts', {})
    }
  })

  app.post('/user/alldrafts', (req, res) => {
    if(req.user && req.user.role === 'A') {
      Post.find({status: 'E'}).toArray((err, posts) => {
        res.json({posts: posts, user: req.user})
      })
    } else {
      res.json({})
    }
  })

  app.post('/post/new', (req, res) => {
    const body = req.body
    Counter.findOneAndUpdate({ _id: 'postid' }, { $inc: { seq: 1 } }, { new: true }, (err, seq) => {
      let creationDate = moment().format('YY-MM-DD')
      let titleToUrl = body.titleEn.trim().toLowerCase().replace(/ /g, '-').replace(/[^A-Za-z0-9]/g, '')

      console.log(titleToUrl)
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
}
