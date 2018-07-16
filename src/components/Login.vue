<template>
  <div>
    <AlertDefault
      v-if="alert.alive"
      :message="alert.message"
      :alertType="alert.alertType"
    />
    <form @submit.prevent="login()" class="first">
      <div class="two">TWO</div>
      <input v-model="email" type="email" name="email" value="test3@gmail.com"/>
      <input v-model="password" name="password" value="1234asdf"/>
      <button type="submit">Отправить</button>
    </form>
    <router-link to="/password/email/">Забыли пароль</router-link>
  </div>
</template>

<script>
import AlertDefault from './AlertDefault'
import CommonMethods from './CommonMethods'

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
    AlertDefault
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
  .first{
    background-color: #00c5b7;
    & .two{
      background-color: #080808;
    }
  }
</style>
