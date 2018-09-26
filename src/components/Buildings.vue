<template>
  <div uk-grid>
    <div class="uk-width-1-1 uk-width-1-3@m">
      <div class="uk-card uk-card-default">
        <div class="uk-card-body">
          <h2 class="uk-text-left">Новый объект</h2>
          <ButtonDefault
            name="Добавить объект вручную"
            color="grey"
            :actionForClick = "redirectToCreate"
          ></ButtonDefault>
          <ButtonDefault
            name="Создадим за вас (бесплатно)"
            color="aqua"
          ></ButtonDefault>
        </div>
        <img src="/static/img/PersonalManager.jpg" alt="">
      </div>
    </div>
      <BuildingsItem
        v-for="(item, index) of buildings"
        :key="item.building.id"
        :storeIndex="index"
        :id="item.building.id"
        :title="item.building.name"
        :imageSource="item.building.images"
        :city="item.building.city"
        :address="item.building.address"
        :country="item.building.country"
        :district="item.building.district"
        :region="item.building.region"
        :flats="item.flats_by_type"
        @viewDetail="viewDetail"
      />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsItem from './BuildingsItem'

export default {
  name: 'Buildings',
  data () {
    return {
      buildings: []
    }
  },
  components: {
    BuildingsItem,
    ButtonDefault
  },
  created () {
    this.$store.dispatch('destroyItemFromStore', 'currentBuildingStoreIndex')
    let companyHashId = this.$store.state.companyHashId
    this.$store.dispatch('retrieveItem', {
      url: '/company/' + companyHashId + '/buildings',
      storageName: 'buildings'
    })
      .then(response => {
        this.$store.dispatch('setItemToStore', {
          storageName: 'buildings',
          fields: JSON.stringify(response.data)
        })
        this.buildings = response.data
      })
      .catch(error => {
        console.info(error)
      })
  },
  methods: {
    viewDetail (title) {
      console.log(title)
    },
    redirectToCreate () {
      this.$router.push({ name: 'BuildingProperties' })
    }
  }
}
</script>

<style scoped>

</style>
