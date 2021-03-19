var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var documentControl = require('./app/controllers/documentControl.js')
var learningAgreementControl = require('./app/controllers/learningAgreementControl')
var cookieParser = require('cookie-parser')
var signupControl = require('./app/controllers/registerControl.js')
var loginControl = require('./app/controllers/loginControl')
var studentControl = require('./app/controllers/studentControl')
var academicTutorControl = require('./app/controllers/academicTutorControl')
var externalTutorControl = require('./app/controllers/externalTutorControl')
var tutorControl = require('./app/controllers/tutorControl')
var administratorControl = require('./app/controllers/administratorControl')
var messageControl = require('./app/controllers/messageControl')
var requestControl = require('./app/controllers/requestControl')
var notificationControl = require('./app/controllers/notificationControl')
var viewListControl = require('./app/controllers/viewListControl')
var session = require('express-session')
const multer = require('multer')
var fs = require('fs')

const io = require('socket.io')(3000)

const uploadID = (file) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      var ext = ''
      if (file.originalname.split('.').length > 1) {
        ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
      }
      cb(null, file.fieldname + '-id' + ext)
    }
  })
  return multer({ storage: storage }).array(file)
}

const uploadCV = (file) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      var ext = ''
      if (file.originalname.split('.').length > 1) {
        ext = file.originalname.substring(file.originalname.lastIndexOf('.'))
      }
      cb(null, file.fieldname + '-cv' + ext)
    }
  })
  return multer({ storage: storage }).array(file)
}

app.set('view engine', 'ejs')

var connectedClients = {}
var notificationClients = {}

// Loading static files from CSS and Bootstrap module
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules'))
app.use(cookieParser())

app.set('views', path.join(__dirname, '/app/views'))
app.engine('html', require('ejs').renderFile)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'secret_session',
  resave: false,
  saveUninitialized: true
}))

app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})

app.get('/compileLAStudent.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      res.render('compileLAStudent.ejs')
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/viewLA.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      res.render('viewLA.ejs')
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getAllVersions', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var getVersionsPr = learningAgreementControl.getAllVersions(req.session.utente.utente.Email)
      getVersionsPr.then(function (data) {
        if (data) {
          res.send(data)
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getAllRequestVersions', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var getVersionsPr = learningAgreementControl.getAllVersions(req.session.data.studentID)
      getVersionsPr.then(function (data) {
        if (data) {
          res.send(data)
        }
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/gestioneDocumenti.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      res.render('dochandler')
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/fillForm', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var getData = learningAgreementControl.getData(req.session.utente.utente.Email)
      getData.then(function (data) {
        if (data) {
          res.send(data)
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/fillFormRequest', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var getData = learningAgreementControl.getData(req.session.data.data['E-mail'])
      getData.then(function (data) {
        if (data) {
          res.send(data)
        }
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getStatus', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var getStatus = learningAgreementControl.getStatus(req.session.utente.utente.Email)
      getStatus.then(function (status) {
        if (status) {
          res.send(status)
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/compileStudent', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var inputAddressWebSite = req.body.inputAddress + ' ' + req.body.inputWebSite
      var inputContactReciving = req.body.inputContactRecivingName + ' - ' + req.body.inputContactRecivingPosition
      var inputMentor = req.body.inputMentorName + ' - ' + req.body.inputMentorPosition
      var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
        req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
        req.body.inputNameSector, req.body.inputDepartmentReciving, inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, inputContactReciving,
        inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
        req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
      ]
      var sendStudentPr = learningAgreementControl.sendLaStudent(data, res)
      sendStudentPr.then(function (dw) {
        if (dw) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf')
          dw.pipe(res)
        } else {
          res.render('compileLAStudent.ejs')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/compileAcademicTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor') {
      var data = [req.body.inputCredits, req.body.vote, req.body.inputRadio1, req.body.inputRadio2, req.body.inputCredits2, req.body.inputRadio3,
        req.body.inputCheck2, req.body.inputRadio4, req.body.inputRadio5, req.session.data.data['E-mail'] // To change with email of student request
      ]
      var sendTutorPr = learningAgreementControl.sendLaAcademicTutor(data, res)
      sendTutorPr.then(function (dw) {
        if (dw) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf')
          dw.pipe(res)
        } else {
          res.render('compileLAAcademicTutor.ejs')
        }
      })
    } else {
      res.cookie('onlyForAcademic', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/compileExternalTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'externalTutor') {
      var data = [req.body.inputRadio1, req.body.inputAmount, req.body.inputRadio2, req.body.inputContribution, req.body.inputWeeks, req.body.inputRadio3, req.session.data.data['E-mail']]
      var sendTutorPr = learningAgreementControl.sendLaExternalTutor(data, res)
      sendTutorPr.then(function (dw) {
        if (dw) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = LA.pdf')
          dw.pipe(res)
        } else {
          res.render('compileLAExternalTutor.ejs')
        }
      })
    } else {
      res.cookie('onlyForExternal', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/saveStudent', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      if (!req.body.inputEmail) req.body.inputEmail = req.session.utente.utente.Email
      var inputAddressWebSite = req.body.inputAddress + ' ' + req.body.inputWebSite
      var inputContactReciving = req.body.inputContactRecivingName + ' - ' + req.body.inputContactRecivingPosition
      var inputMentor = req.body.inputMentorName + ' - ' + req.body.inputMentorPosition
      var data = [req.body.inputName, req.body.inputSurname, req.body.inputDate, req.body.inputTelephone, req.body.radio1, req.body.nationality, req.body.inputStudyCycle,
        req.body.inputAcademicYear1, req.body.inputAcademicYear2, req.body.inputSubjectCode, req.body.inputEmail, req.body.inputDepartmentSending, req.body.inputContactName, req.body.inputContactSending,
        req.body.inputNameSector, req.body.inputDepartmentReciving, inputAddressWebSite, req.body.inputCountry, req.body.inputSizeEnterprise, inputContactReciving,
        inputMentor, req.body.inputMentorInfo, req.body.inputDateFrom, req.body.inputDateTo, req.body.inputHourWork, req.body.inputTitle, req.body.inputDetailed,
        req.body.inputKnowledge, req.body.inputMonitoring, req.body.inputEvaluation, req.body.inputLenguage, req.body.inputLenguageLevel
      ]
      var saveStudent = learningAgreementControl.saveLaStudent(data, res)
      saveStudent.then(function () {
        res.redirect('compileLAStudent.html')
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/saveAcademicTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor') {
      var data = [req.body.inputCredits, req.body.vote, req.body.inputRadio1, req.body.inputRadio2, req.body.inputCredits2, req.body.inputRadio3,
        req.body.inputCheck2, req.body.inputRadio4, req.body.inputRadio5, req.session.data.studentID // To change with email of student request
      ]
      var saveTutor = learningAgreementControl.saveLaAcademicTutor(data, res)
      saveTutor.then(function () {
        res.redirect('compileLAAcademicTutor.html')
      })
    } else {
      res.cookie('onlyForAcademic', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/saveExternalTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'externalTutor') {
      var data = [req.body.inputRadio1, req.body.inputAmount, req.body.inputRadio2, req.body.inputContribution, req.body.inputWeeks, req.body.inputRadio3, req.session.data.studentID] // To change with email of student request
      var saveTutor = learningAgreementControl.saveLaExternalTutor(data, res)
      saveTutor.then(function () {
        res.redirect('compileLAExternalTutor.html')
      })
    } else {
      res.cookie('onlyForExternal', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/disapproveAcademicTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor') {
      var disapproveTutorPr = learningAgreementControl.disapproveAcademicTutor(req.session.data.studentID, req.body.msg)
      disapproveTutorPr.then(function () {
        res.render('request.ejs')
      })
    } else {
      res.cookie('onlyForAcademic', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/disapproveExternalTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'externalTutor') {
      var disapproveTutorPr = learningAgreementControl.disapproveExternalTutor(req.session.data.studentID, req.body.msg)
      disapproveTutorPr.then(function () {
        res.render('request.ejs')
      })
    } else {
      res.cookie('onlyForExternal', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getVersions', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var getVersionsPr = learningAgreementControl.getAllVersions(req.session.utente.utente.Email)
      getVersionsPr.then(function (data) {
        if (data && req.query.inputVersion) {
          var getVersionPr = learningAgreementControl.getVersion(req.query.inputVersion, req.session.utente.utente.Email)
          getVersionPr.then(function (la) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename = LA_V_' + req.query.inputVersion + '.pdf')
            la.pipe(res)
          })
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getRequestVersions', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var getVersionsPr = learningAgreementControl.getAllVersions(req.session.data.studentID)
      getVersionsPr.then(function (data) {
        if (data && req.query.inputVersion) {
          var getVersionPr = learningAgreementControl.getVersion(req.query.inputVersion, req.session.data.studentID)
          getVersionPr.then(function (la) {
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename = LA_V_' + req.query.inputVersion + '.pdf')
            la.pipe(res)
          })
        }
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/', function (req, res) {
  if (req.session.utente == null) {
    res.sendFile('/app/views/login.html', { root: __dirname })
  } else {
    res.redirect('/index.html')
  }
})

app.get('/compileLAExternalTutor.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'externalTutor') {
      res.render('compileLAExternalTutor.ejs')
    } else {
      res.cookie('onlyForExternal', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/compileLAAcademicTutor.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor') {
      res.render('compileLAAcademicTutor.ejs')
    } else {
      res.cookie('onlyForAcademic', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/viewRequest.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      res.render('viewRequest.ejs')
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/request.html', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      res.render('request.ejs')
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getRequests', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var getRequestsPr = requestControl.getAllRequests(req.session.utente.utente.E_mail) // req.session.utente.utente.Email
      getRequestsPr.then(function (result) {
        res.send(result)
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getDetails', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      res.send(req.session.data)
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/getRequest', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var getDetailsPr = requestControl.getRequestDetails(req.query.student)
      getDetailsPr.then(function (details) {
        req.session.data = details
        res.redirect('/viewRequest.html')
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/signup.html', function (req, res) {
  if (req.session.utente == null) {
    res.sendFile('/app/views/signup.html', { root: __dirname })
  } else {
    res.redirect('/index.html')
  }
})

app.get('/index.html', function (req, res) {
  if (req.session.utente != null) {
    res.render('index')
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/signup', function (req, res) {
  var signupUser = signupControl.signup(req, res)
  signupUser.then(function (result) {
    if (result) {
      res.redirect('/')
    } else {
      res.redirect('/signup.html')
    }
  })
})

app.post('/updateProfile', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var updateS = studentControl.update(req, res)
      updateS.then(function () {
        res.render('profile')
      })
    } else if (req.session.utente.type == 'academicTutor') {
      var updateA = academicTutorControl.update(req, res)
      updateA.then(function () {
        res.render('profile')
      })
    } else if (req.session.utente.type == 'externalTutor') {
      var updateE = externalTutorControl.update(req, res)
      updateE.then(function () {
        res.render('profile')
      })
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/updatePassword', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var updateS = studentControl.updatePassword(req, res)
      updateS.then(function (result) {
        if (result == true) { res.render('profile') } else { res.render('profile') }
      })
    } else
    if (req.session.utente.type == 'academicTutor') {
      var updateAc = academicTutorControl.updatePassword(req, res)
      updateAc.then(function (result) {
        if (result == true) { res.render('profile') } else { res.render('profile') }
      })
    } else
    if (req.session.utente.type == 'externalTutor') {
      var updateE = externalTutorControl.updatePassword(req, res)
      updateE.then(function (result) {
        if (result == true) { res.render('profile') } else { res.render('profile') }
      })
    } else
    if (req.session.utente.type == 'admin') {
      var updateA = administratorControl.update(req, res)
      updateA.then(function () {
        res.render('profile')
      })
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/login', function (request, response) {
  var UserLogin = loginControl.login(request, response)
  UserLogin.then(function (result) {
    if (result != false) {
      request.session.utente = result
      response.redirect('/index.html')
    } else {
      response.redirect('/')
    }
  })
})

app.post('/uploadID', uploadID('filetoupload'), function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var upload = documentControl.idHandler(req.session.utente.utente.Email)
      upload.then(function (result) {
        if (result == '0') {
          fs.unlink('uploads/filetoupload-id.pdf', function (error) {
            if (error) throw error
          })
          res.cookie('SuccessIDCard', '1')
          res.redirect('/gestioneDocumenti.html')
        } else if (result == '1') {
          res.cookie('errorIDUpload', '1')
          res.redirect('/gestioneDocumenti.html')
        } else if (result == '2') {
          res.cookie('beforeDelete', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/uploadCV', uploadCV('filetoupload'), function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var upload = documentControl.cvHandler(req.session.utente.utente.Email, res)
      upload.then(function (result) {
        if (result == '0') {
          fs.unlink('uploads/filetoupload-cv.pdf', function (error) {
            if (error) throw error
          })
          res.cookie('SuccessCV', '1')
          res.redirect('/gestioneDocumenti.html')
        } else if (result == '1') {
          res.cookie('errorCVUpload', '1')
          res.redirect('/gestioneDocumenti.html')
        } else if (result == '2') {
          res.cookie('beforeDelete', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/deleteCV', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var del = documentControl.CVEraser(req.session.utente.utente.Email)
      del.then(function (result) {
        if (result) {
          res.cookie('DeletedCV', '1')
          res.redirect('/gestioneDocumenti.html')
        } else {
          res.cookie('notDeletedCV', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/deleteID', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var del = documentControl.IDEraser(req.session.utente.utente.Email)
      del.then(function (result) {
        if (result) {
          res.cookie('DeletedID', '1')
          res.redirect('/gestioneDocumenti.html')
        } else {
          res.cookie('notDeletedID', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/fileviewID', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var view = documentControl.viewID(req.session.utente.utente.Email)
      view.then(function (result) {
        if (result) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = IDCard.pdf')
          result.pipe(res)
        } else {
          res.cookie('notViewID', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/fileviewIDRequest', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var view = documentControl.viewID(req.session.data.studentID)
      view.then(function (result) {
        if (result) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = IDCard.pdf')
          result.pipe(res)
        } else {
          res.redirect('/viewRequest.html')
        }
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/fileviewCV', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'student') {
      var view = documentControl.viewCV(req.session.utente.utente.Email)
      view.then(function (result) {
        if (result) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = CV.pdf')
          result.pipe(res)
        } else {
          res.cookie('notViewCV', '1')
          res.redirect('/gestioneDocumenti.html')
        }
      })
    } else {
      res.cookie('onlyForStudent', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/profile', function (request, response) {
  if (request.session.utente != null) {
    response.render('profile')
  } else {
    response.cookie('cannotAccess', '1')
    response.redirect('/')
  }
})

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.cookie('logoutEff', '1')
      res.redirect('/')
    }
  })
})

app.post('/getIDState', function (req, res) {
  var get = documentControl.getIDState(req.body.email)
  get.then(function (result) {
    if (result) res.json(true)
    else res.json(false)
  })
})

app.post('/getCVState', function (req, res) {
  var get = documentControl.getCVState(req.body.email)
  get.then(function (result) {
    if (result) res.json(true)
    else res.json(false)
  })
})

app.listen(8080, function () {
  console.log('EasyAgreement Platform listening on port 8080!')
})

io.on('connection', socket => {
  socket.on('subscribe', function (sender) {
    connectedClients[sender] = socket.id
    socket.username = sender
  })
  socket.on('send-chat-message', function (message) {
    messageControl.refreshMessageCache(message.recipientID, message.senderID, true)
    socket.broadcast.to(connectedClients[message.recipientID]).emit('chat-message', socket.username, message)
  })
  socket.on('subscribe-notification', function (receiver) {
    notificationClients[receiver] = socket.id
    socket.username = receiver
  })
  socket.on('send-notification', function (notification) {
    var id = notificationControl.insertNotification(notification)
    notificationControl.refreshNotificationCache(notification.associatedID, true)
    id.then(function (result) {
      notification._id = result
      socket.broadcast.to(notificationClients[notification.associatedID]).emit('receive-notification', socket.username, notification)
    })
  })
})

app.post('/fileviewCVRequest', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'academicTutor' || req.session.utente.type == 'externalTutor') {
      var view = documentControl.viewCV(req.session.data.studentID)
      view.then(function (result) {
        if (result) {
          res.setHeader('Content-Type', 'application/pdf')
          res.setHeader('Content-Disposition', 'attachment; filename = CV.pdf')
          result.pipe(res)
        } else {
          res.redirect('/viewRequest.html')
        }
      })
    } else {
      res.cookie('onlyForTutor', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/getConnectedUser', function (req, res) {
  res.json(req.session.utente)
})

app.post('/getContacts', function (req, res) {
  var get = messageControl.getAllContacts(req.body.type, res)
  get.then(function (result) {
    res.json(result)
  })
})

app.post('/getMessages', function (req, res) {
  var get = messageControl.getAllMessages(req.body.sender, req.body.recipient, res)
  get.then(function (result) {
    res.json(result)
  })
})

app.post('/saveMessage', function (req, res) {
  var save = messageControl.saveMessage(req.body.message, res)
  save.then(function (result) {
    res.json(result)
  })
})

app.post('/removeMessage', function (req, res) {
  var remove = messageControl.removeMessage(req.body.messageID, res)
  remove.then(function (result) {
    res.json(result)
  })
})

app.post('/updateMessage', function (req, res) {
  var update = messageControl.updateMessage(req.body.messageID, req.body.text, res)
  update.then(function (result) {
    res.json(result)
  })
})

app.post('/searchUser', function (req, res) {
  var search = messageControl.searchUser(req.body.type, req.body.search, res)
  search.then(function (result) {
    if (result.type == 'academicTutor') {
      res.json({ student: result.student, external: result.external })
    } else if (result.type == 'student') {
      res.json({ academic: result.academic, external: result.external })
    } else if (result.type == 'externalTutor') {
      res.json({ student: result.student, academic: result.academic })
    }
  })
})

app.post('/getAllNotifications', function (req, res) {
  var get = notificationControl.getAllNotification(req.body.email, res)
  get.then(function (result) {
    res.json(result)
  })
})

app.post('/removeNotification', function (req, res) {
  var remove = notificationControl.removeNotification(req.body.notificationID, res)
  remove.then(function (result) {
    res.json(result)
  })
})

app.post('/insertNotification', function (req, res) {
  var id = notificationControl.insertNotification(req.body.notifica, res)
  id.then(function (result) {
    res.json(id)
  })
})

app.post('/getReceivedNotification', function (req, res) {
  var prom = notificationControl.getNotificationCacheState(req.body.sender)
  prom.then(function (result) {
    if (result) res.json(true)
    else res.json(false)
  })
})

app.post('/setReceivedNotification', function (req, res) {
  var prom = notificationControl.refreshNotificationCache(req.body.sender, false)
  prom.then(function (result) {
    res.json(result)
  })
})

app.post('/getReceivedMessage', function (req, res) {
  var prom = messageControl.getAllCache(req.body.sender)
  prom.then(function (result) {
    var allSenders = []
    for (var i = 0; result[i] != null; i++) {
      allSenders.push(result[i].senderID)
    }
    res.json(allSenders)
  })
})

app.post('/setReceivedMessage', function (req, res) {
  var prom = messageControl.refreshMessageCache(req.body.sender, req.body.receiver, false)
  prom.then(function (result) {
    res.json(result)
  })
})

app.get('/addHostOrg', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'admin') {
      res.render('admin/insorg')
    } else {
      res.cookie('onlyForAdmin', '1')
      res.render('index')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/addHostOrgF', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'admin') {
      var administratorAddHost = tutorControl.addHostOrg(req, res)
      administratorAddHost.then(function (result) {
        if (result) {
          res.cookie('insertHEff', '1')
          res.redirect('/addHostOrg')
        } else {
          res.redirect('/addHostOrg')
        }
      })
    } else {
      res.cookie('onlyForAdmin', '1')
      res.redirect('/index.html')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/addExtTutor', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'admin') {
      res.render('admin/instutor')
    } else {
      res.cookie('onlyForAdmin', '1')
      res.render('index')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/addExtTutorF', function (req, res) {
  if (req.session.utente != null) {
    if (req.session.utente.type == 'admin') {
      var administratorAddTutor = tutorControl.addExtTutor(req, res)
      administratorAddTutor.then(function (result) {
        if (result) {
          res.cookie('insertEff', '1')
          res.redirect('/addExtTutor')
        } else {
          res.cookie('errAlreadyRegEx', '1')
          res.redirect('/addExtTutor')
        }
      })
    } else {
      res.cookie('onlyForAdmin', '1')
      res.render('index')
    }
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.get('/toViewList', function (req, res) {
  if (req.session.utente != null) {
    res.render('viewList')
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/getUserList', function (req, res) {
  var get = viewListControl.retrieveAll(req.body.type)
  get.then(function (result) {
    res.json(result)
  })
})

app.post('/toviewInfo', function (req, res) {
  if (req.session.utente != null) {
    var get
    if (req.query.type == 'host') {
      get = tutorControl.getHostOrganization(req.query.id)
    } else if (req.query.type == 'academicTutor') {
      get = academicTutorControl.getByEmail(req.query.id)
    } else if (req.query.type == 'externalTutor') {
      get = externalTutorControl.getByEmail(req.query.id)
    }
    get.then(function (result) {
      res.render('viewInfo', { type: req.query.type, user: result })
    })
  } else {
    res.cookie('cannotAccess', '1')
    res.redirect('/')
  }
})

app.post('/deleteHostOrg', function (req, res) {
  if (req.session.utente != null && req.session.utente.type == 'admin') {
    var deleteHost = tutorControl.deleteHostOrg(req.body.erasmus, res)
    deleteHost.then(function (result) {
      if (result) {
        res.json(true)
      } else {
        res.json(false)
      }
    })
  } else {
    res.json('no')
  }
})

app.post('/deleteExTutor', function (req, res) {
  if (req.session.utente != null && req.session.utente.type == 'admin') {
    var deleteHost = tutorControl.deleteExTutor(req.body.email, res)
    deleteHost.then(function (result) {
      if (result) {
        res.json(true)
      } else {
        res.json(false)
      }
    })
  } else {
    res.json('no')
  }
})

module.exports = app
