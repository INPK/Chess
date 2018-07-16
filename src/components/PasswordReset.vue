<template>
  <div>
    <AlertDefault
      v-if="alert.alive"
      :message="alert.message"
    />
    <form
      v-if="!send"
      @submit.prevent="resetPassword"
    >
      <div>Пароль: </div>
      <input
        :class="password.validationClass"
        v-model="password.value"
        @click = "clearError"
        id="password"
      />
      <span
        v-if="password.validationClass"
        style="color: red;"
      >
        {{ password.validationText }}
      </span>

      <div>Подтверждение пароля: </div>
      <input
        :class="password_confirmation.validationClass"
        v-model="password_confirmation.value"
        @click = "clearError"
        id="password_confirmation"
      />
      <span
        v-if="password_confirmation.validationClass"
        style="color: red;"
      >
        {{ password_confirmation.validationText }}
      </span>

      <button>Восстановить пароль</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'
import CommonMethods from './CommonMethods'

export default {
  name: 'PasswordReset',
  data () {
    return {
      password: {
        validationClass: '',
        validationText: '',
        value: ''
      },
      password_confirmation: {
        validationClass: '',
        validationText: '',
        value: ''
      },
      send: false,
      alert: {
        alive: false,
        message: ''
      }
    }
  },
  components: {
    AlertDefault
  },
  mixins: [ CommonMethods ],
  methods: {
    resetPassword () {
      const alert = this.alert
      if (this.password.value === this.password_confirmation.value) {
        var data = JSON.stringify({
          password: this.password.value,
          password_confirmation: this.password_confirmation.value,
          /** Параметр password_code берётся из url */
          password_code: this.$route.params.password_code
        })
        axios.post('http://172.100.2.15:8000/password/reset', data)
          .then(response => {
            const loginData = {
              apiKey: response.data.api_key,
              companyHashId: response.data.company_hash_id
            }
            this.send = true
            this.$store.dispatch('storeLoginData', loginData)
          })
          .catch(error => {
            const errorMessages = error.response.data
            this.showError(errorMessages, this)
          })
      } else {
        alert.message = 'Пароли не совпадаюь'
        alert.alive = true
      }
      setTimeout(function () {
        alert.alive = false
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
