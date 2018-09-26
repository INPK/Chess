<template>
    <nav class="uk-navbar-container" uk-navbar>
      <img
        src="/static/img/footer_logo.svg"
        class="uk-navbar-left"
      >
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li class="uk-active"><div class="">Help</div></li>
          <li v-if="!loggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></li>
          <li v-if="!loggedIn"><router-link :to="{ name: 'Register' }">Register</router-link></li>
          <li v-else><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
          <li>
            <div
              @click="toggleDropdown"
              @mouseleave="isEnableDropdown = false"
            >{{ userName }}
            <transition
              name="fade"
            >
              <ul
                v-if="isEnableDropdown"
                @mouseleave="toggleDropdown">
                <li v-for="(value, key) of menuItem" :key="key">{{ value }}</li>
              </ul>
            </transition>
            </div>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
export default {
  data: function () {
    return {
      userName: 'TestUser',
      menuItem: ['one', 'two', 'three'],
      isEnableDropdown: false
    }
  },
  methods: {
    toggleDropdown () {
      this.isEnableDropdown = !this.isEnableDropdown
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }

}
</script>

<style scoped>
  img {
    width: 300px;
    height: 100px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
