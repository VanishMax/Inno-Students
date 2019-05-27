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
      console.log(user, req.authMessage)
      if (err) return server.render(req, res, '/user/signup', {error: err.message})
      if (!user) {
        return server.render(req, res, '/user/signup', {error: message})
      } else {
        res.redirect('/user')
      }
    })(req, res, next)
  })

  app.post('/user/login', function (req, res, next) {
    passport.authenticate('local-login', {},async function (err, user, message) {
      user = await user
      if (err) return server.render(req, res, '/user/login', {error: err.message})
      if (!user) {
        return server.render(req, res, '/user/login', {error: message})
      } else {
        res.redirect('/user')
      }
    })(req, res, next)
  })

  //Delete User's session - logOut
  app.get('/logout', (req, res) => {
    req.logout()
    server.render(req, res, '/')
  })

  // app.post('/auth/isAdmin', (req, res) => {
  //   let isAdmin = false
  //   if(req.user) {
  //     if (req.user.isAdmin !== undefined)  {
  //       if(req.user.isAdmin === true){
  //         isAdmin = true
  //       }
  //     }
  //   }
  //   res.send({isAdmin: isAdmin})
  // })
}
