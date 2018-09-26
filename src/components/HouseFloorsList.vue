<template>
  <div>
    <div>
      <h2>
        Создайте типовые планировки:
      </h2>
      <div class="uk-flex uk-child-width-1-5@m uk-child-width-1-2" uk-grid>
        <HouseFloorsItem
          v-for="(floor, index) in floors"
          :key="floor.hash_id"
          :floorId="floor.hash_id"
          :storeIndex="index"
          :image="floor.image"
          :floorNumber="floor.number"
          :numberOfFlats="floor.number_of_flats"
          :markingEnable="floor.marking_enable"
          :cloneFloors="floor.clone_floors.split(',')"
          @activateSidebar="activateSidebar"
          @activateAlertConfirm="activateAlertConfirm"
          @emitMarkingFloor="markingFloor"
        />
      </div>
    </div>
    <div class="usr-layout-create uk-background-default uk-padding">
      <img width="200" height="200" src="/static/img/blank_layout.svg"/>
      <ButtonDefault
        color="green"
        name="Добавить типовой этаж"
        :actionForClick="activateSidebar"
      />
    </div>
    <HouseFloorsAdd
      v-if="sidebar.show"
      :houseId="houseId"
      :selectedFloor="sidebar.selectedFloor"
      :editMode="sidebar.editMode"
      :sidebarShow="sidebar.show"
      :storeIndex="sidebar.storeIndex.toString()"
      @closeSidebar="closeSidebar"
      @refreshAfterChange="refreshAfterChange"
    />
    <HouseFloorsMarking
      v-if="floorMarking"
      :currentFloorId="selectedFloor.id"
      :numberOfFlats="selectedFloor.numberOfFlats"
      @closeMarking="closeMarking"
    />
    <AlertConfirm
      v-if="alertConfirm.isActive"
      :additionalMessage="alertConfirm.additionalMessage"
      @isAgree="removeFloor"
      @isDisagree="cancelRemove"
    />
    <AlertDefault
      v-if="alertMessage"
      :message="alertMessage"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'
import AlertDefault from './AlertDefault'
import HouseContainer from './HouseContainer'
import HouseFloorsAdd from './HouseFloorsAdd'
import HouseFloorsItem from './HouseFloorsItem'
import HouseFloorsMarking from './HouseFloorsMarking'

export default {
  name: 'HouseFloorsList',
  data () {
    return {
      houseId: '',
      selectedFloor: {
        id: '',
        numberOfFlats: null
      },
      floorMarking: false,
      alertConfirm: {
        isActive: false,
        additionalMessage: 'Если вы удалите этот объект, то все данные будут отображаться не корректно'
      },
      alertMessage: '',
      floors: [],
      sidebar: {
        show: false,
        editMode: false,
        storeIndex: '',
        selectedFloor: {}
      }
    }
  },
  components: {
    ButtonDefault,
    AlertConfirm,
    AlertDefault,
    HouseContainer,
    HouseFloorsAdd,
    HouseFloorsItem,
    HouseFloorsMarking
  },
  created () {
    this.houseId = this.$store.state.currentHouseId
    if (this.houseId !== undefined) {
      this.getFloors()
    }
  },
  methods: {
    closeSidebar () {
      /** Возвращает все элементы объекта sidebar в data в первоначальное состояние */
      Object.assign(this.$data.sidebar, this.$options.data().sidebar)
    },
    closeMarking () {
      this.floorMarking = false
      this.getFloors()
    },
    getBack () {
      this.$router.push({ name: 'HouseFlatsSchemas' })
    },
    getFloors () {
      this.$store.dispatch('retrieveItem', {
        url: '/houses/' + this.houseId + '/floor-types',
        storageName: 'houseFloors'
      })
        .then(houseFloors => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'houseFloors',
            fields: JSON.stringify(houseFloors.data)
          })
            .then(() => {
              this.floors = houseFloors.data
            })
            .catch(error => {
              console.info(error)
            })
        })
    },
    markingFloor (floorParams) {
      this.floorMarking = floorParams.markingEnable
      this.selectedFloor.id = floorParams.id
      this.selectedFloor.numberOfFlats = floorParams.numberOfFlats
      if (!this.floorMarking) {
        this.alertMessage = 'Сначала Вы должны разметить предыдущий этаж'
        setTimeout(() => {
          this.alertMessage = ''
        }, 2500)
      }
    },
    activateSidebar (floorStoreIndex) {
      if (floorStoreIndex !== undefined) {
        this.sidebar.storeIndex = floorStoreIndex
        this.sidebar.selectedFloor = this.floors[floorStoreIndex].fields
        console.info(this.floors, this.floors[floorStoreIndex].fields)
        this.sidebar.editMode = true
      }
      this.sidebar.show = true
    },
    removeFloor () {
      this.$store.dispatch('removeItem', {
        url: '/floor-types/' + this.selectedFloor.id
      })
    },
    activateAlertConfirm (floorId) {
      this.selectedFloor.id = floorId
      this.alertConfirm.isActive = true
    },
    refreshAfterChange () {
      this.getFloors()
      this.closeSidebar()
    }
  }
}
</script>

<style scoped>

</style>
