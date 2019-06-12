require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

const config = require('./server/config/config')
const db = require('./server/config/connection')
db.initPool()

server.prepare().then(() => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [config.cookieKey]
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  require('./server/config/localAuth')(passport)

  require('./server/routes/static')(app)
  require('./server/routes/auth')(app, server)
  require('./server/routes/user')(app)
  require('./server/routes/post')(app)

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
