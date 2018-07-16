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
          <a href="#make-floors_container" uk-toggle>
            <ButtonDefault
              color="orange"
              name="Добавить планировку"
            />
          </a>
        </div>
        <BuildingsFlatsSchemas
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
    <BuildingsCreateFlatsSchemasAdd/>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsFlatsSchemas from './BuildingsFlatsSchemas'
import BuildingsCreateInfo from './BuildingsCreateInfo'
import BuildingsCreateFlatsSchemasAdd from './BuildingsCreateFlatsSchemasAdd'

export default {
  name: 'BuildingsCreateFlatsSchemas',
  data () {
    return {
      layouts: []
    }
  },
  components: {
    BuildingsCreateInfo,
    ButtonDefault,
    BuildingsFlatsSchemas,
    BuildingsCreateFlatsSchemasAdd
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
