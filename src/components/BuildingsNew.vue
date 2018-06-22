<template>
  <div class="uk-width-1-1 uk-width-1-3@m">
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <h2 class="uk-text-left">Новый объект</h2>
        <ButtonDefault
          name="Добавить объект вручную"
          color="grey"
          :actionForClick = "viewObjectTypes"
        ></ButtonDefault>
        <BuildingsType v-if="isAddObject" />
        <ButtonDefault
          name="Создадим за вас (бесплатно)"
          color="aqua"
        ></ButtonDefault>
      </div>
      <div v-if="!isAddObject" class="uk-card-media-bottom">
        <img src="/static/img/PersonalManager.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsType from './BuildingsType'

export default {
  name: 'BuildingsNew',
  components: {
    ButtonDefault,
    BuildingsType

  },
  data () {
    return {
      isAddObject: false
    }
  },
  methods: {
    viewObjectTypes: function () {
      this.isAddObject = !(this.isAddObject)
    }
  }
}
</script>

<style scoped>

</style>
