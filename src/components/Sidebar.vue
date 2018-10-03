<template>
  <div>
    <div>
      <div
        class="container"
        @click="closeSidebar"
      ></div>
      <div class="sidebar">
        <button
          class="uk-offcanvas-close"
          type="button"
          uk-close
          @click="closeSidebar"
        ></button>
        <div class="sidebar-header">
          <h1>{{ title }}</h1>
        </div>
        <div class="sidebar-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    title: {
      type: String,
      default: 'default title'
    }
  },
  methods: {
    closeSidebar () {
      this.$emit('closeSidebar')
    },
    test () {
      alert(234)
    }
  }
}
</script>

<style lang="less" scoped>
  @import (less) "../../static/less/color.less";
  @import (less) "../../static/less/grid.less";
  @import (less) "../../static/less/media.less";
  @import (less) "../../static/less/padding.less";

  .container {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    z-index: 800;
    transition: opacity 0.3s ease-out;
  }

.sidebar {
  min-height: 100vh;
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  .padding(@v: 3rem);
  border-left: 1px solid #dddddd;
  z-index: 810;
}
</style>
