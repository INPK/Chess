<template>
  <div>
    <h2>Выберите тип объекта</h2>
    <div class="object-types">

      <router-link
        :to="{ name: 'BuildingsCreateInfo' }"
        class="object-types_item uk-flex uk-flex-middle uk-margin"
        id="buildings"
        name="type"
      >
        <img src="/static/img/1.svg" width="50"/>
        <div>
          <div>Добавить жилой комплекс</div>
          <div>Состоит из 1 дома</div>
        </div>
      </router-link>

      <router-link
        :to="{ name: 'BuildingsCreateInfo' }"
        class="object-types_item uk-flex uk-flex-middle uk-margin"
        id="district"
        name="type"
      >
        <img src="/static/img/2.svg" width="50"/>
        <div>
          <div>Добавить жилой комплекс</div>
          <div>Состоит из 1 дома</div>
        </div>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BuildingsType'
}
</script>

<style scoped>

</style>
