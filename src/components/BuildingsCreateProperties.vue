<template>
  <div>
    <router-link to="/buildings/create/info">
      <ButtonDefault
        name="Предыдущий шаг"
        color="grey"
      />
    </router-link>
    <BuildingsCreate>
      <div class="uk-container uk-background-default uk-padding" uk-grid>
        <div class="uk-width-2-3">
          <h2>Введите информацию о комплексе:</h2>
          <h2>Введите характеристики дома:</h2>
          <span>этажей</span><input v-model="number_of_floors" name="number_of_floors"/>
          <span>жилых этажей</span><input v-model="living_floors" name="living_floors"/>
          <span>подъездов</span><input v-model="number_of_entrance" name="number_of_entrance"/>
          <span>квартир</span><input v-model="number_of_flat" name="number_of_flat"/>
          <span>улицай</span><input v-model="street_name" name="street_name"/>
          <span>№ дома</span><input v-model="number" name="number"/>
          <span>Отделка</span><input v-model="finishing" name="finishing"/>
          <span>Этап строительства</span><input v-model="stage_development" name="stage_development"/>
          <span>Начало строительства</span><input v-model="start_development" name="start_development"/>
          <span>Конец строительства</span><input v-model="end_development" name="end_development"/>
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
    </BuildingsCreate>
    <ButtonDefault
      name="Следующий шаг"
      color="aqua"
      :actionForClick = "storeBuildingsProperties"
    />
  </div>
</template>

<script>
import BuildingsCreate from './BuildingsCreate'
import ButtonDefault from './ButtonDefault'

export default {
  name: 'BuildingsCreateProperties',
  components: {
    ButtonDefault,
    BuildingsCreate
  },
  data () {
    return {
      materials: [],
      building_id: '',
      number_of_floors: 15,
      living_floors: '20',
      number_of_entrance: 2,
      number_of_flat: 34,
      street_name: 'Rostov',
      number: '55',
      finishing: 'Finished',
      stage_development: '20%',
      start_development: '2015-02-03',
      end_development: '2018-02-03'
    }
  },
  methods: {
    storeBuildingsProperties () {
      const data = {
        building_id: this.building_id,
        api_key: this.$store.state.apiKey,
        company_id: this.$store.state.companyHashId,
        number_of_floors: this.number_of_floors,
        living_floors: this.living_floors,
        number_of_entrance: this.number_of_entrance,
        number_of_flat: this.number_of_flat,
        street_name: this.street_name,
        number: this.number,
        materials: this.materials,
        finishing: this.finishing,
        stage_development: this.stage_development,
        start_development: this.start_development,
        end_development: this.end_development
      }
      const buildingProperties = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: buildingProperties,
        url: '/houses',
        name: 'buildingProperties'
      })
        .then(response => {
          this.$router.push('/buildings/create/flats-schemas')
        })
        .catch(error => {
          console.info(error.message)
        })
    }
  },
  created () {
    /**
     * BuildingId получаем из buildingInfo, потому-что там он гарантировано будет.
     * */
    let buildingInfoJson = this.$store.state.buildingInfo
    let buildingId = JSON.parse(buildingInfoJson).hash_id
    let buildingPropertiesJson = this.$store.state.buildingProperties
    const buildingProperties = JSON.parse(buildingPropertiesJson)
    this.building_id = buildingId
    for (let key in buildingProperties) {
      let value = buildingProperties[key]
      this[key] = value
    }
  }
}
</script>

<style scoped>

</style>
