<template>
  <button
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
@white: #FFF;
@green: #2ec1b3;

.button {
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: @white;
  padding: 15px 20px;
  cursor: pointer;
  outline: none;
  &-expand {
    width: 100%;
  }
  &[button-color=green] {
    background-color: @green;
    &:hover {
      background-color: darken(@green, 5%)
    }
    &:active {
      background-color: darken(@green, 10%)
    }
  }
}
.link {
  color: @green;
}
</style>
