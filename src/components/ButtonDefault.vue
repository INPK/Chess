<template>
   <button
     class="uk-button uk-width-1-1 uk-margin-bottom"
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

<style scoped>
  [button-color=grey] {
    background-color: #8792aa;
    color: white;
  }

  [button-color=aqua] {
    background-color: #00c5b7;
    color: white;
  }

  [button-color=red] {
    background-color: #ff1632;
    color: white;
  }

  [button-color=orange] {
    background-color: #ffa000;
    color: white;
  }

</style>
