<template>
  <div>
    <HouseContainer>
      <router-link :to="{ name: 'Buildings'  }">Главная</router-link>
      <AlertDefault
        v-if="singleErrorMessage"
        :message="singleErrorMessage"
        @alertDie="singleErrorMessage = ''"
      />
      <div class="uk-container uk-background-default uk-padding" uk-grid>
        <div class="uk-width-2-3">
          <h2>Введите информацию о комплексе:</h2>
          <h2>Введите характеристики дома:</h2>
          <span>этажей</span><input v-model="numberOfFloors" name="number_of_floors"/>
          <div><span>жилые этажы</span>
            <input v-model="livingFloorsStart" placeholder="с"/>
            <input v-model="livingFloorsEnd" placeholder="по"/>
          </div>
          <span>подъездов</span><input v-model="numberOfEntrance" name="number_of_entrance"/>
          <span>квартир</span><input v-model="numberOfFlat" name="number_of_flat"/>
          <span>улицай</span><input v-model="streetName" name="street_name"/>
          <span>№ дома</span><input v-model="number" name="number"/>
          <span>Отделка</span><input v-model="finishing" name="finishing"/>
          <span>Этап строительства</span><input v-model="stageDevelopment" name="stage_development"/>
          <span>Начало строительства</span><input v-model="startDevelopment" name="start_development"/>
          <span>Конец строительства</span><input v-model="endDevelopment" name="end_development"/>
          <h2>Отделка:</h2>
          <div class="uk-flex uk-flex-row">
            <label for="without_finishing">Стройвариант</label>
            <input v-model="materials" type="checkbox" id="without_finishing" value="Стройвариант"/>
            <label for="rough_finishing">Черновая</label>
            <input v-model="materials" type="checkbox" id="rough_finishing" value="Черновая"/>
            <label for="prefinishing_finishing">Предчистовая</label>
            <input v-model="materials" type="checkbox" id="prefinishing_finishing" value="Предчистовая"/>
            <label for="finishing_finishing">Чистовая</label>
            <input v-model="materials" type="checkbox" id="finishing_finishing" value="Чистовая"/>
            <label for="with_repair">С ремонтом</label>
            <input v-model="materials" type="checkbox" id="with_repair" value="С ремонтом"/>
            <span>Материалы: {{ materials }}</span>
          </div>
        </div>
      </div>
      <ButtonDefault
        v-if="!editMode"
        name="Следующий шаг"
        color="green"
        :actionForClick="createHouseProperties"
      />
      <div v-else>
        <ButtonDefault
          name="Обновить"
          color="green"
          :actionForClick="updateHouseProperties"
        />
        <ButtonDefault
          name="Пропустить"
          color="green"
          :actionForClick = "skipStep"
        />
      </div>
    </HouseContainer>
  </div>
</template>

<script>
import HouseContainer from './HouseContainer'
import ButtonDefault from './ButtonDefault'

export default {
  name: 'HouseProperties',
  components: {
    ButtonDefault,
    HouseContainer
  },
  data () {
    return {
      houseId: '',
      buildingId: '',
      materials: [],
      numberOfFloors: null,
      livingFloorsStart: '',
      livingFloorsEnd: '',
      numberOfEntrance: null,
      numberOfFlat: null,
      streetName: '',
      number: '',
      finishing: '',
      stageDevelopment: '',
      startDevelopment: '',
      endDevelopment: '',
      errorsStack: [],
      editMode: false
    }
  },
  created () {
    this.houseId = this.$store.state.currentHouseId
    if (this.houseId !== undefined) {
      this.getProperties()
        .then(houseProperties => {
          this.editMode = true
          this.fillHouseProperties(houseProperties.data)
        })
    }
    /** Временно, пока для записи нужен Building Id. Илья обещал убрать */
    let currentBuildingStoreIndex = this.$store.state.currentBuildingStoreIndex
    this.buildingId = JSON.parse(this.$store.state.buildings)[currentBuildingStoreIndex].building.hash_id
  },
  methods: {
    getProperties () {
      return this.$store.dispatch('retrieveItem', {
        url: '/houses/' + this.houseId,
        storageName: 'properties'
      })
    },
    fillHouseProperties (house) {
      let livingFloorsArr = house.living_floors.split(',')
      this.houseId = house.hash_id
      this.buildingId = house.building_hash_id
      this.materials = house.materials.split(',')
      this.numberOfFloors = house.number_of_floors
      this.livingFloorsStart = livingFloorsArr[0]
      this.livingFloorsEnd = livingFloorsArr[1]
      this.numberOfEntrance = house.number_of_entrance
      this.numberOfFlat = house.number_of_flat
      this.streetName = house.street_name
      this.number = house.number
      this.finishing = house.finishing
      this.stageDevelopment = house.stage_development
      this.startDevelopment = house.start_development
      this.endDevelopment = house.end_development
    },
    createHouseProperties () {
      this.storeHouseProperties()
        .then((response) => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'properties',
            fields: JSON.stringify(response.data)
          })
          this.$store.dispatch('setItemToStore', {
            storageName: 'currentHouseId',
            fields: response.data.hash_id
          })
          this.$router.push({ name: 'HouseFlatsSchemas' })
        })
        .catch(error => {
          this.errorsStack = error.response.data
        })
    },
    updateHouseProperties () {
      this.storeHouseProperties('/' + this.houseId, 'updateItem')
        .then(() => { this.$router.push({ name: 'BuildingMain' }) })
        .catch(error => { console.info(error) })
    },
    skipStep () {
      this.$router.push({ name: 'HouseFlatsSchemas' })
    },
    storeHouseProperties (houseIdPath = '', action = 'writeItem') {
      const houseProperties = {
        building_id: this.buildingId,
        materials: this.materials.join(',').trim(),
        number_of_floors: this.numberOfFloors,
        living_floors: this.livingFloors,
        number_of_entrance: this.numberOfEntrance,
        number_of_flat: this.numberOfFlat,
        street_name: this.streetName,
        number: this.number,
        finishing: this.finishing,
        stage_development: this.stageDevelopment,
        start_development: this.startDevelopment,
        end_development: this.endDevelopment
      }
      return this.$store.dispatch(action, {
        fields: houseProperties,
        url: '/houses' + houseIdPath,
        storageName: 'properties'
      })
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
    }
  },
  computed: {
    validationClass () {
      let errors = {}
      // Возвращается массив с набором элементов, для которых отрисовывается класс error
      // Если элемент удалён из стека ошибок, то и здесь его не будет
      for (let item in this.errorsStack) {
        errors[item] = 'error'
      }
      return errors
    },
    singleErrorMessage () {
      if (this.errorsStack.single_error) {
        return this.errorsStack.message
      } else {
        return null
      }
    },
    livingFloors () {
      return this.livingFloorsStart + ',' + this.livingFloorsEnd
    }
  }
}
</script>

<style scoped>

</style>
