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
  app.get('*', (req, res) => {
    if(req.user){ initialState.user = req.user.id }
    let md = new MobileDetect(req.headers['user-agent'])
    // if(md.mobile() !== null){
    //   initialState.mobile = md.mobile()
    // }
    req.originalUrl.split('/')[1] === 'ru' ? initialState.lang = "ru" : initialState.lang = "en"
    if(req.originalUrl == '/admins' && (req.user === undefined || req.user.isAdmin == false)){
      if(req.user !== undefined){
        res.redirect('/')
      }else{
        res.redirect('/auth/google')
      }
    }else{
      const response = ssr(req, res, initialState)
      res.send(response)
    }
  })
}