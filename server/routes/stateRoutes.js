import MobileDetect from 'mobile-detect'
import ssr from '../render/server'
import db from '../config/connection'

let News
db.getInstance((p_db) => {
  News = p_db.collection('news')
})

const initialState = {
  mobile: null,
  count: 5,
}

export default function (app) {

  app.get('/news/:neew', (req, res, next) => {
    News.findOne({_id: parseInt(req.params.neew)}, (err, neew) => {
      initialState.neew = neew
      next()
    })
  })

  app.get('/', (req, res, next) => {
    News.find({published: true}).sort({ _id: -1}).toArray((err, news) => {
      initialState.news = news
      next()
    })
  })

  app.get('*', (req, res) => {
    const md = new MobileDetect(req.headers['user-agent'])
    const response = ssr(req.url, initialState, md.mobile())
    res.send(response)
  })
}
