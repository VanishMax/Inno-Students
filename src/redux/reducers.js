import { CHANGE_LANG, CREATE_NEWS } from './actions'
import axios from 'axios'

function apps( state, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return Object.assign({}, state, { lang: action.lang })

    case CREATE_NEWS:
      axios.post('/admins/create', {title: action.title, category: action.category})
        .then((response) => {
          if(!response.data.news){
            console.log('Something bad happened')
          }else{
            console.log(Object.assign({}, state, { news: response.data.news }))
            return Object.assign({}, state, { news: response.data.news })
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
