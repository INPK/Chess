<template>
  <div class="uk-offcanvas-content" >
    <div id="make-floors_container" uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar">
        <div>
          № подъезда: <input v-model="floorNumber" name="type"/>
        </div>
        <div>
          Клонировать для этажей: <input v-model="cloneFloors" name="area"/>
        </div>
        <div>
          Изображение: <input @change="processFile" name="image" type="file" />
        </div>
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <ButtonDefault
          name="Создать этаж"
          color="grey"
          :actionForClick="storeFloor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'

export default {
  name: 'BuildingsFloorsAdd',
  data () {
    return {
      floorNumber: 1,
      cloneFloors: 3,
      floorImage: File
    }
  },
  components: {
    ButtonDefault
  },
  methods: {
    storeFloor () {
      const data = {
        floor_number: this.floorNumber,
        api_key: this.$store.state.apiKey,
        company_id: this.$store.state.companyHashId,
        clone_floors: this.cloneFloors,
        image: this.floorImage
      }
      const floorProperties = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: floorProperties,
        url: '/floors',
        name: 'floorProperties'
      })
    },
    processFile (event) {
      console.info(event.target.files[0])
      this.floorImage = event.target.files[0]
    }
  }
}
</script>

<style scoped>

</style>
