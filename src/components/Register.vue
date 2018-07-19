<template>
  <AuthContainer>
    <div>Имя компании: </div>
    <input
      :class="companyName.validationClass"
      v-model="companyName.value"
      @click = "clearError"
      type="text" id="company_name"
    />
    <span
      v-if="companyName.validationClass"
      style="color: red;"
    >
      {{ companyName.validationText }}
    </span>

    <div>Имя: </div>
    <input
      :class="firstName.validationClass"
      v-model="firstName.value"
      @click = "clearError"
      class="uk-child-width" type="text" id="first_name"
    />
    <span
      v-if="firstName.validationClass"
      style="color: red;"
    >
      {{ firstName.validationText }}
    </span>

    <div>Фамилия: </div>
    <input
      :class="lastName.validationClass"
      v-model="lastName.value"
      @click = "clearError"
      type="text" id="last_name"
    />
    <span
      v-if="lastName.validationClass"
      style="color: red;"
    >
      {{ lastName.validationText }}
    </span>

    <div>Отчество: </div>
    <input
      :class="middleName.validationClass"
      v-model="middleName.value"
      @click = "clearError"
      type="text" id="middle_name"
    />
    <span
      v-if="middleName.validationClass"
      style="color: red;"
    >
      {{ middleName.validationText }}
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
      :class="passwordConfirmation.validationClass"
      v-model="passwordConfirmation.value"
      @click = "clearError"
      id="password_confirmation" required
    />
    <span
      v-if="passwordConfirmation.validationClass"
      style="color: red;"
    >
      {{ passwordConfirmation.validationText }}
    </span>

    <div>Согласен с передачей данных: </div>
    <input
      v-model="isAgreeWithSavePersonalData.value"
      @click = "clearError"
      type="checkbox" id="is_agree_with_save_personal_data"
    />
    <span
      v-if="isAgreeWithSavePersonalData.validationClass"
      style="color: red;"
    >
      {{ isAgreeWithSavePersonalData.validationText }}
    </span>
    <button @click="register">Отправить</button>
  </AuthContainer>
</template>

<script>
import CommonMethods from './CommonMethods'
import AuthContainer from './AuthContainer'

export default {
  name: 'Register',
  data () {
    return {
      companyName: {
        validationClass: '',
        validationText: '',
        value: 'Owl Company'
      },
      firstName: {
        validationClass: '',
        validationText: '',
        value: 'Grigoriy'
      },
      lastName: {
        validationClass: '',
        validationText: '',
        value: 'Komarov'
      },
      middleName: {
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
      passwordConfirmation: {
        validationClass: '',
        validationText: '',
        value: '1234asdf'
      },
      isAgreeWithSavePersonalData: {
        validationClass: '',
        validationText: '',
        value: false
      }
    }
  },
  components: {
    AuthContainer
  },
  mixins: [ CommonMethods ],
  methods: {
    register () {
      if (this.password.value === this.passwordConfirmation.value) {
        const data = JSON.stringify({
          company_name: this.companyName.value,
          first_name: this.firstName.value,
          last_name: this.lastName.value,
          middle_name: this.middleName.value,
          email: this.email.value,
          is_agree_with_save_personal_data: this.isAgreeWithSavePersonalData.value,
          phone: this.phone.value,
          password: this.password.value,
          password_confirmation: this.passwordConfirmation.value
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
        this.passwordConfirmation.validationClass = 'error'
        this.passwordConfirmation.validationText = 'Пароли должны совпадать'
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
