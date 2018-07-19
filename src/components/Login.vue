<template>
  <AuthContainer>
    <div class="login-input">
      <label for="email">Email</label>
      <div class="login-input__group">
        <transition name="slide-fade">
          <span
            v-if="email.validationClass"
            class="login-input__alert"
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
        <span class="login-input__group_bar"></span>
      </div>
    </div>
    <div class="login-input">
      <label for="password">Пароль</label>
      <div class="login-input__group">
        <transition duration="1000" name="slide-fade">
          <span
            v-if="password.validationClass"
            class="login-input__alert"
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
        <span class="login-input__group_bar"></span>
      </div>
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
  </AuthContainer>
</template>

<script>
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'
import AuthContainer from './AuthContainer'

export default {
  name: 'Login',
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
      }
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
        .then(response => {
          this.$router.push('/')
        })
        .catch((error) => {
          const errorMessages = error.response.data
          this.showError(errorMessages, this)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
