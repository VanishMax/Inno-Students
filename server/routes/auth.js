const passport = require('passport')
const db = require('../config/connection')

let User
db.getInstance((p_db) => {
  User = p_db.collection('users')
})

module.exports = (app, server) => {

  app.post('/user/signup', (req, res, next) => {
    passport.authenticate('local-signup', {},async function (err, user, message) {
      user = await user

      if (err) return server.render(req, res, '/user/signup', {error: err})
      if (!user) {
        return server.render(req, res, '/user/signup', {error: message})
      } else {
        req.logIn(user, function(err) {
          if (err) return server.render(req, res, '/user/signup', {error: err})
          res.redirect('/')
          return server.render(req, res, '/')
        })
      }
    })(req, res, next)
  })

  app.post('/user/login', function (req, res, next) {
    passport.authenticate('local-login', {},async function (err, user, message) {
      user = await user

      if (err) return server.render(req, res, '/user/login', {error: err})
      if (!user) {
        return server.render(req, res, '/user/login', {error: message})
      } else {
        req.logIn(user, function(err) {
          if (err) return server.render(req, res, '/user/login', {error: err})
          res.redirect('/')
          return server.render(req, res, '/')
        })
      }
    })(req, res, next)
  })

  //Delete User's session - logOut
  app.get('/user/logout', (req, res) => {
    req.logout()
    res.redirect('/')
    server.render(req, res, '/')
  })

  app.post('/user/isAdmin', (req, res) => {
    let isAdmin = false
    if(req.user) {
      if (req.user.role === 'A')  {
        isAdmin = true
      }
    }
    res.send({admin: isAdmin})
  })
}
