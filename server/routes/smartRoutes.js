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
    News.find({published: false}, {'en.title': 1, url: 1, _id: 1}).sort({ _id: -1}).toArray((err, news) => {
      news.length == 0 ? res.json({news: null}) : res.json({news: news})
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

  app.post('/admins/edit/file', (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {

      let id = fields.id,
        url = fields.url,
        oldPath = files.file.path,
        fileExt = files.file.name.split('.').pop(),
        fileName = url + '.' + fileExt,
        newPath = path.join(__dirname, '../../', 'assets/pics/', fileName)

      fs.readFile(oldPath, (err, data) => {
        if(err) console.log(err)
        fs.writeFile(newPath, data, (err) => {
          if(err) console.log(err)
          fs.unlink(oldPath, (err) => {
            if (err) console.log(err)
          })
        })
      })
      News.findOneAndUpdate(
        { _id: parseInt(id) },
        { $set: {previewImage: fileName} },
        {new: true},
        (err, neew) => {
          if(err) console.log(err)
        }
      )
    })
  })
}
