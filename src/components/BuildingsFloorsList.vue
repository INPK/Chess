<template>
  <div class="uk-card">
    <div class="uk-card-header">
      <img :src="img_source">
    </div>
    <div class="uk-card-body">
      <div>
        № этажа: {{ floorNumber }}
      </div>
      <div>
        Клонировать для этажей:
        <span v-for="cloneFloor in cloneFloors" :key="cloneFloor.id">{{ cloneFloor.number }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingsFloorsList',
  data () {
    return {
      img_source: '',
      floorNumber: '',
      cloneFloors: []
    }
  }
}
</script>

<style scoped>

</style>
