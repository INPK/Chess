<template>
  <div>
    <div>
      <h2>
        Создайте типовые планировки:
      </h2>
      <div class="uk-flex uk-child-width-1-5@m uk-child-width-1-2" uk-grid>
        <div class="usr-layout-create uk-background-default uk-padding">
          <img width="200" height="200" src="/static/img/blank_layout.svg"/>
        </div>
        <!-- <BuildingsFloorsList/> -->
      </div>
    </div>
    <a href="#make-floors_container" uk-toggle>
      <ButtonDefault
        color="orange"
        name="Добавить планировку"
        :actionForClick="activeFloorAdd"
      />
    </a>
    <BuildingsFloorsAdd/>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsFloorsAdd from './BuildingsFloorsAdd'
import BuildingsInfo from './BuildingsInfo'

export default {
  name: 'BuildingsFloors',
  data () {
    return {
      floorAdd: true
    }
  },
  components: {
    ButtonDefault,
    BuildingsInfo,
    BuildingsFloorsAdd
  },
  methods: {
    activeFloorAdd () {
      this.floorAdd = true
    }
  }
}
</script>

<style scoped>

</style>
