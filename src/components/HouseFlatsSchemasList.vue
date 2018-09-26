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
      @isDisagree="cancelRemove"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'
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
      }
    }
  },
  components: {
    ButtonDefault,
    AlertConfirm,
    HouseFlatsSchemasItem,
    HouseFlatsSchemasAdd
  },
  created () {
    this.houseId = JSON.parse(this.$store.state.properties).hash_id
    if (this.houseId !== undefined) {
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
              console.info(error)
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
    },
    activateAlertConfirm (flatSchemaId) {
      this.selectedFlatSchemaId = flatSchemaId
      this.alertConfirm.isActive = true
    },
    refreshAfterChange () {
      this.alertConfirm.isActive = false
      this.getFlatsSchemas()
      this.closeSidebar()
    },
    cancelRemove () {
      this.alertConfirm.isActive = false
    }
  }
}
</script>

<style scoped>

</style>
