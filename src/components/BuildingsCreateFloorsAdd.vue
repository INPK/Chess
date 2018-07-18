<template>
  <div class="uk-offcanvas-content" >
    <div id="make-floors_container" uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar">
        <img src="/static/img/flat-03.svg">
        <div>
          Тип квартиры: <input v-model="type" name="type"/>
        </div>
        <div>
          Типовая площадь: <input v-model="area" name="area"/>
        </div>
        <div>
          Балконы: <input v-model.number="number_of_balcony" name="number_of_balcony"/>
        </div>
        <div>
          Лоджии: <input v-model.number="number_of_loggia" name="number_of_loggia"/>
        </div>
        <div>
          Цена: <input v-model="price" name="price"/>
        </div>
        <div>
          Изображение: <input name="image" type="file" />
        </div>
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <ButtonDefault
          name="Создать типовую планировку"
          color="grey"
          :actionForClick="storeLayout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'

export default {
  name: 'BuildingsCreateFloorsAdd',
  data () {
    let buildingPropertiesJson = this.$store.state.buildingProperties
    const buildingId = JSON.parse(buildingPropertiesJson).hash_id
    return {
      house_id: buildingId,
      image: '/static/img/flat-03.svg',
      type: 'Однушка',
      area: '96',
      number_of_balcony: 2,
      number_of_loggia: 1,
      price: '123000'
    }
  },
  components: {
    ButtonDefault
  },
  methods: {
    storeLayout () {
      const data = {
        house_id: this.house_id,
        api_key: this.$store.state.apiKey,
        company_id: this.$store.state.companyHashId,
        type: this.type,
        area: this.area,
        number_of_balcony: this.number_of_balcony,
        number_of_loggia: this.number_of_loggia,
        price: this.price,
        image: this.image
      }
      const floorProperties = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: floorProperties,
        url: '/flats-schemas',
        name: 'floorProperties'
      })
    }
  }
}
</script>

<style scoped>

</style>
