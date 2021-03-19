/**
 * Take the generate cookie
 * @param {string} cname - The cookie name
 *
 */

function getCookie (cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

$(document).ready(function () {
  var errName = getCookie('errName')
  var errSurname = getCookie('errSurname')
  var errDate = getCookie('errDate')
  var errTelephone = getCookie('errTelephone')
  var errNationality = getCookie('errNationality')
  var errStudyCicle = getCookie('errStudyCicle')
  var errAcademicYear1 = getCookie('errAcademicYear1')
  var errAcademicYear2 = getCookie('errAcademicYear2')
  var errSubjectCode = getCookie('errSubjectCode')
  var errEmail = getCookie('errEmail')
  var errDepartmentSending = getCookie('errDepartmentSending')
  var errContactName = getCookie('errContactName')
  var errContactSending = getCookie('errContactSending')
  var errNameSector = getCookie('errNameSector')
  var errDepartmentReciving = getCookie('errDepartmentReciving')
  var errAddressWebSite = getCookie('errAddressWebSite')
  var errSizeEnterprise = getCookie('errSizeEnterprise')
  var errContactReciving = getCookie('errContactReciving')
  var errMentor = getCookie('errMentor')
  var errMentorInfo = getCookie('errMentorInfo')
  var errDateFrom = getCookie('errDateFrom')
  var errDateTo = getCookie('errDateTo')
  var errHourWork = getCookie('errHourWork')
  var errTitle = getCookie('errTitle')
  var errDetailed = getCookie('errDetailed')
  var errKnowledge = getCookie('errKnowledge')
  var errMonitoring = getCookie('errMonitoring')
  var errEvaluation = getCookie('errEvaluation')
  var errLenguage = getCookie('errLenguage')
  var errRequest = getCookie('errRequest')
  var saveSuccess = getCookie('saveSuccess')
  var succRequest = getCookie('succRequest')

  if (errName == '1') {
    $('#errName').css('display', 'block')
    $('#inputName').addClass('errClass')
    document.cookie = 'errName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSurname == '1') {
    $('#errSurname').css('display', 'block')
    $('#inputSurname').addClass('errClass')
    document.cookie = 'errSurname=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDate == '1') {
    $('#errDate').css('display', 'block')
    $('#inputDate').addClass('errClass')
    document.cookie = 'errDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errTelephone == '1') {
    $('#errTelephone').css('display', 'block')
    $('#inputTelephone').addClass('errClass')
    document.cookie = 'errTelephone=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errNationality == '1') {
    $('#errNationality').css('display', 'block')
    $('#nationality').addClass('errClass')
    document.cookie = 'errNationality=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errStudyCicle == '1') {
    $('#errStudyCicle').css('display', 'block')
    $('#inputStudyCicle').addClass('errClass')
    document.cookie = 'errStudyCicle=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errAcademicYear1 == '1') {
    $('#errAcademicYear1').css('display', 'block')
    $('#inputAcademicYear1').addClass('errClass')
    document.cookie = 'errAcademicYear1=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errAcademicYear2 == '1') {
    $('#errAcademicYear2').css('display', 'block')
    $('#inputAcademicYear2').addClass('errClass')
    document.cookie = 'errAcademicYear2=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSubjectCode == '1') {
    $('#errSubjectCode').css('display', 'block')
    $('#inputSubjectCode').addClass('errClass')
    document.cookie = 'errSubjectCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errEmail == '1') {
    $('#errEmail').css('display', 'block')
    $('#inputEmail').addClass('errClass')
    document.cookie = 'errEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDepartmentSending == '1') {
    $('#errDepartmentSending').css('display', 'block')
    $('#inputDepartmentSending').addClass('errClass')
    document.cookie = 'errDepartmentSending=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errContactName == '1') {
    $('#errContactName').css('display', 'block')
    $('#inputContactName').addClass('errClass')
    document.cookie = 'errContactName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errContactSending == '1') {
    $('#errContactSending').css('display', 'block')
    $('#inputContactSending').addClass('errClass')
    document.cookie = 'errContactSending=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errNameSector == '1') {
    $('#errNameSector').css('display', 'block')
    $('#inputNameSector').addClass('errClass')
    document.cookie = 'errNameSector=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDepartmentReciving == '1') {
    $('#errDepartmentReciving').css('display', 'block')
    $('#inputDepartmentReciving').addClass('errClass')
    document.cookie = 'errDepartmentReciving=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errAddressWebSite == '1') {
    $('#errAddress').css('display', 'block')
    $('#inputAddress').addClass('errClass')
    $('#errWebSite').css('display', 'block')
    $('#inputWebSite').addClass('errClass')
    document.cookie = 'errAddressWebSite=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errSizeEnterprise == '1') {
    $('#errSizeEnterprise').css('display', 'block')
    $('#inputSizeEnterprise').addClass('errClass')
    document.cookie = 'errSizeEnterprise=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errContactReciving == '1') {
    $('#errContactRecivingName').css('display', 'block')
    $('#inputContactRecivingName').addClass('errClass')
    $('#errContactRecivingPosition').css('display', 'block')
    $('#inputContactRecivingPosition').addClass('errClass')
    document.cookie = 'errContactReciving=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errMentor == '1') {
    $('#errMentorName').css('display', 'block')
    $('#inputMentorName').addClass('errClass')
    $('#errMentorPosition').css('display', 'block')
    $('#inputMentorPosition').addClass('errClass')
    document.cookie = 'errMentor=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errMentorInfo == '1') {
    $('#errMentorInfo').css('display', 'block')
    $('#inputMentorInfo').addClass('errClass')
    document.cookie = 'errMentorInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDateFrom == '1') {
    $('#errDateFrom').css('display', 'block')
    $('#inputDateFrom').addClass('errClass')
    document.cookie = 'errDateFrom=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDateTo == '1') {
    $('#errDateTo').css('display', 'block')
    $('#inputDateTo').addClass('errClass')
    document.cookie = 'errDateTo=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errHourWork == '1') {
    $('#errHourWork').css('display', 'block')
    $('#inputHourWork').addClass('errClass')
    document.cookie = 'errHourWork=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errTitle == '1') {
    $('#errTitle').css('display', 'block')
    $('#inputTitle').addClass('errClass')
    document.cookie = 'errTitle=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errDetailed == '1') {
    $('#errDetailed').css('display', 'block')
    $('#inputDetailed').addClass('errClass')
    document.cookie = 'errDetailed=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errKnowledge == '1') {
    $('#errKnowledge').css('display', 'block')
    $('#inputKnowledge').addClass('errClass')
    document.cookie = 'errKnowledge=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errMonitoring == '1') {
    $('#errMonitoring').css('display', 'block')
    $('#inputMonitoring').addClass('errClass')
    document.cookie = 'errMonitoring=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errEvaluation == '1') {
    $('#errEvaluation').css('display', 'block')
    $('#inputEvaluation').addClass('errClass')
    document.cookie = 'errEvaluation=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errLenguage == '1') {
    $('#errLenguage').css('display', 'block')
    $('#inputLenguage').addClass('errClass')
    document.cookie = 'errLenguage=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (errRequest == '1') {
    swal('Richiesta già inviata', "Puoi controllare lo stato della richiesta nell'apposita pagina.", 'error')
    document.cookie = 'errRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (saveSuccess == '1') {
    swal('Salvataggio effettuato', 'Puoi continuare la compilazione in un secondo momento.', 'success')
    document.cookie = 'saveSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (succRequest == '1') {
    swal('Richiesta inviata', "Puoi controllare lo stato della richiesta nell'apposita pagina.", 'success')
    document.cookie = 'succRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
})
