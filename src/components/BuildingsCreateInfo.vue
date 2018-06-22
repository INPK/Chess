<template>
  <div class="uk-container uk-background-default uk-padding" uk-grid>
    <div class="uk-width-2-3">
      <h2>Введите информацию о комплексе:</h2>
      <label for="building_name">Название ЖК</label>
      <input id="building_name" />
      <h2>Расположение:</h2>
      <input name="country" value="Russia"/>
      <input name="region" value="Rostovskaya"/>
      <input name="currency" value="RUB"/>
      <input name="city" value="Rostov"/>
      <input name="district" value="Center"/>
    </div>
    <div class="uk-width-1-3">
      <ButtonDefault
        name="Добавить фото и видео"
        color="orange"
      />
      <MultipleFileUploader
        postURL="http://172.100.2.15:8000/buildings"
        successMessagePath="СУСЕС"
        errorMessagePath="ФЁИЛ"
        :minItems="0"
        :maxItems="10"
      />
      <input name="image" required multiple @change="onFileSelected" type="file"/>
      <button @click="onUpload">T</button>

      <progress id="js-progressbar" class="uk-progress" value="0" max="100" hidden></progress>

      <ButtonDefault
        name="Следующий шаг"
        color="aqua"
      />
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import axios from 'axios'
import MultipleFileUploader from 'vue2-multi-uploader'

export default {
  name: 'BuildingsCreateInfo',
  components: {
    ButtonDefault,
    MultipleFileUploader
  },
  data () {
    return {
      selectedFile: null
    }
  },
  methods: {
    error_handler: function (error) {
      console.info(error)
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.info(event)
    },
    onUpload () {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.post('http://172.100.2.15:8000/buildings', fd)
        .then(response => {
          console.info(response)
        })
        .catch(error => {
          console.info(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
