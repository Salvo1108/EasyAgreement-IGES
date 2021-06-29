var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var commissioneInterControl = require('../app/controllers/commisioneInterControll')
var commissioneInterModel = require('../app/models/commisioneInter')

describe('Field test Commissione Internazionale for profileControl', function () {

  it('testing method commissioneInterControl - TC_GC_2.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'M', inputPassword: '', inputConfirmPassword: '' } }
    var updateC = commissioneInterControl.update(req, res)
    updateC.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method commissioneInterControl - TC_GC_2.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: '%&a$’’', inputPassword: '', inputConfirmPassword: '' } }
    var updateC = commissioneInterControl.update(req, res)
    updateC.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method commissioneInterControl - TC_GC_2.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'passwordCiao', inputPassword: '', inputConfirmPassword: '' } }
    var updateC = commissioneInterControl.update(req, res)
    updateC.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method commissioneInterControl - TC_GC_2.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Password1998', inputPassword: 'M', inputConfirmPassword: '' } }
    var updateS = commissioneInterControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method commissioneInterControl - TC_GC_2.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputOldPassword: 'Password1998', inputPassword: '%&a’’', inputConfirmPassword: '' } }
    var updateS = commissioneInterControl.update(req, res)
    updateS.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  }).timeout(4000)

  it('testing method commissioneInterControl - change passw', function (done) {
    var res = mockHttp.createResponse()
    var find = commissioneInterModel.findByEmail('salvatore.amideo@commis.internazione.com')
    find.then(function (result) {
      expect(result).to.not.be.null
      var req = { body: { inputOldPassword: 'salvo123', inputPassword: 'salvo1997', inputConfirmPassword: 'salvo1997' }, session: { utente: { utente: { email: 'salvatore.amideo@commis.internazione.com', Password: { hash: result.getPassword().hash, salt: result.getPassword().salt } } } } }
      var updateS = commissioneInterControl.update(req, res)
      updateS.then(function (result1) {
        expect(result1).to.not.be.null
        done()
      })
    })
  }).timeout(4000)
})
