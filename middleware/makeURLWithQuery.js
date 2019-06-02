// Util to create an url query string from object

export default query => {
  let str = '?'
  for(let x in query) {
    x === 'error' ?
      str += 'message=' + query[x].message + '&' :
      str += x + '=' + query[x] + '&'
  }

  return str.substring(0, str.length - 1)
}
