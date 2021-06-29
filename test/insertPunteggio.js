var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var studentControl = require('../app/controllers/studentControl')

describe('Field test for studentControl', function () {

  it('Test method set Punteggio- TC_GG_1.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputPunteggio: '', email_Temp: 'f.califano@studenti.unisa.it'} }
    var setting = studentControl.insertPunteggio(req, res)
    setting.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method set Punteggio- TC_GG_1.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputPunteggio: '12&', email_Temp: 'f.califano@studenti.unisa.it'} }
    var setting = studentControl.insertPunteggio(req, res)
    setting.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method set Punteggio- TC_GG_1.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputPunteggio: '140', email_Temp: 'f.califano@studenti.unisa.it'} }
    var setting = studentControl.insertPunteggio(req, res)
    setting.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

})
