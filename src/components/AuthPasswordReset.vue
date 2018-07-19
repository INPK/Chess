<template>
  <AuthContainer>
    <AlertDefault
      v-if="alert.alive"
      :message="alert.message"
    />
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

    <button @clicl="resetPassword">Восстановить пароль</button>
    <div v-if="singleErrorMessage" class="static-error">
      {{ singleErrorMessage }}
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'

export default {
  name: 'AuthPasswordReset',
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
      singleErrorMessage: ''
    }
  },
  components: {
    AlertDefault,
    AuthContainer
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
        axios.post(this.$rootUrl + '/password/reset', data)
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
        this.singleErrorMessage = 'Пароли не совпадают'
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
