<template>
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
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'

export default {
  name: 'PasswordEmail',
  components: { AlertDefault },
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
      axios.post('http://172.100.2.15:8000/password/email', data)
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
