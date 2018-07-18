<template>
  <BuildingsCreate>
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
        <span>Координаты</span><input v-model="coordinates" name="coordinates"/>
      </div>
      <div class="uk-width-1-3">
        <MultipleFileUploader
          postURL="http://172.100.2.15:8000/buildings"
          successMessagePath="СУСЕС"
          errorMessagePath="ФЁИЛ"
          :minItems="0"
          :maxItems="10"
        />
        <ButtonDefault
          name="Следующий шаг"
          color="aqua"
          :actionForClick = "storeBuildingsInfo"
        />
      </div>
    </div>
  </BuildingsCreate>
</template>

<script>
import BuildingsCreate from './BuildingsCreate'
import ButtonDefault from './ButtonDefault'
import MultipleFileUploader from 'vue2-multi-uploader'

export default {
  name: 'BuildingsCreateInfo',
  components: {
    ButtonDefault,
    MultipleFileUploader,
    BuildingsCreate
  },
  data () {
    return {
      name: '',
      region: '',
      district: '',
      city: '',
      country: '',
      video: '',
      images: '',
      coordinates: '',
      currency: ''
    }
  },
  methods: {
    storeBuildingsInfo () {
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
        coordinates: this.coordinates,
        currency: this.currency
      }
      const buildingInfo = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: buildingInfo,
        url: '/buildings',
        name: 'buildingInfo'
      })
        .then(response => {
          this.$router.push('/buildings/create/properties')
        })
        .catch(error => {
          console.info(error.message)
        })
    }
  },
  created () {
    var buildingInfoJson = this.$store.state.buildingInfo
    if (buildingInfoJson) {
      var buildingInfo = JSON.parse(buildingInfoJson)
    }
    for (let key in buildingInfo) {
      let value = buildingInfo[key]
      this[key] = value
    }
  }
}
</script>

<style scoped>

</style>
