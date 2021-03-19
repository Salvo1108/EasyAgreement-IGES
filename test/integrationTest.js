var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
var app = require('../server')
var agent = chai.request.agent(app)

describe('Integration Testing', function () {
  it('Test for /login', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        done()
      })
  })

  it('Test for /index.html', function (done) {
    agent
      .post('/login')
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/index.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /index.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/index.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /compileLAStudent.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAStudent.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /compileLAStudent.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/compileLAStudent.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /compileLAStudent.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAStudent.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /saveStudent', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveStudent')
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /saveStudent no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/saveStudent')
          .redirects(0)
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /saveStudent wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveStudent')
          .redirects(0)
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileStudent', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/compileStudent')
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            expect(res).to.have.header('Content-Type', 'application/pdf')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileStudent no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/compileStudent')
          .redirects(0)
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileStudent wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/compileStudent')
          .redirects(0)
          .send({
            inputAddress: 'Via delle Foglie, 4',
            inputWebSite: 'www.google.it',
            inputContactRecivingName: 'Filomena Ferrucci',
            inputContactRecivingPosition: 'Responsabile',
            inputMentorName: 'Sara Cotto',
            inputMentorPosition: 'Direttrice',
            inputName: 'Danny',
            inputSurname: 'De Vito',
            inputDate: '22/04/1996',
            inputTelephone: '123456789',
            radio1: 'F',
            nationality: 'Italiana',
            inputStudyCycle: '1st Cycle',
            inputAcademicYear1: '19',
            inputAcademicYear2: '20',
            inputSubjectCode: 'Informatica, 05121',
            inputEmail: 'd.devito@studenti.unisa.it',
            inputDepartmentSending: 'Informatica',
            inputContactName: 'Filomena Ferrucci',
            inputContactSending: 'f.ferrucci@unisa.it 123456789',
            inputNameSector: 'Informatica',
            inputDepartmentReciving: 'Google',
            inputCountry: 'America',
            inputSizeEnterprise: '300-500',
            inputMentorInfo: 's.cotto@gmail.com 0987654321',
            inputDateFrom: '06/2020',
            inputDateTo: '06/2021',
            inputHourWork: '8',
            inputTitle: 'Us Academy',
            inputDetailed: 'Learning of Modern and Advanced Technologies',
            inputKnowledge: 'Use of MongoDB, Mocha and Chai',
            inputMonitoring: 'Weekly meeting',
            inputEvaluation: 'Knowledge of the tools',
            inputLenguage: 'english',
            inputLenguageLevel: 'B2'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /fillForm', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/fillForm')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /fillForm no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/fillForm')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fillForm wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/fillForm')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /saveAcademicTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/saveAcademicTutor')
              .send({
                inputCredits: '3',
                vote: 'interview',
                inputRadio1: 'Si',
                inputRadio2: undefined,
                inputCredits2: undefined,
                inputRadio3: undefined,
                inputCheck2: undefined,
                inputRadio4: undefined,
                inputRadio5: undefined
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /saveAcademicTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/saveAcademicTutor')
          .redirects(0)
          .send({
            inputCredits: '3',
            vote: 'interview',
            inputRadio1: 'Si',
            inputRadio2: undefined,
            inputCredits2: undefined,
            inputRadio3: undefined,
            inputCheck2: undefined,
            inputRadio4: undefined,
            inputRadio5: undefined
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /saveAcademicTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveAcademicTutor')
          .redirects(0)
          .send({
            inputCredits: '3',
            vote: 'interview',
            inputRadio1: 'Si',
            inputRadio2: undefined,
            inputCredits2: undefined,
            inputRadio3: undefined,
            inputCheck2: undefined,
            inputRadio4: undefined,
            inputRadio5: undefined
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAcademic')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /fillFormRequest', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .get('/fillFormRequest')
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.be.json
                done()
              })
          })
      })
  })

  it('Test for /fillFormRequest no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/fillFormRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fillFormRequest wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/fillFormRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /disapproveAcademicTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/disapproveAcademicTutor')
              .send({
                msg: 'Compilazione errata'
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /disapproveAcademicTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/disapproveAcademicTutor')
          .redirects(0)
          .send({
            msg: 'Compilazione errata'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /disapproveAcademicTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/disapproveAcademicTutor')
          .redirects(0)
          .send({
            msg: 'Compilazione errata'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAcademic')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileAcademicTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/compileAcademicTutor')
              .send({
                inputCredits: '3',
                vote: 'interview',
                inputRadio1: 'Si',
                inputRadio2: undefined,
                inputCredits2: undefined,
                inputRadio3: undefined,
                inputCheck2: undefined,
                inputRadio4: undefined,
                inputRadio5: undefined
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                expect(res).to.have.header('Content-Type', 'application/pdf')
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /compileAcademicTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/compileAcademicTutor')
          .redirects(0)
          .send({
            inputCredits: '3',
            vote: 'interview',
            inputRadio1: 'Si',
            inputRadio2: undefined,
            inputCredits2: undefined,
            inputRadio3: undefined,
            inputCheck2: undefined,
            inputRadio4: undefined,
            inputRadio5: undefined
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileAcademicTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/compileAcademicTutor')
          .redirects(0)
          .send({
            inputCredits: '3',
            vote: 'interview',
            inputRadio1: 'Si',
            inputRadio2: undefined,
            inputCredits2: undefined,
            inputRadio3: undefined,
            inputCheck2: undefined,
            inputRadio4: undefined,
            inputRadio5: undefined
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAcademic')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /saveExternalTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/saveExternalTutor')
              .send({
                inputRadio1: 'No',
                inputAmount: undefined,
                inputRadio2: 'No',
                inputContribution: undefined,
                inputWeeks: '4',
                inputRadio3: 'No'
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /saveExternalTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/saveExternalTutor')
          .redirects(0)
          .send({
            inputRadio1: 'No',
            inputAmount: undefined,
            inputRadio2: 'No',
            inputContribution: undefined,
            inputWeeks: '4',
            inputRadio3: 'No'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /saveExternalTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveExternalTutor')
          .redirects(0)
          .send({
            inputRadio1: 'No',
            inputAmount: undefined,
            inputRadio2: 'No',
            inputContribution: undefined,
            inputWeeks: '4',
            inputRadio3: 'No'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForExternal')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /disapproveExternalTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/disapproveExternalTutor')
              .send({
                msg: 'Compilazione errata'
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /disapproveExternalTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/disapproveExternalTutor')
          .redirects(0)
          .send({
            msg: 'Compilazione errata'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /disapproveExternalTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/disapproveExternalTutor')
          .redirects(0)
          .send({
            msg: 'Compilazione errata'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForExternal')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileExternalTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/compileExternalTutor')
              .send({
                inputRadio1: 'No',
                inputAmount: undefined,
                inputRadio2: 'No',
                inputContribution: undefined,
                inputWeeks: '4',
                inputRadio3: 'No'
              })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                expect(res).to.have.header('Content-Type', 'application/pdf')
                done()
              })
          })
      })
  }, this.timeout(10000))

  it('Test for /compileExternalTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/compileExternalTutor')
          .redirects(0)
          .send({
            inputRadio1: 'No',
            inputAmount: undefined,
            inputRadio2: 'No',
            inputContribution: undefined,
            inputWeeks: '4',
            inputRadio3: 'No'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /compileExternalTutor wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/compileExternalTutor')
          .redirects(0)
          .send({
            inputRadio1: 'No',
            inputAmount: undefined,
            inputRadio2: 'No',
            inputContribution: undefined,
            inputWeeks: '4',
            inputRadio3: 'No'
          })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForExternal')
            done()
          })
      })
  }, this.timeout(10000))

  it('Test for /getRequests', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequests')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /getRequests no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getRequests')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getRequests wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequests')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /getRequest', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            done()
          })
      })
  })

  it('Test for /getRequest no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getRequest wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /getDetails', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .get('/getDetails')
              .redirects(0)
              .query({ student: 'd.devito@studenti.unisa.it' })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.be.json
                done()
              })
          })
      })
  })

  it('Test for /getDetails no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getDetails')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getDetails wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getDetails')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /getAllRequestVersions', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .get('/getAllRequestVersions')
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.be.json
                done()
              })
          })
      })
  })

  it('Test for /getAllRequestVersions no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getAllRequestVersions')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getAllRequestVersions wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getAllRequestVersions')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /getRequestVersions', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .get('/getRequestVersions')
              .query({ inputVersion: '1' })
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                expect(res).to.have.header('Content-Type', 'application/pdf')
                done()
              })
          })
      })
  })

  it('Test for /getRequestVersions no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getRequestVersions')
          .redirects(0)
          .query({ inputVersion: '1' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getRequestVersions wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequestVersions')
          .redirects(0)
          .query({ inputVersion: '1' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /getVersions', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getVersions')
          .query({ inputVersion: '1' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            expect(res).to.have.header('Content-Type', 'application/pdf')
            done()
          })
      })
  })

  it('Test for /getVersions no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getVersions')
          .redirects(0)
          .query({ inputVersion: '1' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getVersions wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getVersions')
          .redirects(0)
          .query({ inputVersion: '1' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /getAllVersions', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getAllVersions')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /getAllVersions no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getAllVersions')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getAllVersions wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getAllVersions')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /getStatus', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getStatus')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.string
            done()
          })
      })
  })

  it('Test for /getStatus no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getStatus')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getStatus wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getStatus')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /uploadID', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/uploadID')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /uploadID no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/uploadID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /uploadID wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/uploadID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /uploadCV', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/uploadCV')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /uploadCV no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/uploadCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /uploadCV wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/uploadCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /fileviewID', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewID')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            expect(res).to.have.header('Content-Type', 'application/pdf')
            done()
          })
      })
  })

  it('Test for /fileviewID no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/fileviewID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fileviewID wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /fileviewCV', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewCV')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            expect(res).to.have.header('Content-Type', 'application/pdf')
            done()
          })
      })
  })

  it('Test for /fileviewCV no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/fileviewCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fileviewCV wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /fileviewIDRequest', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/fileviewIDRequest')
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                expect(res).to.have.header('Content-Type', 'application/pdf')
                done()
              })
          })
      })
  })

  it('Test for /fileviewIDRequest no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/fileviewIDRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fileviewIDRequest wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewIDRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /fileviewCVRequest', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.ferrucci@unisa.it', password: 'FerFilomena1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getRequest')
          .redirects(0)
          .query({ student: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(302)
            agent
              .post('/fileviewCVRequest')
              .end(function (err, res) {
                if (err) done(err)
                expect(res).status(200)
                expect(res).to.have.header('Content-Type', 'application/pdf')
                done()
              })
          })
      })
  })

  it('Test for /fileviewCVRequest no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/fileviewCVRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /fileviewCVRequest wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'm.popovic@studenti.unisa.it', password: 'PopoMikhail1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/fileviewCVRequest')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /viewLA.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/viewLA.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /viewLA.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/viewLA.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /viewLA.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/viewLA.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /gestioneDocumenti.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneDocumenti.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /gestioneDocumenti.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/gestioneDocumenti.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /gestioneDocumenti.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneDocumenti.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /updateProfile for External Tutor', function (done) {
    agent
      .post('/login')
      .send({ username: 'a.gentile@yahoo.it', password: 'angelo678' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .post('/updateProfile')
          .send({ inputNameE: 'Marco', inputSurnameE: 'Borrelli', inputOrganization: 'Sony' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updateEff')
            done()
          })
      })
  })

  it('Test for /updateProfile for Academic Tutor', function (done) {
    agent
      .post('/login')
      .send({ username: 'p.penna@unisa.it', password: 'PenPaola1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .post('/updateProfile')
          .send({ inputNameAc: 'Antonio', inputSurnameAc: 'Borrelli', inputDepartmentT: 'Economia' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updateEff')
            done()
          })
      })
  })

  it('Test for /updateProfile for Student', function (done) {
    agent
      .post('/login')
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .post('/updateProfile')
          .send({ inputNameS: 'Marco', inputSurnameS: 'Borrelli', inputCity: 'Milano', inputAddress: 'Via Pigno 13', inputDegree: 'Informatica' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updateEff')
            done()
          })
      })
  })

  it('Test for /updateProfile no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/updateProfile')
          .redirects(0)
          .send({ inputNameS: 'Marco', inputSurnameS: 'Borrelli', inputCity: 'Milano', inputAddress: 'Via Pigno 13', inputDegree: 'Informatica' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /profile', function (done) {
    agent
      .post('/login')
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/profile')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /profile no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/profile')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /logout', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/logout')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('logoutEff')
            done()
          })
      })
  })

  it('Test for /signup for Student', function (done) {
    agent
      .post('/signup')
      .redirects(0)
      .send({ radioAccount: 'studente', inputName: 'Mario', inputSurname: 'Cianino', inputEmail: 'm.ciano98@studenti.unisa.it', inputMatricola: '1111111111', inputPassword: 'MarcoCiano98', inputCity: 'Salerno', inputAddress: 'Via Appia, 16', inputCourse: 'Informatica', inputConfirmPassword: 'MarcoCiano98' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('regEff')
        done()
      })
  })

  it('Test for get /', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /signpup for Academic', function (done) {
    agent
      .post('/signup')
      .redirects(0)
      .send({ radioAccount: 'tutorAccademico', inputNameT: 'Alessia', inputSurnameT: 'Amoroso', inputEmailT: 'a.ambruoso99@unisa.it', inputPassword: 'AlessioAmb98', inputDepartmentT: 'Informatica', inputConfirmPassword: 'AlessioAmb98' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('regEff')
        done()
      })
  })

  it('Test for /addHostOrg', function (done) {
    agent
      .post('/login')
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addHostOrg')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /addHostOrg no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/addHostOrg')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addHostOrg wrong user', function (done) {
    agent
      .post('/login')
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addHostOrg')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  })

  it('Test for /addHostOrgF', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addHostOrgF')
          .send({ inputErasmusCode: 'peppo201', inputFacolta: 'ComputerScience', inputAddress: 'via firenze 41', inputSize: '110', inputCountry: 'Germania', inputContacts: '0818933344', inputNameT: 'SoftwareApple' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('insertHEff')
            done()
          })
      })
  })

  it('Test for /addHostOrgF no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/addHostOrgF')
          .send({ inputErasmusCode: 'peppo201', inputFacolta: 'ComputerScience', inputAddress: 'via firenze 41', inputSize: '110', inputCountry: 'Germania', inputContacts: '0818933344', inputNameT: 'SoftwareApple' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addHostOrgF wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addHostOrgF')
          .send({ inputErasmusCode: 'peppo201', inputFacolta: 'ComputerScience', inputAddress: 'via firenze 41', inputSize: '110', inputCountry: 'Germania', inputContacts: '0818933344', inputNameT: 'SoftwareApple' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  })

  it('Test for /addExtTutor', function (done) {
    agent
      .post('/login')
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addExtTutor')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /addExtTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/addExtTutor')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addExtTutor wrong user', function (done) {
    agent
      .post('/login')
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addExtTutor')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  })

  it('Test for /addExtTutorF', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addExtTutorF')
          .send({ inputNameEx: 'Marco', inputSurnameEx: 'Esposito', inputEmailEx: 'peppe9@hotmail.it', inputOrganizationEx: 'Tcc', inputPassword: 'ciaociaociao1', inputRePassword: 'ciaociaociao1' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('insertEff')
            done()
          })
      })
  })

  it('Test for /addExtTutorF no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/addExtTutorF')
          .send({ inputNameEx: 'Marco', inputSurnameEx: 'Esposito', inputEmailEx: 'peppe9@hotmail.it', inputOrganizationEx: 'Tcc', inputPassword: 'ciaociaociao1', inputRePassword: 'ciaociaociao1' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addExtTutorF wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addExtTutorF')
          .send({ inputNameEx: 'Marco', inputSurnameEx: 'Esposito', inputEmailEx: 'peppe9@hotmail.it', inputOrganizationEx: 'Tcc', inputPassword: 'ciaociaociao1', inputRePassword: 'ciaociaociao1' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  })

  it('Test for /deleteHostOrg', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteHostOrg')
          .send({ erasmus: 'sams9797' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)

            expect(res).to.deep.include({ text: 'true' })

            done()
          })
      })
  })

  it('Test for /deleteHostOrg no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/deleteHostOrg')
          .send({ erasmus: 'sams9797' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: '"no"' })
            done()
          })
      })
  })

  it('Test for /deleteExTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteExTutor')
          .send({ email: 'a.lombardo@libero.it' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: 'true' })
            done()
          })
      })
  })

  it('Test for /deleteExTutor no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/deleteExTutor')
          .send({ email: 'a.lombardo@libero.it' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: '"no"' })
            done()
          })
      })
  })

  it('Test for /compileLaExternalTutor.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAExternalTutor.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /compileLaExternalTutor.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/compileLAExternalTutor.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /compileLaExternalTutor.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAExternalTutor.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForExternal')
            done()
          })
      })
  })

  it('Test for /compileLAAcademicTutor.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAAcademicTutor.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /compileLAAcademicTutor.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/compileLAAcademicTutor.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /compileLAAcademicTutor.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/compileLAAcademicTutor.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /viewRequest.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/viewRequest.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /viewRequest.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/viewRequest.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /viewRequest.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/viewRequest.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /request.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/request.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /request.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/request.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /request.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/request.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForTutor')
            done()
          })
      })
  })

  it('Test for /signup.html', function (done) {
    agent
      .get('/signup.html')
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        done()
      })
  })

  it('Test for /getCVState', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getCVState')
          .redirects(0)
          .send({ email: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: 'true' })
            done()
          })
      })
  })

  it('Test for /getIDState', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getIDState')
          .send({ email: 'd.devito@studenti.unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: 'true' })
            done()
          })
      })
  })

  it('Test for /deleteCV', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('DeletedCV')
            done()
          })
      })
  })

  it('Test for /deleteCV no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/deleteCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /deleteCV wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteCV')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /deleteID', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('DeletedID')
            done()
          })
      })
  })

  it('Test for /deleteID no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/deleteID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /deleteID wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteID')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /getConnectedUser', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getConnectedUser')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /updatePassword for Student', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.vitolo@studenti.unisa.it', password: 'VitoFerdi1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/updatePassword')
          .send({ inputOldPassword: 'VitoFerdi1', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updatePassEff')
            done()
          })
      })
  })

  it('Test for /updatePassword for Admin', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'a.marino@unisa.it', password: 'andrea123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/updatePassword')
          .send({ inputOldPassword: 'andrea123', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updatePassEff')
            done()
          })
      })
  })

  it('Test for /updatePassword for Academic Tutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/updatePassword')
          .send({ inputOldPassword: 'RisSimone1', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updatePassEff')
            done()
          })
      })
  })

  it('Test for /updatePassword for External Tutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.brignolo@gmail.com', password: 'silvia345' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/updatePassword')
          .send({ inputOldPassword: 'silvia345', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('updatePassEff')
            done()
          })
      })
  })

  it('Test for /updatePassword no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/updatePassword')
          .redirects(0)
          .send({ inputOldPassword: 'silvia345', inputPassword: 'marco1997', inputConfirmPassword: 'marco1997' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getReceivedMessage', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getReceivedMessage')
          .send({ sender: 'd.devito@studenti.unisa.it' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)

            expect(res).to.be.json

            done()
          })
      })
  })

  it('Test for /setReceivedMessage', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/setReceivedMessage')
          .send({ sender: 'd.devito@studenti.unisa.it', receiver: 's.cotto@gmail.com' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json

            done()
          })
      })
  })

  it('Test for /getReceivedNotification', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getReceivedNotification')
          .send({ sender: 'd.devito@studenti.unisa.it' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: 'true' })
            done()
          })
      })
  })

  it('Test for /setReceivedNotification', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/setReceivedNotification')
          .send({ sender: 'd.devito@studenti.unisa.it' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json

            done()
          })
      })
  })

  it('Test for /insertNotification', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/insertNotification')
          .send({ notifica: { associatedID: 's.cotto@gmail.com', text: { title: 'test', text: 'Questo è il testing' }, date: { hour: '12', minutes: '20', seconds: '10', day: '24', months: '12', year: '2019' } } })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /getAllNotifications', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getAllNotifications')
          .send({ email: 's.cotto@gmail.com' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /removeNotification', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/insertNotification')
          .send({ notifica: { associatedID: 's.cotto@gmail.com', text: { title: 'test', text: 'Questo è il testing' }, date: { hour: '12', minutes: '20', seconds: '10', day: '24', months: '12', year: '2019' } } })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            agent
              .post('/removeNotification')
              .send({ notificationID: res.id })
              .redirects(0)
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.deep.include({ text: 'true' })
                done()
              })
          })
      })
  })

  it('Test for /removeMessage', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveMessage')
          .send({ message: { senderID: 's.cotto@gmail.com', recipientID: 'd.devito@studenti.unisa.it', text: 'sormaaa', date: { hour: '12', minutes: '20', seconds: '10', day: '25', months: '12', year: '2019' } } })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            agent
              .post('/removeMessage')
              .send({ messageID: res.body })
              .redirects(0)
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.deep.include({ text: '{"boolean":true}' })
                done()
              })
          })
      })
  })

  it('Test for /saveMessage', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveMessage')
          .send({ message: { senderID: 'd.devito@studenti.unisa.it', recipientID: 's.cotto@gmail.com', text: 'sormaaa', date: { hour: '12', minutes: '20', seconds: '10', day: '25', months: '12', year: '2019' } } })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /updateMessage', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/saveMessage')
          .send({ message: { senderID: 's.cotto@gmail.com', recipientID: 'd.devito@studenti.unisa.it', text: 'sormaaa', date: { hour: '12', minutes: '20', seconds: '10', day: '25', months: '12', year: '2019' } } })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            agent
              .post('/updateMessage')
              .send({ messageID: res.body })
              .redirects(0)
              .end(function (err, res) {
                if (err) done(err)
                expect(res).to.deep.include({ text: '{"boolean":true}' })
                done()
              })
          })
      })
  })

  it('Test for /getMessages', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getMessages')
          .send({ sender: 'd.devito@studenti.unisa.it', recipient: 's.cotto@gmail.com' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /searchUser student', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/searchUser')
          .send({ type: 'student', search: 'Sara' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /searchUser academicTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/searchUser')
          .send({ type: 'academicTutor', search: 'Danny' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /searchUser externalTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/searchUser')
          .send({ type: 'externalTutor', search: 'Danny' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /toViewList', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.cotto@gmail.com', password: 'sara1234' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/toViewList')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(200)
            done()
          })
      })
  })

  it('Test for /toViewList no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/toViewList')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getUserList host', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getUserList')
          .send({ type: 'host' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /getUserList academicTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getUserList')
          .send({ type: 'academicTutor' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /getUserList externalTutor', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/getUserList')
          .send({ type: 'externalTutor' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })

  it('Test for /toviewInfo host', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/toviewInfo')
          .redirects(0)
          .query({ type: 'host', id: 'appl2020' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(200)
            done()
          })
      })
  })

  it('Test for /toviewInfo academic', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/toviewInfo')
          .redirects(0)
          .query({ type: 'academicTutor', id: 'f.ferrucci@unisa.it' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(200)
            done()
          })
      })
  })

  it('Test for /toviewInfo external', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/toviewInfo')
          .redirects(0)
          .query({ type: 'externalTutor', id: 's.cotto@gmail.com' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.status(200)
            done()
          })
      })
  })

  it('Test for /toviewInfo no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/toviewInfo')
          .redirects(0)
          .query({ type: 'externalTutor', id: 's.cotto@gmail.com' })
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })
})
