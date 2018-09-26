<template>
  <div class="uk-container uk-background-default uk-padding" uk-grid>
    <div class="uk-width-2-3">
      <h2>Введите информацию о комплексе:</h2>
      <label for="name">Название ЖК</label>
      <input v-model="name" id="name" />
      <h2>Расположение:</h2>
      <span>Страна</span><input v-model="country" name="country"/>
      <span>Регион</span><input v-model="region" name="region"/>
      <span>Валюта</span><input v-model="currency" name="currency"/>
      <span>Город</span><input v-model="city" name="city"/>
      <span>Район</span><input v-model="district" name="district"/>
      <span>Видео</span><input v-model="video" name="video"/>
      <span>Картинки</span><input v-model="images" name="images"/>
      <span>Координаты</span><input v-model="coords" name="coordinates"/>
    </div>
    <div class="uk-width-1-3">
      <ButtonDefault
        v-if="!editMode"
        name="Сохранить"
        color="green"
        :actionForClick = "storeBuildingsProperties"
      />
      <ButtonDefault
        v-else
        name="Обновить"
        color="green"
        :actionForClick = "updateBuildingsProperties"
      />
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import MultipleFileUploader from 'vue2-multi-uploader'

export default {
  name: 'BuildingProperties',
  components: {
    ButtonDefault,
    MultipleFileUploader
  },
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
      coords: [54.8, 39.8],
      currency: '',
      editMode: false
    }
  },
  methods: {
    storeBuildingsProperties (buildingIdPath = '', action = 'writeItem') {
      const data = {
        api_key: this.$store.state.retrieveApiKey,
        company_id: this.$store.state.companyHashId,
        name: this.name,
        region: this.region,
        district: this.district,
        city: this.city,
        country: this.country,
        video: this.video,
        images: this.images,
        coordinates: this.coords,
        currency: this.currency
      }
      const buildingInfo = JSON.stringify(data)
      this.$store.dispatch(action, {
        fields: buildingInfo,
        url: '/buildings' + buildingIdPath,
        storageName: 'buildingProperties'
      })
        .then(response => {
          this.$router.push('/')
        })
        .catch(error => {
          console.info(error.message)
        })
    },
    updateBuildingsProperties () {
      this.storeBuildingsProperties('/' + this.hashId, 'updateItem')
    },
    fillLinesByData (storeIndex) {
      let buildingsJson = this.$store.state.buildings
      console.info(storeIndex)
      let building = JSON.parse(buildingsJson)[storeIndex].fields

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
    }
  },
  created () {
    let buildingStoreIndex = this.$route.params.buildingStoreIndex
    if (buildingStoreIndex !== undefined) {
      this.$store.dispatch('setItemToStore', {
        storageName: 'currentBuildingStoreIndex',
        fields: buildingStoreIndex
      })
    }
    let currentBuildingStoreIndex = this.$store.state.currentBuildingStoreIndex
    if (currentBuildingStoreIndex !== null) {
      this.editMode = true
      this.fillLinesByData(currentBuildingStoreIndex)
    }
  }
}
</script>

<style scoped>

</style>
