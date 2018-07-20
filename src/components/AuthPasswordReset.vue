<template>
  <AuthContainer>
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

    <ButtonDefault
      v-if="!sendingOut"
      :actionForClick="resetPassword"
      name="Восстановить пароль"
      color="green"
    />
    <BeatLoader v-else/>
    <div v-if="singleErrorMessage" class="static-error">
      {{ singleErrorMessage }}
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'
import BeatLoader from './BeatLoader'

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
      sendingOut: false,
      singleErrorMessage: ''
    }
  },
  components: {
    AuthContainer,
    ButtonDefault,
    BeatLoader
  },
  mixins: [ CommonMethods ],
  methods: {
    resetPassword () {
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
              .then(() => {
                this.$router.push('/')
              })
              .catch((error) => {
                this.showError(error, this)
              })
          })
          .catch(error => {
            this.showError(error, this)
          })
      } else {
        this.singleErrorMessage = 'Пароли не совпадают'
      }
    }
  }
}
</script>

<style scoped>

</style>
