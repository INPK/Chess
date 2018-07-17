<template>
  <div class="uk-child-width-1-2@m uk-grid-collapse uk-height-viewport uk-grid">
    <div
      class="uk-background-cover uk-background-center-center uk-height-viewport uk-visible@m uk-first-column"
      style="background-image: url(/static/img/city.png)"
    >

    </div>
    <div class="uk-background-default uk-flex uk-flex-middle uk-flex-center">
      <AlertDefault
        v-if="alert.alive"
        :message="alert.message"
        :alertType="alert.alertType"
      />
      <div
        class="border-container uk-align-left uk-width-large@s uk-width-xlarge@l uk-padding"
        uk-grid
      >
          <div class="uk-text-lead uk-align-left">Личный кабинет</div>
          <form class="uk-form-horizontal">
            <div>
              <label class="uk-form-label" for="email">Email</label>
              <div class="uk-form-controls">
                  <input
                    class="uk-input cstm-input_default"
                    v-model="email"
                    type="email"
                    name="email"
                    id="email"
                  />
              </div>
            </div>
            <div>
              <label class="uk-form-label" for="password">Пароль</label>
              <div class="uk-form-controls">
                  <input
                    class="uk-input cstm-input_default"
                    v-model="password"
                    name="password"
                    id="password"
                  />
              </div>
            </div>
            <div class="uk-flex uk-child-width-1-2 uk-align-left">
              <ButtonDefault
                :actionForClick="login"
                name="Войти"
                color="aqua"
                class="uk-width-1-3"
              />
              <div class="uk-margin-left uk-flex uk-flex-column uk-width-2-3  uk-align-left">
                <span>Ещё нет аккаунта?</span>
                <router-link to="/register/">Пройти простую регистрацию</router-link>
              </div>
            </div>
          </form>
          <router-link to="/password/email/">Восстановить пароль</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDefault from './AlertDefault'
import CommonMethods from './CommonMethods'
import ButtonDefault from './ButtonDefault'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      alert: {
        alive: false,
        alertType: 'danger',
        message: ''
      }
    }
  },
  components: {
    AlertDefault,
    ButtonDefault
  },
  mixins: [ CommonMethods ],
  methods: {
    login () {
      this.$store.dispatch('retrieveAuthData', {
        email: this.email,
        password: this.password
      })
        .then(response => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.info(error.data)
          const errorStatus = error.response.status
          const alert = this.alert
          if (errorStatus !== 'undefined' && errorStatus === 400) {
            const errorMessages = error.response.data
            for (let i in errorMessages) {
              let message = errorMessages[i]
              this.alert.message = message
            }
          } else {
            this.alert.message = 'Что-то пошло не так.'
          }
          alert.alive = true
          setTimeout(function () {
            alert.alive = false
          }, 3000)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.border-container {
  border: 6px solid whitesmoke;
  padding: 30px;
  width: 500px;
}
</style>
