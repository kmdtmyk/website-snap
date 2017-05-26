import Datastore from 'nedb'

const db = new Datastore({
  filename: 'config.db',
  autoload: true,
  onload(){
  },
})

export default class{

  static insert(doc){
    return new Promise((resolve, reject) => {
      db.insert(doc, (error, newDoc) => {
        if(error){
          reject(error)
        }else{
          resolve(newDoc)
        }
      })
    })
  }

  static find(query, options = {}){
    return new Promise((resolve, reject) => {
      const {skip, limit} = options
      const cursor = db.find(query)
      cursor.sort({datetime: 1})
      if(skip){
        cursor.skip(skip)
      }
      if(limit){
        cursor.limit(limit)
      }
      cursor.exec((error, docs) => {
        if(error){
          reject(error)
        }else{
          resolve(docs)
        }
      })
    })
  }

  static findOne(query){
    return new Promise((resolve, reject) => {
      db.findOne(query, (error, docs) => {
        if(error){
          reject(error)
        }else{
          resolve(docs)
        }
      })
    })
  }

  static update(doc){
    return new Promise((resolve, reject) => {
      const {_id} = doc
      db.update({_id}, doc, {}, (error, docs) => {
        if(error){
          reject(error)
        }else{
          resolve(docs)
        }
      })
    })
  }

  static remove(query, options = {}){
    return new Promise((resolve, reject) => {
      db.remove(query, options, (error, numRemoved) => {
        if(error){
          reject(error)
        }else{
          resolve(numRemoved)
        }
      })
    })
  }

}
