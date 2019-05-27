const path = require('path')

module.exports = (app) => {
  app.get('/robots.txt', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../', 'static/robots.txt'))
  })
}
