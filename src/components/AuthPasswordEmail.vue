<template>
  <AuthContainer>
    <div>
      <div v-if="!send">
        <div class="login-title">Сброс пароля</div>
        <form @submit.prevent>
          <div class="form-group">
            <label class="form-group__label" for="email">Email</label>
            <div class="form-group__input">
              <transition name="slide-fade">
              <span
                v-if="errorsStack.email"
                class="form-group__alert"
              >
                {{ errorsStack.email[0] }}
              </span>
              </transition>
              <input
                :class="validationClass.email"
                v-model="email"
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
            v-if="!sendingOut"
            class="button-expand"
            name="Восстановить"
            color="green"
            :actionForClick="sentEmailForResetPassword"
          />
          <BeatLoader v-else/>
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
        <div class="login-reset__email">{{ this.email }}</div>

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
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'
import BeatLoader from './BeatLoader'

export default {
  name: 'AuthPasswordEmail',
  data () {
    return {
      email: '',
      send: false,
      sendingOut: false,
      errorsStack: [],
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
    sentEmailForResetPassword () {
      this.sendingOut = true
      var data = JSON.stringify({ email: this.email })
      axios.post(this.$rootUrl + '/password/email', data)
        .then(() => {
          this.send = true
          this.sendingOut = false
        })
        .catch((error) => {
          this.showError(error, this)
          this.sendingOut = false
        })
    }
  },
  computed: {
    validationClass () {
      let errors = {}
      for (let item in this.errorsStack) {
        errors[item] = 'error'
      }
      return errors
    }
  }
}
</script>

<style scoped>
</style>
