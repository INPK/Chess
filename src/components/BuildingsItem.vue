<template>
  <div class="uk-width-1-1 uk-width-1-3@m"
       @mouseover="toggleEditButton"
       @mouseout="toggleEditButton"
  >
    <ButtonDefault
      v-if="isVisibleButtons"
      name="Редактировать"
      color="green"
      class="button-expand"
      :actionForClick="editBuilding"
    />
    <div
      class="uk-card uk-card-default"
      @click="redirectToCurrentBuildingMain"
    >
      <div class="uk-card-media-top">
        <img :src="imageSource" alt="">
      </div>
      <div class="uk-card-body">
        <div class="uk uk-flex uk-flex-between">
          <div>
            <h3 class="uk-card-title">{{ title }}</h3>
            <div>
              <small>{{ country }}, {{ region }}, {{ city }}, {{ district }}</small>
            </div>
          </div>
          <div>
            <h3>Осталось квартир</h3>
            <div>{{ numberOfFlats }}</div>
          </div>
        </div>
        <div class="uk-divider"></div>
        <div
          v-for="(flatType, key) in flats"
          :key="key"
          class="uk-flex uk-flex-between"
        >
          <div>{{ key }}</div>
          <div>{{ flatType }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ButtonDefault from './ButtonDefault'

export default {
  components: { ButtonDefault },
  props: {
    imageSource: String,
    title: {
      type: String,
      required: true
    },
    storeIndex: {
      type: Number,
      required: true
    },
    city: String,
    address: String,
    country: String,
    district: String,
    region: String,
    flats: Object
  },
  data () {
    return {
      isVisibleButtons: false
    }
  },
  methods: {
    viewDetailsClicked () {
      this.$emit('viewDetail', this.title)
    },
    toggleEditButton () {
      this.isVisibleButtons = !this.isVisibleButtons
    },
    editBuilding () {
      this.$router.push({
        name: 'BuildingProperties',
        params: {
          buildingStoreIndex: this.storeIndex,
          editMode: true
        }
      })
    },
    redirectToCurrentBuildingMain () {
      this.$router.push({
        name: 'BuildingMain',
        params: {
          buildingStoreIndex: this.storeIndex
          // editMode: true
        }
      })
    }
  },
  computed: {
    numberOfFlats () {
      let globalNumberOfFlats = 0
      for (let key in this.flats) {
        globalNumberOfFlats += this.flats[key]
      }
      return globalNumberOfFlats
    }
  }
}
</script>

<style scoped>

</style>
