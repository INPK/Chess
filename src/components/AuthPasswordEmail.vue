<template>
  <AuthContainer>
    <div>
      <div v-if="!send">
        <div
          v-if="sendingOut"
          uk-spinner
        ></div>
        <div class="login-title">Сброс пароля</div>
        <form @submit.prevent="sentEmailForResetPassword">

          <div class="form-group">
            <label class="form-group__label" for="email">Email</label>
            <div class="form-group__input">
              <transition name="slide-fade">
                <span
                  v-if="email.validationClass"
                  class="form-group__alert"
                >
                  {{ email.validationText }}
                </span>
              </transition>
              <input
                v-model="email"
                type="email"
                id="email"
              />
              <span class="form-group__input_bar"></span>
            </div>
          </div>
          <div v-if="singleErrorMessage" class="static-error">
            {{ singleErrorMessage }}
          </div>
          <button
            @click="sentEmailForResetPassword"
            class="button-expand"
          >Восстановить пароль</button>
        </form>
      </div>
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'

export default {
  name: 'AuthPasswordEmail',
  data () {
    return {
      email: '',
      send: false,
      sendingOut: false,
      singleErrorMessage: ''
    }
  },
  components: {
    AlertDefault,
    AuthContainer
  },
  mixins: [ CommonMethods ],
  methods: {
    sentEmailForResetPassword () {
      this.sendingOut = true
      const alert = this.alert
      var data = JSON.stringify({ email: this.email })
      axios.post(this.$rootUrl + '/password/email', data)
        .then(response => {
          alert.message = response.data.message
          alert.alive = true
          this.send = true
        })
        .catch((error) => {
          console.info(this.singleErrorMessage)
          const errorMessages = error.response.data
          this.showError(errorMessages, this)
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
