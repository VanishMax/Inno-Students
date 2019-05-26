const express = require('express')
const path = require('path')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()

  app.get('/robots.txt', (req, res) => {
    return res.sendFile(path.join(__dirname, 'static/robots.txt'))
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, '0.0.0.0', err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
