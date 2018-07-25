<template>
  <div>
    <a onclick="javascript:history.back(); return false;">
      <ButtonDefault
        name="Предыдущий шаг"
        color="grey"
      />
    </a>
    <div>
      <h2>
        Создайте типовые планировки:
      </h2>
      <div class="uk-flex uk-child-width-1-5@m uk-child-width-1-2" uk-grid>
        <div class="usr-layout-create uk-background-default uk-padding">
          <img width="200" height="200" src="/static/img/blank_layout.svg"/>
          <a href="#make-flats-schemas_container" uk-toggle>
            <ButtonDefault
              color="orange"
              name="Добавить планировку"
            />
          </a>
        </div>
        <BuildingsFlatsSchemasList
          v-for="layout in layouts"
          :key="layout.id"
          :img_source="layout.img_source"
          :apartment_type="layout.apartment_type"
          :area="layout.area"
          :balcony="layout.balcony"
          :loggia="layout.loggia"
        />
      </div>
    </div>
    <a href="/#/buildings/create/layout">
      <ButtonDefault
        name="Следующий шаг"
        color="aqua"
      />
    </a>
    <BuildingsFlatsSchemasAdd/>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsFlatsSchemasList from './BuildingsFlatsSchemasList'
import BuildingsInfo from './BuildingsInfo'
import BuildingsFlatsSchemasAdd from './BuildingsFlatsSchemasAdd'

export default {
  name: 'BuildingsFlatsSchemas',
  data () {
    return {
      layouts: []
    }
  },
  components: {
    BuildingsInfo,
    ButtonDefault,
    BuildingsFlatsSchemasList,
    BuildingsFlatsSchemasAdd
  },
  methods: {
  },
  created () {
    let buildingLayoutsJson = this.$store.state.buildingLayouts
    const buildingLayouts = JSON.parse(buildingLayoutsJson)
    this.layouts = buildingLayouts
  }
}
</script>

<style scoped>

</style>
