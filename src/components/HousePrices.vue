<template>
  <div>
    <HouseContainer>
      <AlertDefault
        v-if="singleErrorMessage"
        :message="singleErrorMessage"
        @alertDie="singleErrorMessage = ''"
      />
      <div>
        <span>Введите цену и площадь квартир</span>
        <label for="expandFloorToggle">Развернуть все этажи</label>
        <input v-model="expandFloors" type="checkbox" id="expandFloorToggle"/>
        <!--<ButtonDefault
          name="Импорт данных"
          color="green"
          :actionForClick="dataImport"
        />-->
      </div>
      <div class="flats_list">
        <div
          v-for="(floor, index) in fullHouse"
          :key="index"
        >
          <HousePricesFloor
            :floor="floor"
            :floorIndex="index"
            :editableFloorIndex="editableFloorIndex"
            @editFloor="editFloor"
            @updateFlatsList="getFullHouse"
          />
        </div>
      </div>
    </HouseContainer>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertDefault from './AlertDefault'
import HouseContainer from './HouseContainer'
import HousePricesFloor from './HousePricesFloor'

export default {
  name: 'HousePrices',
  data () {
    return {
      fullHouse: [],
      editableFloorIndex: null,
      singleErrorMessage: '',
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
      expandFloors: false
    }
  },
  components: {
    ButtonDefault,
    AlertDefault,
    HouseContainer,
    HousePricesFloor
  },
  created () {
    let fullHouse = this.$store.state.fullHouse
    if (fullHouse === null) {
      this.getFullHouse()
    } else {
      this.fullHouse = JSON.parse(fullHouse)
    }
  },
  methods: {
    getFullHouse () {
      let houseId = this.$store.state.currentHouseId
      this.$store.dispatch('retrieveItem', {
        url: '/houses/' + houseId + '/flats',
        storageName: 'fullHouse'
      })
        .then(response => {
          this.fullHouse = response.data.flats
        })
        .catch(error => {
          this.singleErrorMessage = 'Не могу получить информацию о доме.'
          console.info(this.singleErrorMessage + 'Вот почему: ', error.response.data)
        })
    },
    dataImport () {
      alert('Импорт цен')
    },
    editFloor (floorIndex) {
      this.editableFloorIndex = floorIndex
    }
  }
}
</script>

<style scoped>

</style>
