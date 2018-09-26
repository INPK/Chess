<template>
  <div>
    <Navbar v-if="isAuthenticated"/>
    <main><router-view/></main>
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
@import (reference) "../static/less/global.less";

</style>
