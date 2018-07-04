<template>
  <div class="uk-offcanvas-content" >
    <div id="make-floors_container" uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar">
        <img src="/static/img/flat-03.svg">
        <div>
          Тип квартиры: <input v-model="type_apartment" name="type_apartment"/>
        </div>
        <div>
          Типовая площадь: <input v-model="typical_area" name="typical_area"/>
        </div>
        <div>
          Балконы: <input v-model.number="quantity_balcony" name="quantity_balcony"/>
        </div>
        <div>
          Лоджии: <input v-model.number="quantity_loggia" name="quantity_loggia"/>
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
  name: 'BuildingsCreateLayoutsAdd',
  data () {
    let buildingPropertiesJson = this.$store.state.buildingProperties
    const houseId = JSON.parse(buildingPropertiesJson).hash_id
    return {
      house_id: houseId,
      image: '/static/img/flat-03.svg',
      type_apartment: 'Однушка',
      typical_area: '96',
      quantity_balcony: 2,
      quantity_loggia: 1,
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
        type_apartment: this.type_apartment,
        typical_area: this.typical_area,
        quantity_balcony: this.quantity_balcony,
        quantity_loggia: this.quantity_loggia,
        price: this.price,
        image: this.image
      }
      const layoutsProperties = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: layoutsProperties,
        url: 'http://172.100.2.15:8000/planings',
        name: 'layoutsProperties'
      })
    }
  }
}
</script>

<style scoped>

</style>
