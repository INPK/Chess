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
    <ButtonDefault
      v-if="isVisibleButtons"
      name="Удалить"
      color="grey"
      class="button-expand"
      :actionForClick="removeHouse"
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
          v-for="(flat, key) in flats"
          :key="key"
          class="uk-flex uk-flex-between"
        >
          <div>{{ staticFlatsSchemasTypes[flat.type].title }}</div>
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
      staticFlatsSchemasTypes: {
        'studio_flat': {
          title: 'Студия',
          alias: 'S'
        },
        'one_room_flat': {
          title: 'Однокомнатная',
          alias: '1к'
        },
        'two_room_flat': {
          title: '2х-комнатная',
          alias: '2х'
        },
        'three_room_flat': {
          title: '3х-комнатная',
          alias: '3х'
        },
        'four_room_flat': {
          title: '4х-комнатная',
          alias: '4х'
        },
        'five_room_flat': {
          title: '5и-комнатная',
          alias: '5к'
        },
        'euro_two_room_flat': {
          title: 'Евро 2х-комнатная',
          alias: 'Е2'
        },
        'euro_three_room_flat': {
          title: 'Евро 3х-комнатная',
          alias: 'Е3'
        }
      },
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
        .catch(error => {
          console.info('Не могу получить характеристики дома. Вот почему: ', error.response.data)
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
        }
      })
    },
    removeHouse () {
      console.info(this.houseId)
      this.$emit('activateAlertConfirm', this.houseId)
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
