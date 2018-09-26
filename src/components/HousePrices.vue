<template>
  <div>
    <HouseContainer>
      <div>
        <span>Введите цену и площадь квартир</span>
        <label for="expandFloorToggle">Развернуть все этажи</label>
        <input v-model="expandFloors" type="checkbox" id="expandFloorToggle"/>
        <ButtonDefault
          name="Импорт данных"
          color="green"
          :actionForClick="dataImport"
        />
      </div>
    </HouseContainer>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseContainer from './HouseContainer'

export default {
  name: 'HousePrices',
  data () {
    return {
      expandFloors: false
    }
  },
  components: {
    ButtonDefault,
    HouseContainer
  },
  methods: {
    dataImport () {
      alert('Импорт цен')
    }
  }
}
</script>

<style scoped>

</style>
