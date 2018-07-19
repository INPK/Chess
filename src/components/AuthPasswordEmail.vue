<template>
  <AuthContainer>
    <div>
      <div v-if="!send">
        <div
          v-if="sendingOut"
          uk-spinner
        ></div>
        <div class="login-title">Сброс пароля</div>
        <form @submit.prevent>

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
                v-model="email.value"
                @click="clearError"
                type="email"
                id="email"
              />
              <span class="form-group__input_bar"></span>
            </div>
          </div>
          <div v-if="singleErrorMessage" class="static-error">
            {{ singleErrorMessage }}
          </div>
          <ButtonDefault
            @click="sentEmailForResetPassword"
            name="Восстановить пароль"
            color="green"
            :actionForClick="sentEmailForResetPassword"
            class="button-expand"
          />
        </form>
      </div>
      <div v-else>
        <h1>
          Письмо с информацией для смены пароля отправлено на адрес:
        </h1>
        <span>{{ this.email.value }}</span>
      </div>
    </div>
  </AuthContainer>
</template>

<script>
import axios from 'axios'
import ButtonDefault from './ButtonDefault'
import AuthContainer from './AuthContainer'
import CommonMethods from './CommonMethods'

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
    ButtonDefault,
    AuthContainer
  },
  mixins: [ CommonMethods ],
  methods: {
    sentEmailForResetPassword () {
      this.sendingOut = true
      var data = JSON.stringify({ email: this.email.value })
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
  }
}
</script>

<style scoped>

</style>
