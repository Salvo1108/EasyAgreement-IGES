var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var commissarioControl = require('../app/controllers/commisioneInterControll')

describe('Field test for commissarioControl', function () {

  it('Test method Insert CommissioneInternazionale - TC_GC_3.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: '', inputEmailCI: 'a@b.i', inputPassword: '', inputRePassword: ''} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.2', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: '', inputEmailCI: 'rossiMario@email.fasulla', inputPassword: '', inputRePassword: ''} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.3', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: '', inputEmailCI: 'salvatore.amideo@commis.internazionale.com', inputPassword: '', inputRePassword: ''} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.4', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: '', inputEmailCI: 'rossimario@gmail.com', inputPassword: 'cia', inputRePassword: 'cia'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.5', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: '', inputEmailCI: 'rossimario@gmail.com', inputPassword: 'ciaociao%(hey)&', inputRePassword: 'ciaociao%(hey)&'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.6', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: 'ciaociao11 a', inputEmailCI: 'rossimario@gmail.com ', inputPassword: 'ciaociao11', inputRePassword: 'ciaociao11'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })


  it('Test method Insert CommissioneInternazionale - TC_GC_3.7', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: '', inputSurnameCI: 'Ross124 ', inputEmailCI: 'rossimario@gmail.com ', inputPassword: 'ciaociao11', inputRePassword: 'ciaociao11'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.8', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: 'M', inputSurnameCI: 'Ross ', inputEmailCI: 'rossimario@gmail.com ', inputPassword: 'ciaociao11', inputRePassword: 'ciaociao11'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.9', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: 'Mario1222', inputSurnameCI: 'Ross', inputEmailCI: 'rossimario@gmail.com', inputPassword: 'ciaociao11', inputRePassword: 'ciaociao11'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

  it('Test method Insert CommissioneInternazionale - TC_GC_3.10', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: { inputNameCI: 'Mario', inputSurnameCI: 'Rossi', inputEmailCI: 'rossimario@gmail.com', inputPassword: 'ciaociao11', inputRePassword: 'ciaociao11'} }
    var insert = commissarioControl.addCommisInter(req, res)
    insert.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })
  
})
