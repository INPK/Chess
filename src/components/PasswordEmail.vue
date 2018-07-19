<template>
  <AuthContainer>
    <div>
      <AlertDefault
        v-if="alert.alive"
        :message="alert.message"
      />
      <div v-if="!send">
        <div
          v-if="sendingOut"
          uk-spinner
        ></div>
        <form @submit.prevent="sentEmailForResetPassword">
          <input id="email" v-model="email" />
          <button>Восстановить пароль</button>
        </form>
      </div>
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'
import AuthContainer from './AuthContainer'

export default {
  name: 'PasswordEmail',
  components: {
    AlertDefault,
    AuthContainer
  },
  data () {
    return {
      email: '',
      send: false,
      sendingOut: false,
      alert: {
        alive: false,
        message: ''
      }
    }
  },
  methods: {
    sentEmailForResetPassword () {
      this.sendingOut = true
      var data = JSON.stringify({ email: this.email })
      const alert = this.alert
      axios.post(this.$rootUrl + '/password/email', data)
        .then(response => {
          alert.message = response.data.message
          alert.alive = true
          this.send = true
        })
        .catch((error) => {
          this.sendingOut = false
          const errorMessage = error.response.data.message
          alert.message = errorMessage
          alert.alive = true
        })
      setTimeout(function () {
        alert.alive = false
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
