<template>
  <div
    :class="floorIndex"
    @click="editFloor"
  >
    <div>
      <div>
        <h3>
          <span>Этаж {{ floorNumber }}</span>
          <span>^</span>
        </h3>
        <h1 v-if="editMode">{{ floorNumber }}</h1>
      </div>
      <transition name="slide-fade">
        <div v-if="editMode">
          <span>Номер квартиры</span>
          <span>Планировка</span>
          <span>Площадь</span>
          <span>Цена</span>
          <span>Подъезд</span>
          <span>Статус</span>
          <div
            v-for="(flat, index) in floor"
            class="tmp-flat"
            :key="index"
          >
            <HousePricesFlat
              :number="flat.number"
              :flatId="flat.hash_id"
              :flatSchema="flat.flat_schema"
              :area="flat.area"
              :price="Number(flat.price)"
              :entrance="flat.entrance"
              :status="flat.status"
              @updateFlatsList="updateFlatsList"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import HousePricesFlat from './HousePricesFlat'
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'

export default {
  name: 'HousePricesFloor',
  data () {
    return {
      alertShow: false,
      selectedFloor: [],
      floorNumber: ''
    }
  },
  props: {
    floor: {
      type: Array,
      required: true
    },
    floorIndex: Number,
    editableFloorIndex: Number
  },
  components: {
    AlertConfirm,
    ButtonDefault,
    HousePricesFlat
  },
  created () {
    this.floorNumber = this.floor[0].floor
  },
  methods: {
    alertConfirm () {
      this.alertShow = true
    },
    editFloor () {
      if (!this.editMode) {
        this.$emit('editFloor', this.floorIndex)
      }
    },
    updateFlatsList (editableFlatData) {
      this.$emit('updateFlatsList', editableFlatData)
    }
  },
  computed: {
    editMode () {
      return this.editableFloorIndex === this.floorIndex
    }
  }
}
</script>

<style scoped>

</style>
