export const CHANGE_LANG = 'CHANGE_LANG'
export const CREATE_NEWS = 'CREATE_NEWS'
export const GET_NEEW = 'GET_NEEW'

export function changeLang(lang){
  return {type: CHANGE_LANG, lang: lang}
}

export function createNews(title, category){
  return {type: CREATE_NEWS, title: title, category: category}
}

export function getNeew(id) {
  return {type: GET_NEEW, id: id}
}
