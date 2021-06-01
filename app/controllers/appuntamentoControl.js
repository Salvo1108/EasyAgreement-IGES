const AppuntamentoModel = require('../models/appuntamento')
/**
 * This method retrieves all appointment
* @param {Object} req - The HTTP req
 * @param {Object} res - The HTTP response
 * @returns {Int} - 
 */
exports.getAllAppointments = function () {
  return new Promise(function (resolve, reject) {
    var appointments = AppuntamentoModel.getAllAppuntamenti()
    appointments.then(function (result) {
      if (result.length > 0) {
        resolve(result)
      } else {
        resolve(null)
      }
    })
  })
}

/**
 * This method remove a specific notification
 * @param {String} id - the id of notification to remove
 * @param {Object} res - the HTTP response 
 * @returns {Boolean} - It returns true if the notification was removed successfull, else false
 */
exports.removeNotification = function (id, res) {
  return new Promise(function (resolve, reject) {
    var deleted = NotificationModel.removeNotification(id)
    deleted.then(function (result) {
      resolve(true)
    })
  })
}

/**
 * This method inserts a specific appointment
* @param {Object} req - The HTTP req
 * @param {Object} res - The HTTP res
 * @returns {Boolean}  - This method returns true if the insert of appointment was successfull, else false
 */
exports.insertAppuntamento = function (req, res) {
  return new Promise(function (resolve, reject) {
    var date = req.body.inputDate
    var studentID = req.query.studentID
    var schedule = req.body.inputSchedule
    var appuntamento = new AppuntamentoModel()
    appuntamento.setTitle(studentID)
    appuntamento.setStart(date,schedule)
    var inserted = AppuntamentoModel.insertAppuntamento(appuntamento)
    inserted.then(function (result) {
      resolve(result)
    })
  })
}




/**
 * This method refreshes the message cache
 * @param {String} associatedID - The notification's id
 * @param {Boolean} value - The state cache value
 * @returns {Object} - The update result
  */
exports.refreshNotificationCache = function (associatedId, value) {
  return new Promise(function (resolve, reject) {
    var refresh = NotificationModel.changeStateCache(associatedId, value)
    refresh.then(function (result) {
      resolve(result)
    })
  })
}

/**
 * This method gets all cache of message
 * @param {String} associatedID - The notification's id
 * @returns {Array} - The notification cache
 */
exports.getNotificationCacheState = function (associatedID) {
  return new Promise(function (resolve, reject) {
    var get = NotificationModel.getStateCache(associatedID)
    get.then(function (result) {
      resolve(result)
    })
  })
}
