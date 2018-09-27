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
          <div>
            <div>
              <div>
                <span>Этаж {{ item[0].floor }}</span>
                <span>^</span>
              </div>
              <h2>{{ item[0].floor }}</h2>
            </div>
            <div>
              <span>Номер квартиры</span>
              <span>Планировка</span>
              <span>Площадь</span>
              <span>Цена</span>
              <span>Подъезд</span>
              <span>Статус</span>
              <span
                v-for="(flat, index) in item"
                class="tmp-flat"
                :key="index"
              >
                <span>Квартира №{{ flat.number }}</span>
                <span>{{ staticFlatsSchemasTypes[flat.flat_schema_id].title }}</span>
                <span>{{ 'flat.area' }}</span>
                <span>{{ 'flat.price' }}</span>
                <span>{{ flat.entrance }}</span>
                <span>{{ flat.status }}</span>
              </span>
            </div>
          </div>
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
