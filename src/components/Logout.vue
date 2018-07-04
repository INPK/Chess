<template>
  <span></span>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$store.dispatch('destroyApiKey')
      .then(response => {
        console.info(response)
        this.$router.push('/')
      })
  }
}
</script>

<style scoped>

</style>
