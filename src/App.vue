<template>
  <div id="app">
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cstm-input_default {
  padding: 10px 0px;
  background: none;
  border-width: 2px;
  width: 100%;
  border-color: transparent;
  border-bottom-width: 2px;
  border-style: solid;
  outline: none;
  transition: border-bottom-color 0.3s ease-out;
  &:enabled{
    border-bottom-color: #aaaaaa;
  }
  &.required {
    &::placeholder {
      color: #f44336;
    }
    color: #f44336;
    border-bottom-color: #f44336;
  }
  &.fit{
    padding: 0;
  }
}
</style>
