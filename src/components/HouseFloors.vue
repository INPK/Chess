<template>
  <div>
    <ButtonDefault
      name="Предыдущий шаг"
      color="green"
      :actionForClick="getBack"
    />
    <HouseContainer>
      <HouseFloorsList/>
    </HouseContainer>
    <ButtonDefault
      name="Следующий шаг"
      color="green"
      :actionForClick="redirectToNextStep"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseFloorsList from './HouseFloorsList'
import HouseContainer from './HouseContainer'

export default {
  name: 'HouseFloors',
  components: {
    HouseFloorsList,
    HouseContainer,
    ButtonDefault
  },
  methods: {
    getBack () {
      this.$router.push({ name: 'HouseFlatsSchemas' })
    },
    redirectToNextStep () {
      this.$router.push({ name: 'HouseChess' })
    }
  }
}
</script>

<style scoped>

</style>
