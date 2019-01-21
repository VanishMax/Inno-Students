import db from '../config/connection'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import moment from 'moment'

let News
let Counters
db.getInstance((p_db) => {
  News = p_db.collection('news')
  Counters = p_db.collection('counters')
})

export default function (app){
  app.post('/admins/create', (req, res) => {
    News.findOne({ title: req.body.title }, (err, news) => {
      if(news){
        res.send({err: 'This Title already exists'})
      }else{

        let neew = {}
        neew.en = { title: req.body.title }
        neew.ru = {}
        neew.category = req.body.category
        neew.previewImage = ''
        neew.published = false
        neew.images = []
        let url = req.body.title.replace(new RegExp(' ', 'g'), '-')

        Counters.findOneAndUpdate(
          { _id: "newsid" },
          { $inc: { seq: 1 } },
          {new: true},
          (err, seq) => {
            if(err) console.log(err)
            neew._id = seq.value.seq
            neew.url = seq.value.seq + '-' + url
            News.insertOne( neew, (err, newNews) => {
              if (err) {
                console.log(err)
              }
              res.json({news: {edit: true, neew: neew}})
            })
          }
        )
      }
    })
  })
  app.post('/admins/deleteNews', (req, res) => {
    News.deleteOne({ _id: parseInt(req.body.id) })
  })
  app.post('/admins/publishNews', (req, res) => {
    let time = moment().format('HH:mm')
    let date = moment().format('DD-MM-YYYY')
    News.findOneAndUpdate({ _id: parseInt(req.body.id) },
      { $set: { published: true, publishTime: time, publishDate: date }
      })
    res.json({time: time, date: date})
  })

  app.post('/admins/getNewsToEdit', (req, res) => {
    News.find({ published: false }, { 'en.title': 1, url: 1, _id: 1 }).sort({ _id: -1 }).toArray((err, news) => {
      news.length == 0 ? res.json({ news: null }) : res.json({ news: news })
    })
  })
  app.post('/admins/getPublishedNews', (req, res) => {
    News.find({published: true}, {'en.title': 1, url: 1, _id: 1}).sort({ _id: -1}).toArray((err, news) => {
      news.length == 0 ? res.json({news: null}) : res.json({news: news})
    })
  })

  app.post('/admins/getOneNews', (req, res) => {
    News.findOne({_id: parseInt(req.body.id)}, (err, news) => {
      if(err) console.log(err)
      res.json(news)
    })
  })

  app.post('/admins/edit/title', (req, res) => {
    let url = req.body.id + '-' + req.body.title.replace(new RegExp(' ', 'g'), '-')
    News.findOne({_id: parseInt(req.body.id)}, (err, news) => {
      if(err) console.log(err)
      if(news.title == req.body.title){
        res.json({url: false})
      }else{
        News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'en.title': req.body.title, url: url} },
          (err, neew) => {
            if(err) console.log(err)
            res.json({url: url})
          }
        )
      }
    })
  })
  app.post('/admins/edit/titleRu', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'ru.title': req.body.titleRu} })
  })
  app.post('/admins/edit/category', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: { category : req.body.category} })
  })
  app.post('/admins/edit/lead', (req, res) => {
    News.findOne({_id: parseInt(req.body.id)}, {'en.title': 1}, (err, news) => {
      News.findOneAndUpdate({ _id: parseInt(req.body.id) },
        { $set: {'en.lead': req.body.lead, 'en.description': news.en.title + '. ' + req.body.lead} }
      )})
  })
  app.post('/admins/edit/leadRu', (req, res) => {
    News.findOne({_id: parseInt(req.body.id)}, {'ru.title': 1}, (err, news) => {
      News.findOneAndUpdate({ _id: parseInt(req.body.id) },
        { $set: {'ru.lead': req.body.leadRu, 'ru.description': (news.ru.title || '') + '. ' + req.body.leadRu} }
      )})
  })
  app.post('/admins/edit/photosLink', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {photosLink: req.body.photosLink} })
  })
  app.post('/admins/edit/content', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'en.content': req.body.content} })
  })
  app.post('/admins/edit/contentRu', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'ru.content': req.body.content} })
  })
  app.post('/admins/edit/authorName', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'en.authorName': req.body.authorName} })
  })
  app.post('/admins/edit/authorNameRu', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'ru.authorName': req.body.authorNameRu} })
  })
  app.post('/admins/edit/authorLink', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {authorLink: req.body.authorLink} })
  })
  app.post('/admins/edit/keywords', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'en.keywords': req.body.keywords} })
  })
  app.post('/admins/edit/keywordsRu', (req, res) => {
    News.findOneAndUpdate({ _id: parseInt(req.body.id) }, { $set: {'ru.keywords': req.body.keywordsRu} })
  })

  app.post('/admins/edit/contentPicture', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {

      let url = req.headers.referer.split('/')      // localhost:3000/admins/edit/20-Dante2 splitted with slashed
      url = url[url.length - 1]                     // 20-Dante2
      let id = parseInt(url.split('-')[0]) // 20
      let ext = files.file['name'].split('.')       // screen_capture2018.png splitted with dot
      ext = ext[ext.length - 1]                     // png

      News.findOne({ _id: id }, function (err, news) {
        if(!news){
          res.json({ url: files.file['path'] + '/' + files.file['name']})
        } else {

          let fileName = url + '-' + news.images.length + '.' + ext  // 20-Dante2-0.png
          let newPath = path.join(__dirname, '../../', 'assets/pics/', fileName)

          if(news.previewImage) {
            News.findOneAndUpdate({ _id: id }, { $push: { images: fileName } })
          } else {
            News.findOneAndUpdate({ _id: id }, { $set: { previewImage: fileName }, $push: { images: fileName } })
          }

          fs.readFile(files.file['path'], (err, data) => {
            fs.writeFile(newPath, data, (err) => {
              res.json({ url: path.join('../../', 'assets/pics/', fileName) })
            })
          })
        }
      })
    })
  })
}
