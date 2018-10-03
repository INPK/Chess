<template>
  <Sidebar
    v-if="sidebarShowComputed"
    title="Создание"
    @closeSidebar="closeSidebarToFloor"
  >
    <AlertDefault
      v-if="singleErrorMessage"
      :message="singleErrorMessage"
      @alertDie="clearSingleError"
    />
    <div>
      <img
        v-if="editMode"
        width="100"
        height="100"
        :src="image"
      />
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.floor_number"
              class="form-group__alert"
            >
              {{ errorsStack.floor_number }}
            </span>
          </transition>
          № этажа: <input v-model="floorNumber" name="type"/>
        </div>
      </div>
      <div>
        Клонировать для этажей:
        <div>
          <span
            v-for="(floorNumber, index) in cFreeFloors"
            :key="index"
          >
            <label :for="floorNumber">{{ floorNumber }}</label>
            <input
              v-model="cloneFloors"
              type="checkbox"
              :id="floorNumber"
              :value="floorNumber"
              @change="chooseCloneFloor"
            />
          </span>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.number_of_flats"
              class="form-group__alert"
            >
              {{ errorsStack.number_of_flats }}
            </span>
          </transition>
          Количество квартир на этаже: <input v-model="numberOfFlats" name="number_of_flats"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.image"
              class="form-group__alert"
            >
              {{ errorsStack.image }}
            </span>
          </transition>
          Изображение: <input @change="processFile" name="image" type="file" />
          <button
            @click="resetImage"
            type="button"
          >Х</button>
          <img :src="imagePreview">
        </div>
      </div>
      <ButtonDefault
        v-if="!editMode"
        name="Создать этаж"
        color="green"
        :actionForClick="writeFloor"
      />
      <ButtonDefault
        v-else
        name="Обновить"
        color="green"
        :actionForClick="updateFloor"
      />
    </div>
  </Sidebar>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import Sidebar from './Sidebar'
import AlertDefault from './AlertDefault'

export default {
  name: 'HouseFloorsAdd',
  data () {
    return {
      floorNumber: this.selectedFloor.number,
      numberOfFlats: this.selectedFloor.number_of_flats,
      cloneFloors: [],
      floorImage: this.selectedFloor.image,
      imagePreview: '',
      freeFloors: [],
      errorsStack: []
    }
  },
  props: {
    storeIndex: String,
    houseId: {
      type: String,
      require: true
    },
    selectedFloor: Object,
    editMode: {
      type: Boolean,
      default: false
    },
    sidebarShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AlertDefault,
    ButtonDefault,
    Sidebar
  },
  created () {
    /* if (this.selectedFloor.clone_floors) {
      this.cloneFloors = this.selectedFloor.clone_floors
    } */
  },
  methods: {
    closeSidebarToFloor () {
      this.$emit('closeSidebar')
    },
    resetImage () {
      this.flatSchemaImage = ''
      this.imagePreview = ''
    },
    storeFloor (floorIdPath = '', action = 'writeItem') {
      let floorProperties = new FormData()
      const data = {
        api_key: this.$store.state.apiKey,
        house_id: this.houseId,
        number: this.floorNumber,
        number_of_flats: this.numberOfFlats,
        clone_floors: this.convertFloorRangeToSequence(this.cloneFloors),
        image: this.floorImage
      }
      for (let i in data) {
        floorProperties.append(i, data[i])
      }
      return this.$store.dispatch(action, {
        fields: floorProperties,
        url: '/floor-types' + floorIdPath,
        storageName: 'houseFloor'
      })
    },
    writeFloor () {
      this.storeFloor()
        .then(() => {
          this.$emit('refreshAfterChange')
        })
        .catch(error => {
          this.errorsStack = error.response.data
          console.info(error)
        })
    },
    updateFloor () {
      this.storeFloor('/' + this.selectedFloor.hash_id, 'updateItem')
        .then(() => {
          this.$emit('refreshAfterChange')
        })
        .catch(error => {
          this.errorsStack = error.response.data
          console.info(error.response.data)
        })
    },
    chooseCloneFloor (event) {
      let selectedFloor = Number(event.target.value)
      let firsValidFloor = this.cFreeFloors[0]
      if (this.cloneFloors.length > 2) {
        this.cloneFloors = []
        this.cloneFloors.push(selectedFloor)
      }
      this.cloneFloors.sort((first, second) => {
        return first - second
      })
      if (this.cloneFloors[0] > firsValidFloor) {
        this.errorsStack.message = 'Вы не можете оставить предыдущие этажи пустыми'
        this.cloneFloors = []
        setTimeout(() => {
          this.errorsStack.message = ''
        }, 3000)
      }
    },
    clearSingleError () {
      // Общее напоминание чистится методом удаления свойства single_error
      this.$delete(this.errorsStack, 'single_error')
    },
    clearError (event) {
      // Получаем id элемента и удаляем его из стека ошибок
      // Vue автоматически отреагирует на это, скрыв отображение
      let item = event.target.id
      this.$delete(this.errorsStack, item)
      this.clearSingleError()
    },
    processFile (event) {
      this.floorImage = event.target.files[0]
      this.floorImage = event.target.files[0]
      let reader = new FileReader()
      reader.onloadend = () => {
        this.imagePreview = reader.result
      }
      if (this.floorImage) {
        reader.readAsDataURL(this.floorImage)
      } else {
        this.imagePreview = ''
      }
    },
    convertFloorRangeToSequence (floorsRange) {
      let floorSequence = []
      /** Изначально параметр имеет вид строки (например 2,12).
       * Из этой строки делается последовательность от 2 до 12 вида [2,3,4...12] */
      for (let i = Number(floorsRange[0]); i <= Number(floorsRange[floorsRange.length - 1]); i++) {
        floorSequence.push(i)
      }
      return floorSequence
    }
  },
  computed: {
    sidebarShowComputed () {
      return this.sidebarShow
    },
    cFreeFloors () {
      let livingFloorsStr = JSON.parse(this.$store.state.properties).living_floors
      let livingFloorsArr = livingFloorsStr.split(',')
      livingFloorsArr[0] = Number(livingFloorsArr[0]) + 1
      /** Получаем список всех жилых этажей */
      /** Получаем последний записанный клонированный этаж */
      // let lastFloor = []
      let lastFloor = JSON.parse(this.$store.state.houseFloors)
      if (lastFloor.length) {
        let lastClonedFloorsStr = lastFloor.reverse()[0].clone_floors
        let lastClonedFloor = lastClonedFloorsStr.split(',').reverse()[0]
        /** Если последний клонированный не пуст, то им заменим первый этаж в общем списке */
        if (lastClonedFloor) {
          livingFloorsArr[0] = Number(lastClonedFloor) + 2
        }
      }
      return this.convertFloorRangeToSequence(livingFloorsArr)
    },
    singleErrorMessage () {
      if (this.errorsStack.single_error) {
        return this.errorsStack.message
      } else {
        return null
      }
    },
    validationClass () {
      let errors = {}
      for (let item in this.errorsStack) {
        errors[item] = 'error'
      }
      return errors
    }
  }
}
</script>

<style scoped>

</style>
