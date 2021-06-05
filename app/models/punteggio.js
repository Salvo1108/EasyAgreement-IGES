var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Punteggio {
  constructor () {
    this.studentID = null
    this.points = null
  }

  // Getter methods
  
  /**
   * @returns {String} - return studendID
   */
  getStudentID () {
    return this.studendID
  }

  /**
   * @returns {String} - return points
   */
  getPoints() {
    return this.points
  }

  // setter method
  
  /**
   * set studendID
   * @param {String} student
   */
  setStudentID (student) {
    this.studentID =  student
  }

  /**
   * set points
   * @param {string} points
   */
  setPoints (points) {
    this.points = points + " Punti"
  }


  /**
   * This method inserts the punteggio
   * @param {Object} punteggio - the punteggio to insert
   * @returns {Promise} - return a promise
   */
  static insertPunteggio (punteggio) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Graduatoria').insertOne(punteggio, function (err, result) {
          if (err) reject(err)
          resolve(result.insertedId)
          db.close()
        })
      })
    })
  }

  /**
   * This method gets all punteggi
   * @returns {Promise} - return a promise
   */
  static getAllPunteggi () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Graduatoria').find().toArray(function (err, result) {
          if (err) reject(err)
          resolve(result)
          db.close()
        })
      })
    })
  }
}

module.exports = Punteggio
