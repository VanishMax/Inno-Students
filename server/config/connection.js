const { MongoClient } = require('mongodb');
const config = require('./config');

const url = config.mongoURI;

function MongoPool() {}

let pDB;

function initPool(cb) {
  MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    const db = client.db();
    if (err) throw err;

    pDB = db;
    if (cb && typeof (cb) === 'function') cb(pDB);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb) {
  if (!pDB) {
    initPool(cb);
  } else if (cb && typeof (cb) === 'function') cb(pDB);
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;
