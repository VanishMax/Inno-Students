const db = require('../config/connection')
const moment = require('moment')

let Post, Counter
db.getInstance((p_db) => {
  Counter = p_db.collection('counters')
  Post = p_db.collection('posts')
})

module.exports = (app, server) => {

  app.post('/post/new', (req, res) => {
    const body = req.body
    Counter.findOneAndUpdate({ _id: 'postid' }, { $inc: { seq: 1 } }, { new: true }, (err, seq) => {
      let creationDate = moment().format('YY-MM-DD')
      let titleToUrl = body.titleEn.trim().toLowerCase().replace(/ /g, '-').replace(/[^A-Za-z0-9]/g, '')

      console.log(titleToUrl)
      if(titleToUrl !== '') {
        let url = creationDate + '-' + titleToUrl

        let newPost = {
          _id: seq.value.seq,
          status: 'E', // Possible: P (published), A (archieved), E (editing)
          author: body.user,
          creationDate: moment().format('DD-MM-YYYY'),
          tag: body.tag,
          images: [],
          img: '',
          publishTime: null,
          views: null,
          comments: [],
          url: url,
          en: {
            title: body.titleEn.trim(),
            lead: '',
            content: ''
          },
          ru: {
            title: body.titleRu.trim(),
            lead: '',
            content: ''
          }
        }
        Post.insertOne(newPost)

        res.json({url: url})
      } else {
        res.status(400).send()
      }
    })
  })
}
