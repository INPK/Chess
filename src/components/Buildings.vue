<template>
  <div
    id="buildings"
    class=""
    uk-grid>
      <BuildingsNew/>
      <BuildingsItem
        v-for="building of buildings"
        :key="building.id"
        :title="building.title"
        :imageSource="building.imageSource"
        :description="building.description"
        :apartmentBalance="building.apartmentBalance"
        :address="building.address"
        :apartmentFree="building.apartmentFree"
        @viewDetail="viewDetail"
      />
  </div>
</template>

<script>
import BuildingsNew from './BuildingsNew'
import BuildingsItem from './BuildingsItem'

export default {
  name: 'Buildings',
  data () {
    return {
      buildings: [
        {
          id: 1,
          title: 'Millenium Falcon',
          imageSource: '/static/img/MilleniumFalcon.jpg',
          description: 'Жилой комплекс',
          apartmentBalance: 203,
          address: 'г.Ростов-на-Дону, ул.Ленина, д.120',
          apartmentFree: [
            { type: 'S', description: 'Студия (27м)', count: 129 },
            { type: 'S', description: 'Студия (27м)', count: 129 },
            { type: 'S', description: 'Студия (27м)', count: 129 },
            { type: 'S', description: 'Студия (27м)', count: 129 }
          ]
        },
        {
          id: 2,
          title: 'Millenium Falcon',
          imageSource: '/static/img/MilleniumFalconVilage.jpg',
          description: 'Жилой комплекс',
          apartmentBalance: 203,
          address: 'г.Ростов-на-Дону, ул.Ленина, д.120',
          apartmentFree: [
            { type: '2', description: 'Студия (27м)', count: 129 },
            { type: '2S', description: 'Студия (27м)', count: 129 },
            { type: 'S', description: 'Студия (27м)', count: 129 },
            { type: 'S', description: 'Студия (27м)', count: 129 }
          ]
        }
      ]
    }
  },
  components: {
    BuildingsItem,
    BuildingsNew
  },
  methods: {
    viewDetail (title) {
      console.log(title)
    }
  }
}
</script>

<style scoped>

</style>
