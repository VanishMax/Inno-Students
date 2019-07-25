// Util to create an url query string from object

export default (query) => {
  let str = '?';
  for (const x in query) {
    console.log(x === 'lang');
    console.log('');
    console.log('');
    if (x === 'error') str += `message=${query[x].message}&`;
    else if (x === 'lang') str += `${x}=${query[x]}&`;
  }

  // Delete last & char
  return str.substring(0, str.length - 1);
};
