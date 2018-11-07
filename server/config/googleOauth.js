import passport from 'passport'
import strat from 'passport-google-oauth'
const GoogleStrategy = strat.OAuth2Strategy
import config from './config'
import db from './connection'

export default function oauth(passport) {
  let User
  let Counters
  db.getInstance((p_db) => {
    User = p_db.collection('auth')
    Counters = p_db.collection('counters')
  })

  passport.serializeUser((user, done) => {
    done(null, {id: user._id, isAdmin: user.isAdmin, name: user.name})
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})

        if (existingUser) {
          return done(null, existingUser)
        }

        let newUser = {}
        newUser.googleId = profile.id
        newUser.email = profile.emails[0].value
        newUser.name = profile.displayName
        newUser.isAdmin = false

        Counters.findOneAndUpdate(
          { _id: "userid" },
          { $inc: { seq: 1 } },
          {new: true},
          (err, seq) => {
            if(err) console.log(err)
            newUser._id = seq.value.seq
            User.insertOne( newUser, (err, user) => {
              if (err) {
                return done(err)
              }
              return done(null, user.ops[0])
            })
          }
        )
      }
    )
  )
}