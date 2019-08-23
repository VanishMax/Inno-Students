// Util to create an url query string from object

export default (query) => {
  let str = '?';
  // eslint-disable-next-line no-restricted-syntax
  for (const x in query) {
    if (x === 'error') str += `message=${query[x].message}&`;
    else if (x === 'lang') str += `${x}=${query[x]}&`;
  }

  // Delete last & char
  return str.substring(0, str.length - 1);
};
