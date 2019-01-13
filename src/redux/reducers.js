import { CHANGE_LANG, CREATE_NEWS, GET_NEEW } from './actions'
import axios from 'axios'

function apps( state, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return Object.assign({}, state, { lang: action.lang })

    case CREATE_NEWS:
      axios.post('/admins/create', {title: action.title, category: action.category})
        .then((response) => {
          if(!response.data.news){ console.log('Something bad happened')
          }else{
            return Object.assign({}, state, { news: response.data.news })
          }
        })
        .catch((error)=>{
          console.log(error)
        })

    case GET_NEEW:
      axios.post('/admins/getOneNews', {id: action.id})
        .then((response) => {
          if(!response.data){
            console.log('Something bad happened')
          }else{
            console.log(Object.assign({}, state, { neew: response.data }))
            return Object.assign({}, state, { neew: response.data })
          }
        })
        .catch((error)=>{
          console.log(error)
        })

    default:
      return state
  }
}

export default apps
