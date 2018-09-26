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
      :actionForClick="redirectToEditHouse"
    />
    <div class="uk-card uk-card-default" @click="redirectToCurrentHouseMain">
      <div class="uk-card-media-top">
        <img :src="imageSource" alt="">
      </div>
      <div class="uk-card-body">
        <div class="uk uk-flex uk-flex-between">
          <div>
            <h3 class="uk-card-title">{{ streetName }},{{ number }}</h3>
            <div>
              <small>жилой комплекс</small>
            </div>
          </div>
          <div>
            <h3>Осталось квартир</h3>
            <div>{{ flatsBalance }}</div>
          </div>
        </div>
        <div class="uk-divider"></div>
        <div
          v-for="(flat, key) of flats"
          :key="key"
          class="uk-flex uk-flex-between"
        >
          <div>{{ flat.type }}</div>
          <div>{{ flat.number_of }}</div>
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

    houseId: {
      type: String
    },
    storeIndex: Number,
    numberOfFloors: Number,
    livingFloors: String,
    numberOfEntrance: Number,
    numberOfFlat: Number,
    streetName: String,
    number: String,
    finishing: String,
    flats: Array,
    stageDevelopment: String,
    startDevelopment: String,
    endDevelopment: String
  },
  data () {
    return {
      imageSource: '/static/img/MilleniumFalcon.jpg',
      isVisibleButtons: false
    }
  },
  methods: {
    setHouseId () {
      this.$store.dispatch('setItemToStore', {
        fields: this.houseId,
        storageName: 'currentHouseId'
      })
    },
    toggleEditButton () {
      this.isVisibleButtons = !this.isVisibleButtons
    },
    getFullHouse () {
      this.$store.dispatch('retrieveItem', {
        url: '/houses/' + this.houseId,
        storageName: 'properties'
      })
        .then(response => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'properties',
            fields: JSON.stringify(response.data)
          })
        })
    },
    redirectToEditHouse () {
      this.getFullHouse()
      this.setHouseId()
      this.$router.push({
        name: 'HouseProperties',
        params: {
          houseStoreIndex: this.storeIndex,
          editMode: true
        }
      })
    },
    redirectToCurrentHouseMain () {
      this.getFullHouse()
      this.setHouseId()
      this.$router.push({
        name: 'HouseMainProperties',
        params: {
          houseStoreIndex: this.storeIndex
          // editMode: true
        }
      })
    }
  },
  computed: {
    flatsBalance () {
      let allFlats = 0
      this.flats.map(flat => {
        allFlats += Number(flat.number_of)
      })
      return allFlats
    }
  }
}
</script>

<style scoped>

</style>
