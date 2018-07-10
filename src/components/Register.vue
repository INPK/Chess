<template>
    <form @submit.prevent="register">

      <div>Имя компании: </div>
      <input
        :class="company_name.validationClass"
        v-model="company_name.default"
        @click = "clearError"
        type="text" id="company_name" required
      />
      <span
        v-if="company_name.validationClass"
        style="color: red;"
      >
        {{ company_name.validationText }}
      </span>

      <div>Имя: </div>
      <input
        :class="first_name.validationClass"
        v-model="first_name.default"
        @click = "clearError"
        class="uk-child-width" type="text" id="first_name" required
      />
      <span
        v-if="first_name.validationClass"
        style="color: red;"
      >
        {{ first_name.validationText }}
      </span>

      <div>Фамилия: </div>
      <input
        :class="last_name.validationClass"
        v-model="last_name.default"
        @click = "clearError"
        type="text" id="last_name"
      />
      <span
        v-if="last_name.validationClass"
        style="color: red;"
      >
        {{ last_name.validationText }}
      </span>

      <div>Отчество: </div>
      <input
        :class="middle_name.validationClass"
        v-model="middle_name.default"
        @click = "clearError"
        type="text" id="middle_name"
      />
      <span
        v-if="middle_name.validationClass"
        style="color: red;"
      >
        {{ middle_name.validationText }}
      </span>

      <div>Email: </div>
      <input
        :class="email.validationClass"
        v-model="email.default"
        @click = "clearError"
        type="email" id="email" required
      />
      <span
        v-if="email.validationClass"
        style="color: red;"
      >
        {{ email.validationText }}
      </span>

      <div>Телефон: </div>
      <input
        :class="phone.validationClass"
        v-model="phone.default"
        @click = "clearError"
        id="phone" required
      />
      <span
        v-if="phone.validationClass"
        style="color: red;"
      >
        {{ phone.validationText }}
      </span>

      <div>Пароль: </div>
      <input
        :class="password.validationClass"
        v-model="password.default"
        @click = "clearError"
        id="password" required
      />
      <span
        v-if="password.validationClass"
        style="color: red;"
      >
        {{ password.validationText }}
      </span>

      <div>Согласен с передачей данных: </div>
      <input
        v-model="is_agree_with_save_personal_data.default"
        @click = "clearError"
        type="checkbox" id="is_agree_with_save_personal_data"
      />
      <span
        v-if="is_agree_with_save_personal_data.validationClass"
        style="color: red;"
      >
        {{ is_agree_with_save_personal_data.validationText }}
      </span>
      <button type="submit">Отправить</button>
    </form>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      company_name: {
        validationClass: '',
        validationText: '',
        default: 'Owl Company'
      },
      first_name: {
        validationClass: '',
        validationText: '',
        default: 'Grigoriy'
      },
      last_name: {
        validationClass: '',
        validationText: '',
        default: 'Komarov'
      },
      middle_name: {
        validationClass: '',
        validationText: '',
        default: 'Alexandrovich'
      },
      email: {
        validationClass: '',
        validationText: '',
        default: 'test@1gmail.com'
      },
      phone: {
        validationClass: '',
        validationText: '',
        default: '89081996451'
      },
      password: {
        validationClass: '',
        validationText: '',
        default: '1234asdf'
      },
      is_agree_with_save_personal_data: {
        validationClass: '',
        validationText: '',
        default: false
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('registerUser', {
        company_name: this.company_name.default,
        first_name: this.first_name.default,
        last_name: this.last_name.default,
        middle_name: this.middle_name.default,
        email: this.email.default,
        is_agree_with_save_personal_data: this.is_agree_with_save_personal_data.default,
        phone: this.phone.default,
        password: this.password.default
      })
        .then(response => {
          this.$router.push('/')
          alert('Вы успешно зарегистрировались! Перейдите на почту.')
        })
        .catch((error) => {
          const errorMessages = error.response.data
          for (let i in errorMessages) {
            let textError = errorMessages[i][0]
            this[i].validationClass = 'error'
            this[i].validationText = textError
          }
        })
    },
    clearError (event) {
      let item = event.target.id
      this[item].validationClass = ''
    }
  }
}
</script>

<style scoped>
.error {
  background-color: red;
}
</style>
