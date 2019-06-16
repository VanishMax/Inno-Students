const db = require('../config/connection')
const moment = require('moment')

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

  // Get a post page
  app.get('/post/:url', (req, res) => {
    Post.findOne({url: req.params.url}, async (err, post) => {
      post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
      if(req.user && (req.user._id === post.author._id || req.user.role === 'A')) {
        server.render(req, res, '/post', {slug: req.params.url, post: post, user: req.user, isAuthor: true})
      } else {
        server.render(req, res, '/post', {slug: req.params.url, post: post, user: {}, isAuthor: false})
      }
    })
  })

  app.post('/post/:url', (req, res) => {
    Post.findOne({url: req.params.url}, async (err, post) => {
      if(!err && post) {
        post.author = await User.findOne({_id: post.author}, {projection: {password: 0}});
        if(req.user && (req.user._id === post.author._id || req.user.role === 'A')) {
          res.json({post: post, user: req.user, isAuthor: true})
        } else {
          res.json({post: post, user: {}, isAuthor: false})
        }
      } else {
        res.json({post: null, user: null, isAuthor: null})
      }
    })
  })
}
