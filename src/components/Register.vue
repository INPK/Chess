<template>
    <form @submit.prevent="login()">
      <input v-model="email" type="email" name="email" value="test3@gmail.com"/>
      <input v-model="password" name="password" value="1234asdf"/>
      <button type="submit">Отправить</button>
    </form>
</template>

<script>

import * as axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = JSON.stringify({
        email: this.email,
        password: this.password
      })
      axios.post('http://172.100.2.15:8000/login', data)
    }
  }
}
</script>

<style scoped>

</style>
