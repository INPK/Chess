<template>
    <nav class="uk-navbar-container" uk-navbar>
      <img
        src="/static/img/footer_logo.svg"
        class="uk-navbar-left"
      >
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li class="uk-active"><div class="">Help</div></li>
          <li><div class="user-tools_notice">Notice</div></li>
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
  }

}
</script>

<style scoped>
  img {
    width: 300px;
    height: 100px;
  }
</style>
