<template>
  <div class="uk-card">
    <div class="uk-card-header">
      <img :src="img_source">
    </div>
    <div class="uk-card-body">
      <div>
        Тип квартиры: {{ apartment_type }}
      </div>
      <div>
        Типовая площадь: {{ area }} м <sup>2</sup>
      </div>
      <div>
        Балконы: {{ balcony }}
      </div>
      <div>
        Лоджии: {{ loggia }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingsFlatsSchemasList',
  props: {
    img_source: {
      type: String,
      required: true
    },
    apartment_type: String,
    area: {
      type: Number,
      required: true
    },
    balcony: Number,
    loggia: Number
  }
}
</script>

<style scoped>

</style>
