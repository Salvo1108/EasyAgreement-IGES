var hash = require('./hash.js')
var commissioneModel = require('../models/commisioneInter.js')


/**
 * This method deletes an commissarrio
 * @param {String} email - The commissarrio email
 * @param {Object} res - The HTTP res
 * @returns {Boolean}  - This method returns true if the delete of external tutor was successfull, else false
 */
 exports.deleteCommissionInternazionale = function (email, res) {
  return new Promise(function (resolve, reject) {
    var delcommInter = commissioneModel.deleteCommInter(email)
    delExTutor.then(function (result) {
      if (!result) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}



/**
 * This method updates the commission password
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */
exports.update = function (req, res) {
  return new Promise(function (resolve, reject) {
    var oldPassword = req.body.inputOldPassword
    var password = req.body.inputPassword
    var passwordConfirm = req.body.inputConfirmPassword
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
    if (hash.checkPassword(req.session.utente.utente.password.hash, req.session.utente.utente.password.salt, oldPassword)) {
      var passwordHashed = hash.hashPassword(password)
      var checkPass = commissioneModel.updatePassword(passwordHashed, req.session.utente.utente.email)
      /**
          * It checks the result of updatePassword function and updates the Commission session
          * @param  {Object} result - The result of updatePassword function (about Commission)
          * @returns {Boolean} - It returns true and generates an "edit password complete" cookie if result != null, else it returns a reject
          */
      checkPass.then(function (result) {
        if (result != null) {
          req.session.utente.utente = { name: result.getName(), email: result.getEmail(), surname: result.getSurname(), Password: result.getPassword() }
          res.cookie('updatePassEff', '1')
          resolve(true)
        } else { resolve() }
      })
    } else {
      res.cookie('errOldPassword', '1')
      resolve(false)
    }
  })
}

/**
 * This method inserts an commissione internazionale
 * @param {Object} req - The HTTP req
 * @param {Object} res - The HTTP res
 * @returns {Boolean}  - This method returns true if the insert of commissione internazionale was successfull, else false
 */
 exports.addCommisInter = function (req, res) {
  return new Promise(function (resolve, reject) {
    var name = req.body.inputNameCI
    var surname = req.body.inputSurnameCI
    var email = req.body.inputEmailCI
    var password = req.body.inputPassword
    var repassword = req.body.inputRePassword

    var isRight = true
    if (password != repassword) {
      isRight = false
    }

    isRight = true
    if ((name == null) || (name.length <= 1) || (!/^[A-Za-z]+$/.test(name))) {
      res.cookie('errComInterName', '1')
      isRight = false
    }

    if ((surname == null) || (surname.length <= 1) || (!/^[A-Za-z]+$/.test(surname))) {
      res.cookie('errComInterSurname', '1')
      isRight = false
    }

    if ((email == null) || (email.length <= 6) || (!/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?/.test(email))) {
      res.cookie('errComInterEmail', '1')
      isRight = false
    }

    if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
      res.cookie('errPassword', '1')
      isRight = false
    }

    if (repassword != password) {
      res.cookie('errPasswordConfirm', '1')
      isRight = false
    }

    if (!isRight) {
      resolve(false)
      return
    }

    // hashing e salt of password
    var passwordHashed = hash.hashPassword(password)

    // Create external tutor object
    var commission = new commissioneModel()
    commission.setSurname(surname)
    commission.setName(name)
    commission.setEmail(email)
    commission.setPassword(passwordHashed)

    
    commissioneModel.addCommiInter(commission)
    resolve(true)
  })
}
