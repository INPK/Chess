<template>
    <div>
      <router-link :to="{ name: 'Buildings'  }">Главная</router-link>
      <router-link :to="{ name: 'BuildingMain'  }">Жилой комплекс</router-link>
      <h1></h1>
      <ul class="uk-width-1-1 uk-navbar-nav">
        <li><router-link :to="{ name: 'HouseMainProperties' }">Характеристики дома</router-link></li>
        <li><router-link :to="{ name: 'HouseMainChess' }">Шахматка</router-link></li>
        <li><router-link :to="{ name: 'HouseMainFlatsSchemas' }">Типовые планровки</router-link></li>
        <li><router-link :to="{ name: 'HouseMainFloors' }">Типовые этажи</router-link></li>
        <li><router-link :to="{ name: 'HouseMainPrices' }">Фасады</router-link></li>
      </ul>
      <div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HouseMain',
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
