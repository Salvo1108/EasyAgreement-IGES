var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var appuntamentoControl = require('../app/controllers/appuntamentoControl')

describe('Field test for appuntamentoControl', function () {

  it('Test method Insert Appuntamento- TC_GCol_1.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputDate: '2021-05', inputSchedule: '', studentID_Temp: '0512156789', email_Temp: 'f.califano@studenti.unisa.it'} }
    var insert = appuntamentoControl.insertAppuntamento(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert Appuntamento- TC_GCol_1.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputDate: '2021-0&-11', inputSchedule: '', studentID_Temp: '0512156789', email_Temp: 'f.califano@studenti.unisa.it'} }
    var insert = appuntamentoControl.insertAppuntamento(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert Appuntamento- TC_GCol_1.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputDate: '2021-05-11', inputSchedule: '10', studentID_Temp: '0512156789', email_Temp: 'f.califano@studenti.unisa.it'} }
    var insert = appuntamentoControl.insertAppuntamento(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert Appuntamento- TC_GCol_1.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputDate: '2021-05-11', inputSchedule: '10:?&', studentID_Temp: '0512156789', email_Temp: 'f.califano@studenti.unisa.it'} }
    var insert = appuntamentoControl.insertAppuntamento(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert Appuntamento- TC_GCol_1.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputDate: '2021-05-11', inputSchedule: '10:00', studentID_Temp: '0512156789', email_Temp: 'f.califano@studenti.unisa.it'} }
    var insert = appuntamentoControl.insertAppuntamento(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })
})
