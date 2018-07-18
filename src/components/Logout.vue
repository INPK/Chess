<template>
  <AlertDefault v-if="alert.alive"
    :message="alert.message"
    :alertType="alert.alertType"
  />
</template>

<script>
import AlertDefault from './AlertDefault'
import CommonMethods from './CommonMethods'

export default {
  name: 'Logout',
  components: { AlertDefault },
  data () {
    return {
      alert: {
        alive: false,
        alertType: 'danger',
        message: ''
      }
    }
  },
  mixins: [ CommonMethods ],
  created () {
    this.$store.dispatch('destroyApiKey')
      .then(response => {
        this.$router.push('/')
      })
      .catch((error) => {
        const alert = this.alert
        this.alert.message = error.response.data.message
        alert.alive = true
        setTimeout(function () {
          alert.alive = false
        }, 3000)
      })
  }
}
</script>

<style scoped>

</style>
