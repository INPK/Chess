<template>
  <AuthContainer>
    <div>
      <div v-if="!send">
        <div
          v-if="sendingOut"
          uk-spinner
        ></div>
        <div class="login-title">Сброс пароля</div>
        <form @submit.prevent >
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
                :class="email.validationClass"
                v-model="email.value"
                @click = "clearError"
                type="email"
                id="email"
              />
              <span class="form-group__input_bar"></span>
            </div>
          </div>

          <div v-if="singleErrorMessage" class="login-alert">
            {{ singleErrorMessage }}
          </div>

      <div class="login-button">
        <div>
          <ButtonDefault
            class="button-expand"
            name="Восстановить"
            color="green"
            :actionForClick="sentEmailForResetPassword"
          />
        </div>
        <div class="login-button__register">
          <div class="login-button__register_title">Вспомнили пароль?</div>
          <router-link to="/login" class="link">Авторизуйтесь здесь</router-link>
        </div>
      </div>
        </form>
      </div>
      <div class="login-reset" v-else>
        <div class="login-reset__title">Письмо с информацией для смены пароля отправлено на адрес:</div>
        <div class="login-reset__email">{{ this.email.value }}</div>

        <div class="login-button">
          <div class="login-button__register">
            <div class="login-button__register_title">Вспомнили пароль?</div>
          </div>
          <div class="login-button__register">
            <router-link to="/login" class="link">Авторизуйтесь здесь</router-link>
          </div>
        </div>
     </div>
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import AlertDefault from './AlertDefault'
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'

export default {
  name: 'AuthPasswordEmail',
  data () {
    return {
      email: {
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
    AlertDefault,
    AuthContainer,
    ButtonDefault
  },
  mixins: [ CommonMethods ],
  methods: {
    sentEmailForResetPassword () {
      this.sendingOut = true
      var data = JSON.stringify({ email: this.email.value })
      axios.post(this.$rootUrl + '/password/email', data)
        .then(response => {
          this.send = true
          this.sendingOut = false
        })
        .catch(error => {
          this.showError(error, this),
          this.sendingOut = false
        })
    }
  }
}
</script>

<style scoped>

</style>
