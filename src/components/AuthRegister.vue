<template>
  <AuthContainer>
    <div>Имя компании: </div>
    <input
      :class="company_name.validationClass"
      v-model="company_name.value"
      @click = "clearError"
      type="text" id="company_name"
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
      v-model="first_name.value"
      @click = "clearError"
      class="uk-child-width" type="text" id="first_name"
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
      v-model="last_name.value"
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
      v-model="middle_name.value"
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
      v-model="email.value"
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
      v-model="phone.value"
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
      v-model="password.value"
      @click = "clearError"
      id="password" required
    />
    <span
      v-if="password.validationClass"
      style="color: red;"
    >
      {{ password.validationText }}
    </span>

    <div>Подтверждение пароля: </div>
    <input
      :class="password_confirmation.validationClass"
      v-model="password_confirmation.value"
      @click = "clearError"
      id="password_confirmation" required
    />
    <span
      v-if="password_confirmation.validationClass"
      style="color: red;"
    >
      {{ password_confirmation.validationText }}
    </span>

    <div>Согласен с передачей данных: </div>
    <input
      v-model="is_agree_with_save_personal_data.value"
      @click = "clearError"
      type="checkbox" id="is_agree_with_save_personal_data"
    />
    <span
      v-if="is_agree_with_save_personal_data.validationClass"
      style="color: red;"
    >
      {{ is_agree_with_save_personal_data.validationText }}
    </span>
    <div v-if="singleErrorMessage" class="static-error">
      {{ singleErrorMessage }}
    </div>
    <button @click="register">Отправить</button>
  </AuthContainer>
</template>

<script>
import CommonMethods from './CommonMethods'
import AuthContainer from './AuthContainer'

export default {
  name: 'AuthRegister',
  data () {
    return {
      company_name: {
        validationClass: '',
        validationText: '',
        value: 'Owl Company'
      },
      first_name: {
        validationClass: '',
        validationText: '',
        value: 'Grigoriy'
      },
      last_name: {
        validationClass: '',
        validationText: '',
        value: 'Komarov'
      },
      middle_name: {
        validationClass: '',
        validationText: '',
        value: 'Alexandrovich'
      },
      email: {
        validationClass: '',
        validationText: '',
        value: 'test@1gmail.com'
      },
      phone: {
        validationClass: '',
        validationText: '',
        value: '89081996451'
      },
      password: {
        validationClass: '',
        validationText: '',
        value: '1234asdf'
      },
      password_confirmation: {
        validationClass: '',
        validationText: '',
        value: '1234asdf'
      },
      is_agree_with_save_personal_data: {
        validationClass: '',
        validationText: '',
        value: false
      },
      singleErrorMessage: ''
    }
  },
  components: {
    AuthContainer
  },
  mixins: [ CommonMethods ],
  methods: {
    register () {
      if (this.password.value === this.password_confirmation.value) {
        const data = JSON.stringify({
          company_name: this.company_name.value,
          first_name: this.first_name.value,
          last_name: this.last_name.value,
          middle_name: this.middle_name.value,
          email: this.email.value,
          is_agree_with_save_personal_data: this.is_agree_with_save_personal_data.value,
          phone: this.phone.value,
          password: this.password.value,
          password_confirmation: this.password_confirmation.value
        })
        this.$store.dispatch('registerUser', data)
          .then(() => {
            this.$router.push('/')
            alert('Вы успешно зарегистрировались! Перейдите на почту.')
          })
          .catch((error) => {
            const errorMessages = error.response.data
            this.showError(errorMessages, this)
          })
      } else {
        this.password_confirmation.validationClass = 'error'
        this.password_confirmation.validationText = 'Пароли должны совпадать'
      }
    },
    clearError (event) {
      let item = event.target.id
      this[item].validationClass = ''
    }
  }
}
</script>

<style scoped>
</style>
