<template>
  <div class="house-floors">
    <div>
      <div class="floors-title">Создайте типовые планировки:</div>
      <div class="floors">
        <div class="floors-create">
          <div class="floors-create__image">
            <img width="200" height="200" src="/static/img/blank_layout.svg"/>
          </div>
          <ButtonDefault
            color="green"
            name="Добавить типовой этаж"
            :actionForClick="activateSidebar"
          />
        </div>
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

<style lang="less" scoped>
  @import (less) "../../static/less/color.less";
  @import (less) "../../static/less/font.less";
  @import (less) "../../static/less/form.less";
  @import (less) "../../static/less/grid.less";
  @import (less) "../../static/less/media.less";
  @import (less) "../../static/less/padding.less";
  .house-floors {
    .floors {
      &-title {
        .font(@s: 1.75rem; @w: 100);
        margin-bottom: 2rem;
      }
      .grid(@c: 5);
      @media @xdesktop {
        .grid(@c: 4);
      }
      @media @desktop {
        .grid(@c: 3);
      }
      @media @tablet {
        .grid(@c: 2);
      }
      @media @mobile {
        .grid(@c: 1);
      }
      &-create {
        background-color: @color-white;
        .padding(@v: 2rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        &:hover {
          box-shadow: 0 28px 50px rgba(22, 0, 27, 0.14);
        }
        &__image {
          margin-bottom: 2rem;
        }
      }
    }
  }
</style>
