import express from 'express'
import http from 'http'
import path from 'path'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'
import Loadable from 'react-loadable'

import config from '^/config/config'
import goauth from '^/config/googleOauth'
import db from '^/config/connection'

var app = express()
db.initPool()

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())
goauth(passport)

// Serving static files
app.use(express.static("public"))
app.use('/assets', express.static(path.resolve(__dirname, 'assets')))

// hide powered by express
app.disable('x-powered-by')

// start the server
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
Loadable.preloadAll().then(() => server.listen(PORT, '0.0.0.0', function () {
  console.log("The app is running in PORT " + PORT)
}))

import authRoutes from '^/routes/authRoutes'
import smartRoutes from '^/routes/smartRoutes'
import stateRoutes from '^/routes/stateRoutes'
authRoutes(app)
smartRoutes(app)
stateRoutes(app)
