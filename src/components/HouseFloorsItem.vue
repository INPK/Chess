<template>
  <div class="uk-card"
       @mouseover="toggleEditButton"
       @mouseout="toggleEditButton"
  >
      <ButtonDefault
        v-if="isVisibleButtons"
        name="Редактировать"
        color="green"
        class="button-expand"
        :actionForClick="editFloor"
      />
      <ButtonDefault
        v-if="isVisibleButtons"
        name="Удалить"
        color="grey"
        class="button-expand"
        :actionForClick="removeFloor"
      />
    <div class="uk-card">
      <div
        v-if="markingEnable">
        Этаж доступен для разметки
      </div>
      <div class="uk-card-header">
        <img :src="image">
      </div>
      <div class="uk-card-body">
        <div>
          № этажа: {{ floorNumber }}
        </div>
        <div>
          Клонировать для этажей:
          <span v-for="(cloneFloor, i) in cloneFloors" :key="i">{{ cloneFloor }},</span>
        </div>
        <ButtonDefault
          v-if="isVisibleButtons"
          name="Разметить этаж"
          color="green"
          class="button-expand"
          :actionForClick="emitMarkingFloor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseFloorsAdd from './HouseFloorsAdd'

export default {
  name: 'HouseFloorsItem',
  data () {
    return {
      isVisibleButtons: false,
      sidebarShow: false
    }
  },
  components: {
    ButtonDefault,
    HouseFloorsAdd
  },
  props: {
    houseId: {
      type: String,
      require: true
    },
    floorId: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true
    },
    floorNumber: {
      type: Number,
      require: true
    },
    markingEnable: {
      type: Boolean,
      require: true
    },
    cloneFloors: {
      type: Array,
      require: true
    },
    numberOfFlats: {
      type: Number,
      require: true
    },
    storeIndex: {
      type: Number,
      require: true
    }
  },
  methods: {
    toggleEditButton () {
      this.isVisibleButtons = !this.isVisibleButtons
    },
    emitMarkingFloor () {
      this.$emit('emitMarkingFloor', {
        id: this.floorId,
        storeIndex: this.storeIndex,
        numberOfFlats: this.numberOfFlats,
        markingEnable: this.markingEnable
      })
    },
    removeFloor () {
      this.$emit('activateAlertConfirm', this.floorId)
    },
    editFloor () {
      this.$emit('activateSidebar', this.storeIndex)
    }
  }
}
</script>

<style scoped>

</style>
