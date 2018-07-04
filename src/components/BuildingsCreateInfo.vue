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
    let currentInfoJson = this.$store.state.buildingInfo
    const currentInfo = JSON.parse(currentInfoJson)
    return {
      name: currentInfo.name || '',
      region: currentInfo.region || '',
      district: currentInfo.district || '',
      city: currentInfo.city || '',
      country: currentInfo.country || '',
      video: currentInfo.video || '',
      images: currentInfo.images || '',
      coordinates: currentInfo.coordinates || '',
      currency: currentInfo.currency || '',
      company_id: currentInfo.company_hash_id || '',
      options: {
        url: 'http://172.100.2.15:8000/buildings',
        paramName: 'items'
      }
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
        url: 'http://172.100.2.15:8000/buildings',
        name: 'buildingInfo'
      })
        .then(response => {
          this.$router.push('/buildings/create/properties')
        })
        .catch(error => {
          console.info(error.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
