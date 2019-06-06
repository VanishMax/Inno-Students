const Strategy = require('passport-local').Strategy
const db = require('./connection')
const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')

let Counter, User
db.getInstance(p_db => {
  User = p_db.collection('users')
  Counter = p_db.collection('counters')
})

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((user, done) => {
    User.findOne({_id: user}, {projection: {password: 0}}, (err, user) => {
      done(null, user)
    })
  })

  passport.use('local-signup', new Strategy({
      passReqToCallback : true
    }, (req, username, password, done) => {
      let body = req.body

      if(body.username && body.password && body.confirmPassword) {
        User.findOne({ username: body.username}, (err, user) => {
          if (err) return done(err)

          if(user) {
            return done(null, false, {message: 'That username already exists'})
          } else {
            if(body.confirmPassword !== body.password) {
              return done(null, false, {message: 'Password is not confirmed'})
            } else {
              Counter.findOneAndUpdate({ _id: 'userid' }, { $inc: { seq: 1 } }, { new: true }, (err, seq) => {
                if (err) return done(err)

                let newUser = {
                  _id: seq.value.seq,
                  username: body.username,
                  role: 'U',
                  password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null),
                  signedDate: moment().format('DD-MM-YYYY'),
                  img: '',
                  website: '',
                  en: {
                    name: '',
                    surname: ''
                  },
                  ru: {
                    name: '',
                    surname: ''
                  }
                }

                User.insertOne(newUser)
                return done(null, newUser)
              })
            }
          }
        })
      } else {
        return done(null, false, {message: 'Please, provide the username, password and the confirmation'})
      }
    })
  )

  passport.use('local-login', new Strategy({
      passReqToCallback : true
    }, (req, username, password, done) => {
    let body = req.body

    User.findOne({ username :  body.username }, (err, user) => {
      if (err) return done(err)

      if (user) {
        if(bcrypt.compareSync(body.password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, {message: 'Wrong password'})
        }
      } else {
        return done(null, false, {message: 'No such user with this username'})
      }
    })
  }))
}

