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
            <a href="#">{{ userName }}</a>
            <div class="uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li v-for="(value, key) of menuItem" :key="key">{{ value }}</li>
              </ul>
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
      menuItem: ['one', 'two', 'three']
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
</style>
