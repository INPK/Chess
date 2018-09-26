<template>
  <div>
    <div>
      <div class="uk-flex uk-flex-between">
        <router-link :to="{ name: 'BuildingMain'  }">Жилой комплекс</router-link>
        <h1>ЖК "Millennium Falcon" (шаг №1 из 6)</h1>
        <ButtonDefault
          name="Удалить объект"
          color="red"
        />
      </div>
      <ul class="uk-width-1-1 uk-navbar-nav">
        <li><router-link :to="{ name: 'HouseProperties' }">1. Характеристики дома</router-link></li>
        <li><router-link :to="{ name: 'HouseFlatsSchemas' }">2. Типовые планровки</router-link></li>
        <li><router-link :to="{ name: 'HouseFloors' }">3. Типовые этажи</router-link></li>
        <li><router-link :to="{ name: 'HouseChess' }">4. Пронумеровать</router-link></li>
        <li><router-link :to="{ name: 'HousePrices' }">5. Цены</router-link></li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'

export default {
  name: 'HouseContainer',
  components: {
    ButtonDefault
  }
}
</script>

<style scoped>

</style>
