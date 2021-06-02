var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/easyagreement'

// Database name
const dbName = 'easyagreement'

class Commission {
  /**
     * Constructor of commission
     * @constructor
     */
  constructor () {
    this.name = null
    this.surname = null
    this.password = null
    this.email = null
  }

  /**
     * Get name
     * @returns {String} - return name
     */
  getName () {
    return this.name
  }

  /**
     * Get surname
     * @returns {String} - return surname
     */
  getSurname () {
    return this.surname
  }

  /**
     * Get password
     * @returns {Object} - return password
     */
  getPassword () {
    return this.password
  }

  /**
     * Get email
     * @returns {String} - return email
     */
  getEmail () {
    return this.email
  }

  /**
     * Set name
     * @param {String} name - name
     */
  setName (name) {
    this.name = name
  }

  /**
     * Set surname
     * @param {String} surname - surname
     */
  setSurname (surname) {
    this.surname = surname
  }

  /**
     * Set password
     * @param {Object} password - password
     */
  setPassword (password) {
    this.password = password
  }

  /**
     * Set email
     * @param {String} email - email
     */
  setEmail (email) {
    this.email = email
  }

  /**
 * Find commission by email
 * @param {String} email- email of commision
 * @returns {boolean} - return true if the object does not exist in database, else false
 */
  static findByEmail (email) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Commission').findOne({ email: email }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var comm = new Commission()
            comm.setEmail(result.email)
            comm.setName(result.name)
            comm.setSurname(result.surname)
            comm.setPassword(result.Password)
            resolve(comm)
          } else {
            resolve(null)
          }
          db.close()
        })
      })
    })
  }

  static addCommiInter (CommiInter) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        dbo.collection('Commission').insertOne(CommiInter, function (err) {
          if (err) throw err
          resolve()
          db.close()
        })
      })
    })
  }

  /**
   * This method update the commission password 
   * @param {String} password - the new commission password 
   * @param {String} emailv - commission email
   * @returns {Object} - It returns the updated commission if result != null, else it returns null
   */
  static updatePassword (pass, emailv) {
    return new Promise(function (resolve, reject) {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) reject(err)
        var dbo = db.db(dbName)
        var myquery = { email: emailv }
        var newvalues = { $set: { Password: pass } }
        dbo.collection('Commission').updateOne(myquery, newvalues, function (err, res) {
          if (err) reject(err)
        })
        dbo.collection('Commission').findOne({ email: emailv }, function (err, result) {
          if (err) reject(err)
          if (result != null) {
            var comm = new Commission()
            comm.setEmail(result.email)
            comm.setName(result.name)
            comm.setSurname(result.surname)
            comm.setPassword(result.Password)
            resolve(comm)
          } else {
            resolve(null)
          }
          db.close()
        })
      })
    })
  }
/**
   * This method deletes an commis by email
   * @param {email} - commissario  email
   * @returns {Boolean} - It returns true if the delete was sucessfull, else false
   */
 static deleteCommInter (email) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) reject(err)
      var dbo = db.db(dbName)
      dbo.collection('Commission').findOneAndDelete({ E_mail: email }, function (err, result) {
        if (err) throw err
        if (result.value != null) {
          resolve(true)
        } else {
          resolve(false)
        }
        db.close()
      })
    })
  })
}
/**
 * Retrieve all commission
 *
 * @returns {promise} - return promise
 */
 static RetrieveAll () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
      if (err) reject(err)
      var dbo = db.db(dbName)

      dbo.collection('Commission').find().toArray(function (err, result) {
        if (err) throw err
        resolve(result)
        db.close()
      })
    })
  })
}
}

module.exports = Commission
