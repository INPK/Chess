<template>
    <HouseMain>
      <h1>Характеристики дома</h1>
      <div>
        <div>
          <div>Всего этажей: {{ numberOfFloors }}</div>
          <div>Жилых этажей: {{ livingFloors }}</div>
          <div>Количество подъездов: {{ numberOfEntrance }}</div>
          <div>Количество квартир: {{ numberOfFlats }}</div>
          <div>Номер дома: {{ number }}</div>
          <div>----------------------</div>
          <div>Стадия строительства: {{ stageDevelopment }}</div>
          <div>Начало строительства: {{ startDevelopment }}</div>
          <div>Окончание строительства: {{ endDevelopment }}</div>
          <div>Улица: {{ streetName }}</div>
          <div>----------------------</div>
          <div>Отделка квартир: {{ finishing }}</div>
          <div>Материалы: {{ materials }}</div>
        </div>
      </div>
    </HouseMain>
</template>

<script>
import HouseMain from './HouseMain'

export default {
  name: 'HouseMainProperties',
  data () {
    return {
      houseId: '',
      buildingId: '',
      materials: [],
      numberOfFloors: null,
      livingFloors: '',
      numberOfEntrance: null,
      numberOfFlats: null,
      streetName: '',
      number: '',
      finishing: '',
      stageDevelopment: '',
      startDevelopment: '',
      endDevelopment: '',
      editMode: false
    }
  },
  components: {
    HouseMain
  },
  created () {
    this.$store.dispatch('retrieveItem', {
      url: '/houses/' + this.$store.state.currentHouseId,
      storageName: 'properties'
    })
      .then(response => {
        this.fillHouseProperties(response.data)
        this.$store.dispatch('setItemToStore', {
          storageName: 'properties',
          fields: JSON.stringify(response.data)
        })
      })
      .catch(error => {
        console.info('HouseProperties', error)
      })
  },
  methods: {
    fillHouseProperties (house) {
      this.houseId = house.hash_id
      this.buildingId = house.building_hash_id
      this.materials = house.materials
      this.numberOfFloors = house.number_of_floors
      this.livingFloors = house.living_floors
      this.numberOfEntrance = house.number_of_entrance
      this.numberOfFlats = house.number_of_flat
      this.streetName = house.street_name
      this.number = house.number
      this.finishing = house.finishing
      this.stageDevelopment = house.stage_development
      this.startDevelopment = house.start_development
      this.endDevelopment = house.end_development
    }
  }
}
</script>

<style scoped>

</style>
