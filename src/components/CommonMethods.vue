<template>
  <div></div>
</template>

<script>
export default {
  name: 'CommonMethods',
  methods: {
    showError (errorMessages, pointer) {
      for (let i in errorMessages) {
        let textError = errorMessages[i][0]
        pointer[i].validationClass = 'error'
        pointer[i].validationText = textError
      }
    },
    clearError (event) {
      let item = event.target.id
      this[item].validationClass = ''
    }
  }
}
</script>

<style scoped>

</style>
