<template>
  <div></div>
</template>

<script>
export default {
  name: 'CommonMethods',
  methods: {
    showError (errorMessages, pointer) {
      if (errorMessages.single_error) {
        pointer.singleErrorMessage = errorMessages.message
      } else {
        for (let i in errorMessages) {
          let textError = errorMessages[i][0]
          pointer[i].validationClass = 'error'
          pointer[i].validationText = textError
        }
      }
    },
    clearError (event) {
      let item = event.target.id
      this[item].validationClass = ''
    },
    showAlert (errorObject, type, alert) {
      const errorStatus = errorObject.response.status
      if (errorStatus !== 'undefined') {
        const errorMessages = errorObject.response.data
        for (let i in errorMessages) {
          let message = errorMessages[i]
          alert.message = message
        }
      } else {
        alert.message = 'Что-то пошло не так.'
      }
      alert.alive = true
      setTimeout(function () {
        alert.alive = false
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
