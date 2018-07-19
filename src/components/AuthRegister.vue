<template>
  <AuthContainer>
    <div class="login-form" v-if="!send">
      <div class="login-title">Регистрация пользователя</div>
      <div class="form-group">
        <label class="form-group__label" for="company_name">Компания:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="company_name.validationClass"
          class="form-group__alert"
        >
          {{ company_name.validationText }}
        </span>
          </transition>
          <input
            :class="company_name.validationClass"
            v-model="company_name.value"
            @click="clearError"
            type="text"
            id="company_name"
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="last_name">Фамилия:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="last_name.validationClass"
          class="form-group__alert"
        >
          {{ last_name.validationText }}
        </span>
          </transition>
          <input
            :class="last_name.validationClass"
            v-model="last_name.value"
            @click="clearError"
            type="text"
            id="last_name"
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="first_name">Имя:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="first_name.validationClass"
          class="form-group__alert"
        >
          {{ first_name.validationText }}
        </span>
          </transition>
          <input
            :class="first_name.validationClass"
            v-model="first_name.value"
            @click="clearError"
            type="text"
            id="first_name"
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="middle_name">Отчество:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="middle_name.validationClass"
          class="form-group__alert"
        >
          {{ middle_name.validationText }}
        </span>
          </transition>
          <input
            :class="middle_name.validationClass"
            v-model="middle_name.value"
            @click="clearError"
            type="text"
            id="middle_name"
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="email">Email:</label>
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
            @click="clearError"
            type="email"
            id="email"
            required
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="phone">Телефон:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="phone.validationClass"
          class="form-group__alert"
        >
          {{ phone.validationText }}
        </span>
          </transition>
          <input
            :class="phone.validationClass"
            v-model="phone.value"
            @click="clearError"
            id="phone"
            required
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="password">Пароль:</label>
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
            @click="clearError"
            id="password"
            required
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-group__label" for="password_confirmation">Повторить пароль:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
        <span
          v-if="password_confirmation.validationClass"
          class="form-group__alert"
        >
          {{ password_confirmation.validationText }}
        </span>
          </transition>
          <input
            :class="password_confirmation.validationClass"
            v-model="password_confirmation.value"
            @click="clearError"
            id="password_confirmation"
            required
          />
          <span class="form-group__input_bar"></span>
        </div>
      </div>

      <div class="form-group">
        <div></div>
        <div class="form-group__input">

          <input
            :class="is_agree_with_save_personal_data.validationClass"
            v-model="is_agree_with_save_personal_data.value"
            @click="clearError"
            type="checkbox"
            id="is_agree_with_save_personal_data"
          />
          <label for="is_agree_with_save_personal_data">Я принимаю договор-оферту и даю согласие на обработку
            персональных данных</label>
        </div>
      </div>
      <div v-if="singleErrorMessage" class="static-error">
        {{ singleErrorMessage }}
      </div>

      <ButtonDefault
        class="button-expand"
        name="Отправить"
        color="green"
        :actionForClick="register"/>

    </div>
    <div class="login-reset" v-else>
      <div class="login-reset__title">Отлично! Осталось подтвердить ваш email. На вашу почту отправлено письмо с
        подтверждением.
      </div>
      <div class="login-reset__email">{{ this.email.value }}</div>
      <div class="login-button">
        <div class="login-button__register">
          <div class="login-button__register_title">Есть учетная запись?</div>
        </div>
        <div class="login-button__register">
          <router-link to="/login" class="link">Авторизуйтесь здесь</router-link>
        </div>
      </div>
    </div>
  </AuthContainer>
</template>

<script>
import CommonMethods from './CommonMethods'
import AuthContainer from './AuthContainer'
import ButtonDefault from './ButtonDefault'

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
      singleErrorMessage: '',
      send: false
    }
  },
  components: {
    AuthContainer,
    ButtonDefault
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
            this.send = true
          })
          .catch((error) => {
            this.showError(error, this)
          })
      } else {
        this.password_confirmation.validationClass = 'error'
        this.password_confirmation.validationText = 'Пароли должны совпадать'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) "../global.less";
@import (less) "../form.less";
@import (less) "../button.less";
</style>
