export const CHANGE_LANG = 'CHANGE_LANG'
export const CREATE_NEWS = 'CREATE_NEWS'

export function changeLang(lang){
  return {type: CHANGE_LANG, lang: lang}
}

export function createNews(title, category){
  return {type: CREATE_NEWS, title: title, category: category}
}