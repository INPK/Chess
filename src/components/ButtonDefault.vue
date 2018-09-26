<template>
  <button
    type="button"
    class="button"
    :button-color="color"
    @click = "methodFromParent"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'ButtonDefault',
  props: {
    color: {
      type: String,
      default: function () {
        return 'white'
      }
    },
    name: {
      type: String,
      require: true
    },
    actionForClick: Function
  },
  data () {
    return {
    }
  },
  methods: {
    methodFromParent () {
      this.actionForClick()
    }
  }
}
</script>

<style lang="less">
@import (less) "../global.less";
@import (less) "../form.less";
@import (less) "../button.less";
</style>
