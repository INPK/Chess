<template>
  <div class="uk-alert" :alertType="alertType">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'AlertDefault',
  props: {
    message: {
      type: String,
      required: true
    },
    alertType: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
