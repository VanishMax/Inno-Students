const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const url = config.mongoURI

function MongoPool(){}

let p_db

function initPool(cb){
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    let db = client.db()
    if (err) throw err

    p_db = db
    if(cb && typeof(cb) == 'function') cb(p_db)
  })
  return MongoPool
}

MongoPool.initPool = initPool

function getInstance(cb){
  if(!p_db){
    initPool(cb)
  } else{
    if(cb && typeof(cb) == 'function') cb(p_db)
  }
}
MongoPool.getInstance = getInstance

module.exports = MongoPool