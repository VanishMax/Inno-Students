const db = require('../config/connection')

let User, Post
db.getInstance((p_db) => {
  User = p_db.collection('users')
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

  // Admin's all users
  app.get('/user/users', (req, res) => {
    if(req.user && req.user.role === 'A') {
      User.find({_id: {$ne: req.user._id}}).toArray((err, users) => {
        server.render(req, res, '/user/users', {users: users, user: req.user})
      })
    } else {
      server.render(req, res, '/user/users', {})
    }
  })
  app.post('/user/users', (req, res) => {
    if(req.user && req.user.role === 'A') {
      User.find({_id: {$ne: req.user._id}}).toArray((err, users) => {
        res.json({users: users, user: req.user})
      })
    } else {
      res.json({})
    }
  })


  // Edit User profile: img, role and then text
  app.post('/user/edit/img', (req, res) => {
    if(req.user) {
      User.findOneAndUpdate({_id: req.body._id}, {$set: {img: req.body.img !== '' ? req.body.img : req.user.img}}, (err) => {
        if(err) res.json({message: err.message})
        res.json({message: 'all right'})
      })
    } else {
      res.json({message: 'go fuck yourself'})
    }
  })

  app.post('/user/edit/role', (req, res) => {
    if(req.user && req.user.role === 'A' && req.body.role) {
      User.findOneAndUpdate({_id: req.body._id}, {$set: {role: req.body.role}}, (err) => {
        if(err) res.json({message: err.message})
        res.json({message: 'all right'})
      })
    } else {
      res.json({message: 'go fuck yourself'})
    }
  })

  app.post('/user/edit', (req, res) => {
    const body = req.body
    if(req.user) {
      User.findOne({_id: body._id}, (err, user) => {
        User.findOneAndUpdate({_id: body._id}, {$set: {
            username: body.username !== '' ? body.username : user.username,
            website: body.website !== '' ? body.website : user.website,
            img: body.img !== '' ? body.img : user.img,
            'en.name': body.enName !== '' ? body.enName : user.en.name,
            'en.surname': body.enSurname !== '' ? body.enSurname : user.en.surname,
            'ru.name': body.ruName !== '' ? body.ruName : user.ru.name,
            'ru.surname': body.ruSurname !== '' ? body.ruSurname : user.ru.surname,
          }}, (err) => {
          if(err) res.json({message: err.message})
          res.json({message: 'all right'})
        })
      })
    } else {
      res.json({message: 'go fuck yourself'})
    }
  })
}
