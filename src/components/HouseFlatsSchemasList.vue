<template>
  <div>
    <div>
      <h2>
        Создайте типовые планировки:
      </h2>
      <div class="uk-flex uk-child-width-1-5@m uk-child-width-1-2" uk-grid>
        <div class="usr-layout-create uk-background-default uk-padding">
          <img width="200" height="200" src="/static/img/blank_layout.svg"/>
          <ButtonDefault
            color="green"
            name="Добавить планировку"
            :actionForClick="activateSidebar"
          />
        </div>
        <AlertDefault
          v-if="singleErrorMessage"
          :message="singleErrorMessage"
          @alertDie="singleErrorMessage = ''"
        />
        <HouseFlatsSchemasItem
          v-for="(flatSchema, index) in flatsSchemas"
          :key="flatSchema.fields.hash_id"
          :flatSchemaId="flatSchema.fields.hash_id"
          :storeIndex="index"
          :image="flatSchema.fields.image"
          :type="flatSchema.fields.type"
          :area="flatSchema.fields.area"
          :numberOfBalcony="flatSchema.fields.number_of_balcony"
          :numberOfLoggia="flatSchema.fields.number_of_loggia"
          :price="flatSchema.fields.price"
          @activateSidebar="activateSidebar"
          @activateAlertConfirm="activateAlertConfirm"
        />
      </div>
    </div>
    <HouseFlatsSchemasAdd
      v-if="sidebar.show"
      :houseId="houseId"
      :selectedFlatSchema="sidebar.selectedFlatSchema"
      :editMode="sidebar.editMode"
      :sidebarShow="sidebar.show"
      @closeSidebar="closeSidebar"
      @refreshAfterChange="refreshAfterChange"
    />
    <AlertConfirm
      v-if="alertConfirm.isActive"
      :additionalMessage="alertConfirm.additionalMessage"
      @isAgree="removeFlatSchema"
      @isDisagree="closeAlertConfirm"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'
import AlertDefault from './AlertDefault'
import HouseFlatsSchemasItem from './HouseFlatsSchemasItem'
import HouseFlatsSchemasAdd from './HouseFlatsSchemasAdd'

export default {
  name: 'HouseFlatsSchemasList',
  data () {
    return {
      houseId: '',
      selectedFlatSchemaId: '',
      alertConfirm: {
        isActive: false,
        additionalMessage: 'Если вы удалите этот объект, то все данные будут отображаться не корректно'
      },
      flatsSchemas: [],
      sidebar: {
        show: false,
        editMode: false,
        selectedFlatSchema: {}
      },
      singleErrorMessage: ''
    }
  },
  components: {
    ButtonDefault,
    AlertConfirm,
    AlertDefault,
    HouseFlatsSchemasItem,
    HouseFlatsSchemasAdd
  },
  created () {
    let jsonHouseId = this.$store.state.properties
    if (jsonHouseId !== null) {
      this.houseId = JSON.parse(jsonHouseId).hash_id
      this.getFlatsSchemas()
    }
  },
  methods: {
    closeSidebar () {
      /** Возвращает все элементы объекта sidebar в data в первоначальное состояние */
      Object.assign(this.$data.sidebar, this.$options.data().sidebar)
    },
    getBack () {
      this.$router.push({
        name: 'HouseProperties',
        params: {
          houseStoreIndex: this.storeIndex
        }
      })
    },
    getFlatsSchemas () {
      return this.$store.dispatch('retrieveItem', {
        url: '/houses/' + this.houseId + '/flats-schemas',
        storageName: 'flatsSchemas'
      })
        .then(flatsSchemas => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'flatsSchemas',
            fields: flatsSchemas.data
          })
            .then(() => {
              this.flatsSchemas = JSON.parse(flatsSchemas.data)
            })
            .catch(error => {
              this.singleErrorMessage = 'Не могу получить список планировок. Обратитесь к администратору.'
              console.info(error.response.data)
              setTimeout(function () {
                this.singleErrorMessage = ''
              }, 3000)
            })
        })
    },
    activateSidebar (flatSchemaStoreIndex) {
      if (flatSchemaStoreIndex !== undefined) {
        this.sidebar.selectedFlatSchema = this.flatsSchemas[flatSchemaStoreIndex].fields
        this.sidebar.editMode = true
      }
      this.sidebar.show = true
    },
    removeFlatSchema () {
      this.$store.dispatch('removeItem', {
        url: '/flats-schemas/' + this.selectedFlatSchemaId
      })
        .then(() => {
          this.refreshAfterChange()
        })
        .catch(() => {
          this.singleErrorMessage = 'Не получилось удалить планировку'
        })
      this.closeAlertConfirm()
    },
    activateAlertConfirm (flatSchemaId) {
      this.selectedFlatSchemaId = flatSchemaId
      this.alertConfirm.isActive = true
    },
    refreshAfterChange () {
      this.alertConfirm.isActive = false
      this.getFloors()
      this.closeSidebar()
    },
    closeAlertConfirm () {
      this.alertConfirm.isActive = false
    }
  }
}
</script>

<style scoped>

</style>
