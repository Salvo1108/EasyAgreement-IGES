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
  var errMissingFields = getCookie('errMissingFields')
  var errFinancialSupport = getCookie('errFinancialSupport')
  var errContribution = getCookie('errContribution')
  var errWeeks = getCookie('errWeeks')
  var errRequest = getCookie('errRequest')
  var saveSuccess = getCookie('saveSuccess')
  var succRequest = getCookie('succRequest')

  if (errMissingFields == '1') {
    swal('Compila tutti i campi!', '', 'warning')
    document.cookie = 'errMissingFields=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errFinancialSupport == '1') {
    $('#errAmount').css('display', 'block')
    $('#inputAmount').addClass('errClass')
    document.cookie = 'errFinancialSupport=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errContribution == '1') {
    $('#errContribution').css('display', 'block')
    $('#inputContribution').addClass('errClass')
    document.cookie = 'errContribution=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errWeeks == '1') {
    $('#errWeeks').css('display', 'block')
    $('#inputWeeks').addClass('errClass')
    document.cookie = 'errWeeks=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }

  if (errRequest == '1') {
    swal('Non è possibile approvare la richiesta', "Puoi controllare lo stato della richiesta nell'apposita pagina", 'error')
    document.cookie = 'errRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (saveSuccess == '1') {
    swal('Salvataggio effettuato', 'Puoi continuare la compilazione in un secondo momento.', 'success')
    document.cookie = 'saveSuccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
  if (succRequest == '1') {
    swal('Richiesta approvata', "Puoi controllare lo stato della richiesta nell'apposita pagina.", 'success')
    document.cookie = 'succRequest=; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
  }
})
