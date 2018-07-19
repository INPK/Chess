<template>
  <AuthContainer>
    <div class="login-title">Личный кабинет</div>
    <form class="login-form" @submit.prevent>
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
            id="password"
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div v-if="singleErrorMessage" class="static-error">
        {{ singleErrorMessage }}
      </div>
      <div class="login-button">
        <div>
          <ButtonDefault
            :actionForClick="login"
            name="Войти"
            color="green"
            class="button-expand"
          />
        </div>
        <div class="login-button__register">
          <div>Ещё нет аккаунта?</div>
          <router-link to="/register/" class="link">Пройти простую регистрацию</router-link>
        </div>
        <div class="login-button__reset">
          <router-link to="/password/email/" class="link">Восстановить пароль</router-link>
        </div>
      </div>
    </form>
  </AuthContainer>
</template>

<script>
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'
import AuthContainer from './AuthContainer'

export default {
  name: 'AuthLogin',
  data () {
    return {
      email: {
        validationClass: '',
        validationText: '',
        value: ''
      },
      password: {
        validationClass: '',
        validationText: '',
        value: ''
      },
      singleErrorMessage: ''
    }
  },
  components: {
    AuthContainer,
    ButtonDefault
  },
  mixins: [ CommonMethods ],
  methods: {
    login () {
      this.$store.dispatch('retrieveAuthData', {
        email: this.email.value,
        password: this.password.value
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.showError(error, this)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) "../global.less";
@import (less) "../form.less";
</style>
