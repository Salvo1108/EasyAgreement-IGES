var hash = require('./hash.js')
var AcademicTutorModel = require('../models/academicTutor.js')
/**
 * This method updates the academic tutor's informations
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */
exports.update = function (req, res) {
  return new Promise(function (resolve, reject) {
    var name = req.body.inputNameAc
    var surname = req.body.inputSurnameAc
    var department = req.body.inputDepartmentT

    var academicTutor = new AcademicTutorModel()

    // Form validation
    var isRight = true

    if (name.length != 0) {
      if (!(/^[A-Za-z]+$/.test(name)) || name.length <= 2) {
        res.cookie('erracademicTutorName', '1')
        isRight = false
      } else {
        academicTutor.setName(name)
      }
    }

    if (surname.length != 0) {
      if (!(/^[A-Za-z]+$/.test(surname)) || surname.length <= 2) {
        res.cookie('erracademicTutorSurname', '1')
        isRight = false
      } else {
        academicTutor.setSurname(surname)
      }
    }

    if (department.length != 0) {
      if (!(/^[A-Za-z]+$/.test(department)) || department.length <= 2) {
        res.cookie('errTutorDepartment', '1')
        isRight = false
      } else {
        academicTutor.setDepartment(department)
      }
    }

    if (!isRight) {
      resolve(false)
      return
    }

    var checkS = AcademicTutorModel.updateAcademicTutor(academicTutor, req.session.utente.utente.E_mail)

    /**
  * This method checks the result of updateAcademicTutor function and updates the academic tutor session
  * @param  {Object} result - The result of updateAcademicTutor function
  * @returns {Boolean} - It returns true and generates an "edit complete" cookie if result != null, else it returns a reject
  */

    checkS.then(function (result) {
      if (result != null) {
        req.session.utente.utente = result
        res.cookie('updateEff', '1')
        resolve()
      } else {
        resolve()
      }
    })
  })
}
/**
 * This method updates the academic tutor's password
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
  */
exports.updatePassword = function (req, res) {
  return new Promise(function (resolve, reject) {
    var oldPassword = req.body.inputOldPassword
    var password = req.body.inputPassword
    var passwordConfirm = req.body.inputConfirmPassword

    // Form Validation
    var isRight = true

    if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
      res.cookie('errOldPassword', '1')
      isRight = false
    }

    if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
      res.cookie('errPassword', '1')
      isRight = false
    }

    if (passwordConfirm != password) {
      res.cookie('errPasswordConfirm', '1')
      isRight = false
    }

    if (!isRight) {
      resolve(false)
      return
    }

    if (hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)) {
      var passwordHashed = hash.hashPassword(password)
      var checkS = AcademicTutorModel.updatePassword(passwordHashed, req.session.utente.utente.E_mail)

      /**
        * It checks the result of updatePassword function and updates the academic tutor session
        * @param  {Object} result - The result of updatePassword function (about Academic Tutor)
        * @returns {Boolean} - It returns true and generates an "edit password complete" cookie if result != null, else it returns a reject
        */
      checkS.then(function (result) {
        if (result != null) {
          req.session.utente.utente = result
          res.cookie('updatePassEff', '1')
          resolve(true)
        } else { resolve() }
      })
    } else {
      res.cookie('errOldPassword', '1')
      resolve(true)
    }
  })
}

/**
 * This method retrieves the academic tutor informations by email
 * @param {String} email - Academic tutor's email to search
 * @returns {JSON} - It returns the JSON object containing the academic tutor's informations
 */
exports.getByEmail = function (email) {
  return new Promise(function (resolve, reject) {
    var get = AcademicTutorModel.RetrieveByEmail(email)
    get.then(function (result) {
      resolve({ Name: result.Name, Surname: result.getSurname(), E_mail: result.getEmail(), Department: result.getDepartment() })
    })
  })
}
