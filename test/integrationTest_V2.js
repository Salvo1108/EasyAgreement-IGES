var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var expect = chai.expect
var app = require('../server')
var agent = chai.request.agent(app)

describe('Integration Testing', function () {
  it('Test for /login Commmissario Internazionale', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        done()
      })
  })

  it('Test for /login Studente', function (done) {
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


  it('Test for /login Admin', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'a.marino@unisa.it', password: 'andrea123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        done()
      })
  })

  it('Test for /index.html Commissario Internazionale', function (done) {
    agent
      .post('/login')
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
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


  it('Test for /gestioneColloqui.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneColloqui.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /gestioneColloqui.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/gestioneColloqui.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /gestioneColloqui.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneColloqui.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForCommission')
            done()
          })
      })
  })

  it('Test for /gestioneGraduatoria.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneGraduatoria.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /gestioneGraduatoria.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/gestioneGraduatoria.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /gestioneGraduatoria.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/gestioneGraduatoria.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForCommission')
            done()
          })
      })
  })




  it('Test for /visualizzaCalendario.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/visualizzaCalendario.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /visualizzaCalendario.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/visualizzaCalendario.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /visualizzaCalendario.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/visualizzaCalendario.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForCommission')
            done()
          })
      })
  })

  it('Test for /graduatoriaPunteggio.html', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/graduatoriaPunteggio.html')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /graduatoriaPunteggio.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/graduatoriaPunteggio.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /graduatoriaPunteggio.html wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/graduatoriaPunteggio.html')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })


  it('Test for /getallAppuntamenti for Commissione', function (done) {
    agent
      .post('/login')
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/getallAppuntamenti')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /profile Commissione Internazionale', function (done) {
    agent
      .post('/login')
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
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

  it('Test for /profile no login Commissione Internazionale', function (done) {
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

  it('Test for /logout Commissione Internazionale', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
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

  it('Test for /addCommissioneInternazionale.html', function (done) {
    agent
      .post('/login')
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addCommissioneInternazionale')
          .end(function (err, res) {
            if (err) done(err)
            expect(res).status(200)
            done()
          })
      })
  })

  it('Test for /addCommissioneInternazionale.html no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/addCommissioneInternazionale')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addCommissioneInternazionale.html wrong user', function (done) {
    agent
      .post('/login')
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).status(200)
        agent
          .get('/addCommissioneInternazionale')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  })

  it('Test for /addCommiInter', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addCommiInter')
          .send({ inputNameCI: 'Andrea', inputSurnameCI: 'Scala', inputEmailCI: 'a.scala@gmail.com', inputPassword: 'scaletta12345', inputRePassword: 'scaletta12345'})
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('insertCommiIntern')
            done()
          })
      })
  })

  it('Test for /addCommiInter no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/addCommiInter')
          .send({ inputNameCI: 'Andrea', inputSurnameCI: 'Scala', inputEmailCI: 'a.scala@gmail.com', inputPassword: 'scaletta12345', inputRePassword: 'scaletta12345'})
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /addCommiInter wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/addCommiInter')
          .send({ inputNameCI: 'Andrea', inputSurnameCI: 'Scala', inputEmailCI: 'a.scala@gmail.com', inputPassword: 'scaletta12345', inputRePassword: 'scaletta12345'})
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForAdmin')
            done()
          })
      })
  }) 

  it('Test for /deleteCommissioneInternazionale', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'f.intrieri@unisa.it', password: 'filip123' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .post('/deleteCommissioneInternazionale')
          .send({ email: 'a.scala@gmail.com' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)

            expect(res).to.deep.include({ text: 'true' })

            done()
          })
      })
  })

  it('Test for /deleteCommissioneInternazionale no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .post('/deleteCommissioneInternazionale')
          .send({ erasmus: 'a.scala@gmail.com' })
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.deep.include({ text: '"no"' })
            done()
          })
      })
  })

  it('Test for /getGraduatoria', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'd.devito@studenti.unisa.it', password: 'DannyDeVito1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getGraduatoria')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.be.json
            done()
          })
      })
  })


  it('Test for /getGraduatoria no login', function (done) {
    agent
      .get('/logout')
      .end(function (err, res) {
        if (err) done(err)
        agent
          .get('/getGraduatoria')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('cannotAccess')
            done()
          })
      })
  })

  it('Test for /getGraduatoria wrong user', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 's.risso@unisa.it', password: 'RisSimone1' })
      .end(function (err, res) {
        if (err) done(err)
        expect(res).to.have.cookie('logEff')
        agent
          .get('/getGraduatoria')
          .redirects(0)
          .end(function (err, res) {
            if (err) done(err)
            expect(res).to.have.cookie('onlyForStudent')
            done()
          })
      })
  })

  it('Test for /profile Commissario Internazionale', function (done) {
    agent
      .post('/login')
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
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

  it('Test for /profile no login Commissario Internazionale', function (done) {
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

  it('Test for /logout Commissario Internazionale', function (done) {
    agent
      .post('/login')
      .redirects(0)
      .send({ username: 'salvatore.amideo@commis.internazione.com', password: 'salvo123' })
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
})
