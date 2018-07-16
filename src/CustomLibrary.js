
const Error = {
  inputMark: function (errorMessages, pointer) {
    for (let i in errorMessages) {
      let textError = errorMessages[i][0]
      pointer[i].validationClass = 'error'
      pointer[i].validationText = textError
    }
  }
}
