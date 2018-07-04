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
        <BuildingsLayout
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
    <BuildingsCreateLayoutsAdd/>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsLayout from './BuildingsLayout'
import BuildingsCreateInfo from './BuildingsCreateInfo'
import BuildingsCreateLayoutsAdd from './BuildingsCreateLayoutsAdd'

export default {
  name: 'BuildingsCreateLayout',
  data () {
    return {
      layouts: [
        {
          id: 1,
          img_source: '/static/img/flat-03.svg',
          apartment_type: '3-комнатная',
          area: 96,
          balcony: 2,
          loggia: 1
        },
        {
          id: 2,
          img_source: '/static/img/flat-03.svg',
          apartment_type: '2-комнатная',
          area: 56,
          balcony: 1,
          loggia: 1
        },
        {
          id: 3,
          img_source: '/static/img/flat-03.svg',
          apartment_type: '1-комнатная',
          area: 42,
          balcony: 1
        },
        {
          id: 5,
          img_source: '/static/img/flat-03.svg',
          apartment_type: '2-комнатная',
          area: 72,
          balcony: 2,
          loggia: 2
        }
      ]
    }
  },
  components: {
    BuildingsCreateInfo,
    ButtonDefault,
    BuildingsLayout,
    BuildingsCreateLayoutsAdd
  }
}
</script>

<style scoped>

</style>
