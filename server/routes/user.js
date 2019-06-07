const db = require('../config/connection')

let User
db.getInstance((p_db) => {
  User = p_db.collection('users')
})

module.exports = (app) => {

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
