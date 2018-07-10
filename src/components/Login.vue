<template>
  <div>
    <AlertDefault
      v-if="alert.alive"
      :message="alert.message"
      :alertType="alert.alertType"
    />
    <form @submit.prevent="login()">
      <input v-model="email" type="email" name="email" value="test3@gmail.com"/>
      <input v-model="password" name="password" value="1234asdf"/>
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import AlertDefault from './AlertDefault'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      alert: {
        alive: false,
        alertType: 'danger',
        message: ''
      }
    }
  },
  components: {
    AlertDefault
  },
  methods: {
    login () {
      this.$store.dispatch('retrieveAuthData', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$router.push('/')
        })
        .catch((error) => {
          const errorStatus = error.response.status
          const alert = this.alert
          if (errorStatus !== 'undefined' && errorStatus === 400) {
            const errorMessages = error.response.data
            for (let i in errorMessages) {
              let message = errorMessages[i]
              this.alert.message = message
            }
          } else {
            this.alert.message = 'Что-то пошло не так.'
          }
          alert.alive = true
          setTimeout(function () {
            alert.alive = false
          }, 3000)
        })
    }
  }
}
</script>

<style scoped>

</style>
