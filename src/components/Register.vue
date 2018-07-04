<template>
    <form @submit.prevent="register">
      <div>Имя компании: </div><input v-model="company_name" type="text" name="company_name" required />
      <div>Имя: </div><input v-model="first_name" type="text" name="first_name" required />
      <div>Фамилия: </div><input v-model="last_name" type="text" name="last_name" />
      <div>Отчество: </div><input v-model="middle_name" type="text" name="middle_name" />
      <div>Email: </div><input v-model="email" type="email" name="email" required />
      <div>Телефон: </div><input v-model="phone" name="phone" required />
      <div>Пароль: </div><input v-model="password" name="password" required />
      <div>Согласен с передачей данных: </div><input v-model="personal_data" type="checkbox" name="personal_data" />
      <button type="submit">Отправить</button>
    </form>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      company_name: 'Owl Company',
      first_name: 'Grigoriy',
      last_name: 'Komarov',
      middle_name: 'Alexandrovich',
      email: 'test@1gmail.com',
      phone: '89081996451',
      password: '1234asdf',
      personal_data: false
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerUser', {
        company_name: this.company_name,
        first_name: this.first_name,
        last_name: this.last_name,
        middle_name: this.middle_name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        personal_data: this.personal_data
      })
        .then(response => {
          this.$router.push('/')
        })
        .catch((error) => {
          const errorMessages = error.response.data.message
          for (let i in errorMessages) {
            let item = errorMessages[i][0]
            console.log(i, item)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
