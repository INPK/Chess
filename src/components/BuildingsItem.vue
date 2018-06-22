<template>
  <div class="uk-width-1-1 uk-width-1-3@m">
    <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
        <img :src="imageSource" alt="">
      </div>
      <div class="uk-card-body">
        <div class="uk uk-flex uk-flex-between">
          <div>
            <h3 class="uk-card-title">{{ title }}</h3>
            <div>
              <small>{{ description }}</small>
            </div>
          </div>
          <div>
            <h3>Осталось квартир</h3>
            <div>{{ apartmentBalance }}</div>
          </div>
        </div>
        <div class="uk-divider"></div>
        <div
          v-for="(part, key) of apartmentFree"
          :key="key"
          class="uk-flex uk-flex-between"
        >
          <div>{{ part.type }}</div>
          <div>{{ part.description }}</div>
          <div>{{ part.count }}</div>
        </div>
        <div @click="viewDetailsClicked()" type="button">TEST</div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    building: {
      type: Object
    },
    imageSource: String,
    title: {
      type: String,
      required: true
    },
    description: String,
    apartmentBalance: Number,
    address: String,
    apartmentFree: Array
  },
  data () {
    return {}
  },
  methods: {
    viewDetailsClicked () {
      this.$emit('viewDetail', this.title)
    }
  }
}
</script>

<style scoped>

</style>
