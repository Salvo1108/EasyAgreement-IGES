const AppuntamentoModel = require('../models/appuntamento')
var io = require('socket.io-client')
var socket = io.connect('http://localhost:3000')
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
 * This method inserts a specific appointment
* @param {Object} req - The HTTP req
 * @param {Object} res - The HTTP res
 * @returns {Boolean}  - This method returns true if the insert of appointment was successfull, else false
 */
exports.insertAppuntamento = function (req, res) {
  return new Promise(function (resolve, reject) {
    var date = req.body.inputDate
    var dataNotifica = req.body.inputDate
    var studentID = req.query.studentID
    var email = req.query.studentEmail
    var schedule = req.body.inputSchedule
    var appuntamento = new AppuntamentoModel()
    appuntamento.setTitle(studentID)
    appuntamento.setStart(date,schedule)
    var inserted = AppuntamentoModel.insertAppuntamento(appuntamento)
    inserted.then(function (result) {
      var d = new Date()
      var date = { hour: d.getHours().toString().padStart(2, 0), minutes: d.getMinutes().toString().padStart(2, 0), seconds: d.getSeconds().toString().padStart(2, 0), day: d.getDate().toString().padStart(2, 0), month: ((d.getMonth()) + 1).toString().padStart(2, 0), year: d.getFullYear().toString() }
      socket.emit('send-notification', { associatedID: email, text: { title: 'Nuovo Colloquio', text: 'Il Commissario Internazionale ha fissato il colloquio per il giorno ' + dataNotifica + ", ore " + schedule }, date: date })
      resolve(result)
    })
  })
}

