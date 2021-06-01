var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Appuntamento {
  constructor () {
    this.title = null
    this.start = null
  }

  // Getter methods
  
  /**
   * @returns {String} - return title
   */
  getTitle () {
    return this.title
  }

  /**
   * @returns {String} - return start
   */
  getStart() {
    return this.start
  }

  // setter method
  
  /**
   * set title
   * @param {String} title
   */
  setTitle (title) {
    this.title = "Studente: " + title
  }

  /**
   * set start
   * @param {string} date
   * @param {string} schedule
   */
  setStart (date,schedule) {
    this.start = date + "T" + schedule + ":00"
  }


  /**
   * This method inserts the appointment
   * @param {Object} appuntamento - the appointment to insert
   * @returns {Promise} - return a promise
   */
  static insertAppuntamento (appuntamento) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Appuntamento').insertOne(appuntamento, function (err, result) {
          if (err) reject(err)
          resolve(result.insertedId)
          db.close()
        })
      })
    })
  }

  /**
   * This method removes the appointment
   * @param {Object} appuntamento- the appointment to remove
   * @param {String} value_date - date appointment
   * @returns {Promise} - return a promise
   */
  static removeAppuntamento (appuntamentoId,value_date) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Appuntamento').deleteOne( { _id: ObjectID(appuntamentoId) }, { date: value_date }, function (err, result) {
          if (err) reject(err)
          db.close()
          resolve(result.deletedCount)
        })
      })
    })
  }

  /**
   * This method gets all appointment 
   * @returns {Promise} - return a promise
   */
  static getAllAppuntamenti () {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Appuntamento').find().toArray(function (err, result) {
          if (err) reject(err)
          resolve(result)
          db.close()
        })
      })
    })
  }
}

module.exports = Appuntamento
