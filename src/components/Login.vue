<template>
    <form @submit.prevent="login()">
      <input v-model="email" type="email" name="email" value="test3@gmail.com"/>
      <input v-model="password" name="password" value="1234asdf"/>
      <button type="submit">Отправить</button>
    </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
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
          const errorStatus = error.response.status
          if (errorStatus !== 'undefined' && errorStatus === 400) {
            const errorMessages = error.response.data.message
            for (let i in errorMessages) {
              let item = errorMessages[i][0]
              console.log(i, item)
            }
            console.log(400)
          } else {
            console.log('Что-то пошло не так.')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
