<template>
  <div>
    <ButtonDefault
      name="Предыдущий шаг"
      color="green"
      :actionForClick="getBack"
    />
    <HouseContainer>
      <HouseFlatsSchemasList/>
    </HouseContainer>
    <ButtonDefault
      name="Следующий шаг"
      color="green"
      :actionForClick="redirectToNextStep"
    />
    <AlertDefault
      v-if="alertMessage"
      :message="alertMessage"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseContainer from './HouseContainer'
import AlertDefault from './AlertDefault'
import HouseFlatsSchemasList from './HouseFlatsSchemasList'

export default {
  name: 'HouseFlatsSchemas',
  data () {
    return {
      alertMessage: ''
    }
  },
  components: {
    AlertDefault,
    ButtonDefault,
    HouseContainer,
    HouseFlatsSchemasList
  },
  methods: {
    getBack () {
      this.$router.push({
        name: 'HouseProperties',
        params: {
          houseStoreIndex: this.storeIndex
        }
      })
    },
    redirectToNextStep () {
      if (this.$store.state.flatsSchemas) {
        this.$router.push({
          name: 'HouseFloors',
          params: {
            houseStoreIndex: this.storeIndex
          }
        })
      } else {
        this.alertMessage = 'Вы не создали ни одной планировки'
      }
    }
  }
}
</script>

<style scoped>

</style>
