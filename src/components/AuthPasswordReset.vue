<template>
  <AuthContainer>
    <div class="form-group">
      <label class="form-group__label" for="password">Пароль</label>
      <div class="form-group__input">
        <transition name="slide-fade">
              <span
                v-if="password.validationClass"
                class="form-group__alert"
              >
                {{ password.validationText }}
              </span>
        </transition>
        <input
          :class="password.validationClass"
          v-model="password.value"
          @click = "clearError"
          type="password"
          id="password"
        />
        <span class="form-group__input_bar"></span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-group__label" for="password_confirmation">Повторить пароль</label>
      <div class="form-group__input">
        <transition name="slide-fade">
              <span
                v-if="password_confirmation.validationClass"
                class="form-group__alert"
              >
                {{ password_confirmation.validationText }}
              </span>
        </transition>
        <input
          :class="password_confirmation.validationClass"
          v-model="password_confirmation.value"
          @click = "clearError"
          type="password"
          id="password_confirmation"
        />
        <span class="form-group__input_bar"></span>
      </div>
    </div>
    <div v-if="singleErrorMessage" class="login-alert">
      {{ singleErrorMessage }}
    </div>
    <ButtonDefault
      v-if="!sendingOut"
      :actionForClick="resetPassword"
      name="Восстановить пароль"
      color="green"
    />
    <BeatLoader v-else/>
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
