var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectId

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Appuntamento {
  constructor () {
    this.studentID = null
    this.schedule = null
    this.date = null
  }

  // Getter methods
  
  /**
   * @returns {String} - return studentID
   */
  getStudentID () {
    return this.studentID
  }

  /**
   * @returns {String} - return surnameCommis
   */
  getSchedule () {
    return this.schedule
  }

  /**
   * @returns {String} - return date
   */
  getDate () {
    return this.date
  }

  // setter method
  
  /**
   * set date
   * @param {String} date
   */
  setDate (date) {
    this.date = date
  }

  /**
   * set studentID
   * @param {string} idStudent
   */
  setStudentID (idStudent) {
    this.studentID = idStudent
  }

  /**
   * set Schedule
   * @param {String} orario
   */
  setSchedule(orario) {
    this.schedule = orario
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
 * This method gets all appointment by studentID
 * @param {String} studentID - The all appointment for studentID
 * @returns {Array} - The all appointment
 */
  static getAllAppuntamentiByStudentID (studentID) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Appuntamento').find({ studentID: studentID }).toArray(function (err, result) {
          if (err) reject(err)
          var all = []
          if (result != null) {
            for (var i = 0; result[i] != null; i++) {
              if (result[i].boolean) all.push(result[i])
            }
          }
          resolve(all)
        })
      })
    })
  }
}

module.exports = Appuntamento
