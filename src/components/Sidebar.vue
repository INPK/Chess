<template>
  <transition name="slide-fade">
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
  </transition>
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
  height: calc(100vh);
  width: 25%;
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  padding: 60px 0 0;
  border-left: 1px solid #dddddd;
  z-index: 810;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
