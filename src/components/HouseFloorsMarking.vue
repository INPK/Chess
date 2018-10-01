<template>
    <div class="marking-container uk-flex">
      <div class="uk-width-3-4">
        <svg width="1200" height="1000" class="floor-schema" @click="updatePoints">
          <template v-for="(coordinates, id, index) in readyFlatsCoordinates">
            <polygon
              :style="{ fill: flatColors[index] }"
              :points="coordinates"
              :key="id"
              :class="id"
            ></polygon>
          </template>
          <polygon :points="totalPoints" @contextmenu="removeMarking"></polygon>
          <template v-for="(circle, i) in newFlat.points">
            <circle
              :cx="circle.x"
              :cy="circle.y"
              r="6"
              :key="circle.x + '' + i"
              @contextmenu="rightClick"
              @mouseup="handleMouseUp"
              @mousedown="handleMouseDown"
            ></circle>
          </template>
        </svg>
      </div>
      <div class="uk-width-1-4">
        <div class="usr-finished-flats uk-flex uk-flex-column">
          <div>
            <button
              @click="closeMarking"
              type="button"
            >Close</button>
            <FlatMarked
              v-for="(flatType, index) in computedFlatTypes"
              :key="flatType.fields.hash_id"
              :flatType="flatType.fields"
              :flatTypeId="flatType.fields.hash_id"
              :flatTypeNumber="flatType.fields.number"
              :flatIndex="index"
              :flatSchemas="flatsSchemasOfCurrentHouse"
              :editableFlatIndex="editableFlatIndex"
              @flatTypeRemovedSuccessful="getFlatTypes"
              @setCurrentCoordinates="editBlock"
            />
          </div>
          <span @click="createNewObject">Новый объект</span>
          <div v-if="!editMode">
            <AlertDefault
              v-if="alertMessage"
              :message="alertMessage"
              @alertDie="alertMessage = ''"
            />
            <h2
              v-if="markingIsNotCompleted"
            >Этаж не размечен до конца</h2>
            <div>
              Квартира № <input v-model="newFlat.number" type="number" name="number"/>
            </div>
            <div>
              Планировка
              <select
                v-model="newFlat.flatSchemaId"
                type="flatSchema"
                name="flatSchema"
              >
                <option
                  v-for="flatSchema in flatsSchemasOfCurrentHouse"
                  :key="flatSchema.fields.hash_id"
                  :value="flatSchema.fields.hash_id"
                >
                  {{ flatSchema.fields.type }}
                </option>
              </select>
            </div>
            <div>
              Подъезд № <input v-model.number="newFlat.entrance" type="number" />
            </div>
            <span>Окна выходят на: {{ newFlat.windows }}</span>
            <div class="uk-flex uk-flex-row">
              <label for="street">Улица</label>
              <input v-model="newFlat.windows" type="checkbox" id="street" value="Улица"/>
              <label for="north">Север</label>
              <input v-model="newFlat.windows" type="checkbox" id="north" value="Север"/>
              <label for="south">Юг</label>
              <input v-model="newFlat.windows" type="checkbox" id="south" value="Юг"/>
              <label for="outdoors">Двор</label>
              <input v-model="newFlat.windows" type="checkbox" id="outdoors" value="Двор"/>
              <label for="east">Восток</label>
              <input v-model="newFlat.windows" type="checkbox" id="east" value="Восток"/>
              <label for="west">Запад</label>
              <input v-model="newFlat.windows" type="checkbox" id="west" value="Запад"/>
            </div>
            <ButtonDefault
              name="Сохранить квартиру"
              color="green"
              :actionForClick="writeMarkedFlat"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import CommonMethods from './CommonMethods'
import FlatMarked from './FlatMarked'
import AlertDefault from './AlertDefault'

export default {
  name: 'HouseFloorsMarking',
  data () {
    return {
      houseId: this.$store.state.currentHouseId,
      flatsSchemasOfCurrentHouse: [],
      newFlat: {
        number: '',
        flatSchemaId: [],
        entrance: '',
        windows: [],
        selectedPointIndex: '',
        points: []
      },
      flatColors: [],
      flatTypes: [],
      originalFlatTypes: [],
      editMode: false,
      errorsStack: [],
      editableFlatIndex: null,
      alertMessage: ''
    }
  },
  props: {
    currentFloorId: String,
    numberOfFlats: {
      type: Number,
      required: true
    }
  },
  components: {
    FlatMarked,
    ButtonDefault,
    AlertDefault
  },
  mixins: [ CommonMethods ],
  created () {
    this.getFlatTypes()
    this.getFlatsSchemas()
  },
  methods: {
    getFlatsSchemas () {
      if (this.$store.state.flatsSchemas === undefined) {
        return this.$store.dispatch('retrieveItem', {
          url: '/houses/' + this.houseId + '/flats-schemas',
          storageName: 'flatsSchemas'
        })
          .then(flatsSchemas => {
            this.$store.dispatch('setItemToStore', {
              storageName: 'flatsSchemas',
              fields: JSON.stringify(flatsSchemas.data)
            })
              .then(() => {
                this.flatsSchemasOfCurrentHouse = JSON.parse(flatsSchemas.data)
              })
              .catch(error => {
                console.info('Не удалось получить планировки. Вот почему: ', error.response.data)
              })
          })
      } else {
        this.flatsSchemasOfCurrentHouse = JSON.parse(this.$store.state.flatsSchemas)
      }
    },
    getFlatTypes () {
      return this.$store.dispatch('retrieveItem', {
        url: '/floor-type/' + this.currentFloorId + '/flat-types',
        storageName: 'flatTypes'
      })
        .then(flatTypes => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'flatTypes',
            fields: flatTypes.data
          })
            .then(() => {
              this.originalFlats = flatTypes.data
              this.flatTypes = JSON.parse(flatTypes.data)
              this.flatTypes.map(item => {
              })
            })
            .catch(error => {
              if (error.response.status === 500) {
                this.alertMessage = 'Что-то пошло не так.'
              } else {
                this.errorsStack = error.response.data
                this.alertMessage = error.response.message
              }
            })
        })
    },
    editBlock (params) {
      this.flatTypes = JSON.parse(this.originalFlats)
      this.newFlat.points = []
      this.editMode = true
      this.editableFlatIndex = params.flatIndex
      this.flatTypes.map(flatType => {
        if (flatType.fields.hash_id === params.flatTypeId) {
          flatType.fields.coordinates = ''
        }
      })

      let editableCoordinates = params.coords.split(' ')
      editableCoordinates.map(coordsPair => {
        let coordsPairArr = coordsPair.split(',')
        this.updatePoints({
          pageX: coordsPairArr[0],
          pageY: coordsPairArr[1]
        })
      })
    },
    storeMarkedFlat (markedFlatsSchemaIdPath = '', action = 'writeItem') {
      let markedFlatData = {
        house_id: this.houseId,
        floor_type_id: this.currentFloorId,
        flat_schema_id: this.newFlat.flatSchemaId,
        entrance: this.newFlat.entrance,
        number: this.newFlat.number,
        windows: this.newFlat.windows.join(','),
        coordinates: this.totalPoints
      }
      return this.$store.dispatch(action, {
        fields: markedFlatData,
        url: '/flat-types',
        storageName: 'flatMarking'
      })
    },
    writeMarkedFlat () {
      let lastFlatIndex = this.flatTypes.length - 1
      if (lastFlatIndex >= 0) {
        let lastFlatNumber = this.flatTypes[lastFlatIndex].fields.number
        let lastFlatEntrance = this.flatTypes[lastFlatIndex].fields.entrance
        if ((Number(this.newFlat.entrance) - Number(lastFlatEntrance)) !== 1 || ((this.newFlat.number - lastFlatNumber) !== 1 && this.newFlat.entrance === lastFlatEntrance)) {
          this.alertMessage = 'Вы должны создавать квартиры последовательно!'
          return
        }
      }
      this.storeMarkedFlat()
        .then(() => {
          this.newFlat.points = []
          this.getFlatTypes()
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.alertMessage = 'Что-то пошло не так.'
          } else {
            this.errorsStack = error.response.data
            this.alertMessage = error.response.message
          }
        })
    },
    closeMarking () {
      this.$emit('closeMarking')
    },
    updateMarkedFlat () {
      this.storeMarkedFlat('/' + this.selectedFlatSchema.hash_id, 'updateItem')
    },
    processFile (event) {
      this.newFlat.flatSchema = event.target.files[0]
    },
    updatePoints (event) {
      this.setPoint(event.layerX, event.layerY)
    },
    checkSamePosition (nativeX, nativeY, pageX, pageY) {
      const differentStartPageX = Math.abs(nativeX - pageX)
      const differentStartPageY = Math.abs(nativeY - pageY)
      return (differentStartPageX <= 10 && differentStartPageY <= 10)
    },
    setPoint (x, y) {
      this.newFlat.points.push({ x: x, y: y })
    },
    rightClick (event) {
      event.preventDefault()
      let pageX = event.pageX
      let pageY = event.pageY
      for (let i in this.newFlat.points) {
        let item = this.newFlat.points[i]
        let isSamePosition = this.checkSamePosition(item.x, item.y, pageX, pageY)
        if (isSamePosition) {
          this.newFlat.points.splice(i, 1)
        }
      }
    },
    removeMarking (event) {
      event.preventDefault()
      this.newFlat.points = []
    },
    handleMouseDown (event) {
      if (event.button === 0) {
        this.newFlat.selectedPointIndex = this.newFlat.points.findIndex((item) => {
          let isSamePosition = this.checkSamePosition(item.x, item.y, event.pageX, event.pageY)
          return isSamePosition
        })
        document.addEventListener('mousemove', this.handleMouseMove)
      }
    },
    handleMouseUp (event) {
      if (event.button === 0) {
        document.removeEventListener('mousemove', this.handleMouseMove)
        this.newFlat.selectedPointIndex = ''
      }
    },
    handleMouseMove (event) {
      let i = this.newFlat.selectedPointIndex
      this.newFlat.points[i].x = event.pageX
      this.newFlat.points[i].y = event.pageY
    },
    addNewFlatColor () {
      this.flatColors.push('#' + Math.floor(Math.random() * 999999))
    },
    createNewObject () {
      this.editMode = false
      this.editableFlatIndex = null
    }
  },
  computed: {
    totalPoints () {
      let total = ''
      this.newFlat.points.map(function (item) {
        total += ' ' + item.x + ',' + item.y
      })
      return total.trim()
    },
    readyFlatsCoordinates () {
      let coordinates = {}
      this.flatTypes.map(flatType => {
        coordinates[flatType.fields.hash_id] = flatType.fields.coordinates
        this.addNewFlatColor()
      })
      return coordinates
    },
    computedFlatTypes () {
      return this.flatTypes
    },
    markingIsNotCompleted () {
      return this.computedFlatTypes.length - this.numberOfFlats !== 0
    }
  }
}

</script>

<style scoped>

  .marking-container {
    position: absolute;
    top: 0;
    background-color: white;
  }

  label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
  }

  circle {
    fill: #36a295;
    stroke: #3fbdb0;
    stroke-width: 2px;
  }

  polygon {
    fill: #42b983;
    opacity: .5;
    stroke: #545a6f;
  }

  .floor-schema {
    background-image: url("/static/img/plan.svg");
  }
</style>
