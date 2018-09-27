<template>
  <div>
    <HouseContainer>
      <div>
        <span>Введите цену и площадь квартир</span>
        <label for="expandFloorToggle">Развернуть все этажи</label>
        <input v-model="expandFloors" type="checkbox" id="expandFloorToggle"/>
        <ButtonDefault
          name="Импорт данных"
          color="green"
          :actionForClick="dataImport"
        />
      </div>
      <div class="flats_list">
        <div
          v-for="(item, index) in flats"
          :key="index"
        >
        </div>
      </div>
    </HouseContainer>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseContainer from './HouseContainer'

export default {
  name: 'HousePrices',
  data () {
    return {
      flats: [],
      expandFloors: false
    }
  },
  created () {
    let houseId = this.$store.state.currentHouseId
    let houseFloors = this.$store.state.houseFloors
    console.info(houseId, JSON.parse(houseFloors), houseFloors === null)
    if (houseFloors === null) {
      this.$store.dispatch('retrieveItem', {
        url: '/houses/' + houseId + '/flats',
        storageName: 'houseFloors'
      })
        .then(response => {
          console.info(response.data.flats)
          this.flats = response.data.flats
        })
        .catch(errors => {
          console.info(errors)
        })
    }
  },
  components: {
    ButtonDefault,
    HouseContainer
  },
  methods: {
    dataImport () {
      alert('Импорт цен')
    }
  }
}
</script>

<style scoped>

</style>
