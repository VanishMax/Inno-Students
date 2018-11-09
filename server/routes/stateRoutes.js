import db from '../config/connection'
import MobileDetect from "mobile-detect"
import ssr from '^/render/server'

let News
db.getInstance((p_db) => {
  News = p_db.collection('news')
})

let initialState = {
  isFetching: false,
  mobile: null,
  lang: "en",
  user: undefined
}

export default function (app){
  app.get('/', (req, res) => {
    News.find({published: true}).sort({ _id: -1}).toArray((err, news) => {
      initialState.news = news
      render(app, req, res, initialState)
    })
  })
  app.get('*', (req, res) => {
    render(app, req, res, initialState)
  })
}


function render(app, req, res, initial) {
  if(req.user){ initial.user = req.user.id }
  let md = new MobileDetect(req.headers['user-agent'])
  if(md.mobile() !== null){
    initial.mobile = md.mobile()
  }
  req.originalUrl.split('/')[1] === 'ru' ? initial.lang = "ru" : initial.lang = "en"
  if(req.originalUrl == '/admins' && (req.user === undefined || req.user.isAdmin == false)){
    if(req.user !== undefined){
      res.redirect('/')
    }else{
      res.redirect('/auth/google')
    }
  }else{
    const response = ssr(req, res, initial)
    res.send(response)
  }
}