<template>
    <div class="uk-container">
      <div class="building">
        <h1 class="building-title">{{ name }}</h1>
        <div class="building-container" uk-grid>
          <div class="building-info">
            <h2>Расположение объекта:</h2>
            <div><span>Страна: </span>{{ country }}</div>
            <div><span>Регион: </span>{{ region }}</div>
            <div><span>Город: </span>{{ city }}</div>
            <div><span>Район: </span>{{ district }}</div>
            <div><span>Координаты: </span>{{ coords }}</div>
          </div>
          <div class="building-media">
            <div class="building-media_images">{{ images }}</div>
            <div class="building-media_video">{{ video }}</div>
          </div>
        </div>
      </div>
      <div class="houses">
        <h1>Список домов:</h1>
        <div class="houses-container uk-flex">
          <div class="uk-card uk-card-default">
            <div class="uk-card-body">
              <h2 class="uk-text-left">Новый объект</h2>
              <ButtonDefault
                name="Добавить дом"
                color="grey"
                :actionForClick = "redirectToHouseProperties"
              />
              <ButtonDefault
                name="Создадим за вас (бесплатно)"
                color="aqua"
              ></ButtonDefault>
            </div>
            <img src="/static/img/PersonalManager.jpg" alt="">
          </div>
          <div class="uk-flex">
            <HouseItem
              class="uk-padding-small"
              v-for="(item, index) in houses"
              :key=item.house.id
              :houseId=item.house.hash_id
              :numberOfFloors=item.house.number_of_floors
              :livingFloors=item.house.living_floors
              :numberOfEntrance=item.house.number_of_entrance
              :numberOfFlat=item.house.number_of_flat
              :streetName=item.house.street_name
              :storeIndex=index
              :number=item.house.number
              :flats=item.flats
              :finishing=item.house.finishing
              :stageDevelopment=item.house.stage_development
              :startDevelopment=item.house.start_development
              :endDevelopment=item.house.end_development
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseItem from './HouseItem'

export default {
  name: 'BuildingMain',
  data () {
    return {
      hashId: '',
      name: '',
      region: '',
      district: '',
      city: '',
      country: '',
      video: '',
      images: '',
      coords: [],
      houses: []
    }
  },
  components: {
    HouseItem,
    ButtonDefault
  },
  created () {
    // let companyHashId = this.$store.state.companyHashId
    this.$store.dispatch('destroyItemFromStore', 'currentHouseId')
    this.$store.dispatch('destroyItemFromStore', 'properties')
    let urlBuildingStoreIndex = this.$route.params.buildingStoreIndex
    if (urlBuildingStoreIndex !== undefined) {
      this.$store.dispatch('setItemToStore', {
        storageName: 'currentBuildingStoreIndex',
        fields: urlBuildingStoreIndex
      })
    }
    let currentBuildingStoreIndex = this.$store.state.currentBuildingStoreIndex
    if (currentBuildingStoreIndex !== null) {
      this.fillBuildingsByData(currentBuildingStoreIndex)
    }
  },
  methods: {
    getHouses (buildingId) {
      return this.$store.dispatch('retrieveItem', {
        url: '/buildings/' + buildingId + '/houses',
        storageName: 'houses'
      })
        .then(houses => {
          this.houses = houses.data
          this.$store.dispatch('setItemToStore', {
            storageName: 'houses',
            fields: JSON.stringify(this.houses)
          })
        })
    },
    fillBuildingsByData (storeIndex) {
      let buildingsJson = this.$store.state.buildings
      console.info(buildingsJson)
      let building = JSON.parse(buildingsJson)[storeIndex].building

      this.hashId = building.hash_id
      this.name = building.name
      this.country = building.country
      this.region = building.region
      this.currency = building.currency
      this.city = building.city
      this.district = building.district
      this.video = building.video
      this.images = building.images
      this.coords = building.coordinates

      this.getHouses(this.hashId)
    },
    redirectToHouseProperties () {
      this.$router.push({
        name: 'HouseProperties',
        params: {
          houseStoreIndex: this.storeIndex
          // editMode: true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
