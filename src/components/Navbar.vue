<template>
    <nav class="navbar">
      <a class="navbar-logo" href="#">
        <img src="/static/img/footer_logo.svg" >
      </a>
      <div class="navbar-notice">1</div>
      <div class="navbar-menu">
        <div v-if="!loggedIn"><router-link :to="{ name: 'Login' }">Login</router-link></div>
        <div v-if="!loggedIn"><router-link :to="{ name: 'Register' }">Register</router-link></div>
        <div class="menu-dropdown"
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
            <li><router-link :to="{ name: 'Logout' }">Logout</router-link></li>
          </ul>
        </transition>
        </div>
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

<style lang="less" scoped>
  @import (less) "../../static/less/color.less";
  @import (less) "../../static/less/grid.less";
  @import (less) "../../static/less/padding.less";

  .navbar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: 2rem;
    grid-template-rows: 4rem;
    align-items: center;
    background-color: @color-white;
    padding: 0 4rem;
    &-logo {
      img {
        height: 2rem;
      }
    }
    &-notice {
      margin-left: auto;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>
