<template>
  <div>
    <router-view/>
    <Navbar v-if="isAuthenticated"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    isAuthenticated: function () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="less">
@import (reference) "global.less";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background: #FFFFFF;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  overflow-y: scroll;
}
</style>
