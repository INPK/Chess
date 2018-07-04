<template>

  <div>
    <a onclick="javascript:history.back(); return false;">
      <ButtonDefault
        name="Предыдущий шаг"
        color="grey"
      />
    </a>
    <BuildingsCreate>
      <div class="uk-container uk-background-default uk-padding" uk-grid>
        <div class="uk-width-2-3">
          <h2>Введите информацию о комплексе:</h2>
          <h2>Введите характеристики дома:</h2>
          <span>этажей</span><input v-model="quantity_floors" name="quantity_floors"/>
          <span>жилых этажей</span><input v-model="living_floors" name="living_floors"/>
          <span>подъездов</span><input v-model="quantity_entrance" name="quantity_entrance"/>
          <span>квартир</span><input v-model="quantity_apartment" name="quantity_apartment"/>
          <span>улицай</span><input v-model="street_name" name="street_name"/>
          <span>№ дома</span><input v-model="number" name="number"/>
          <span>Отделка</span><input v-model="trim" name="trim"/>
          <span>Этап строительства</span><input v-model="stage_development" name="stage_development"/>
          <span>Начало строительства</span><input v-model="start_development" name="start_development"/>
          <span>Конец строительства</span><input v-model="end_development" name="end_development"/>
          <h2>Отделка:</h2>
          <div class="uk-flex uk-flex-row">
            <label for="without_trim">Стройвариант</label>
            <input v-model="materials" type="checkbox" id="without_trim" value="Стройвариант"/>
            <label for="rough_trim">Черновая</label>
            <input v-model="materials" type="checkbox" id="rough_trim" value="Черновая"/>
            <label for="prefinishing_trim">Предчистовая</label>
            <input v-model="materials" type="checkbox" id="prefinishing_trim" value="Предчистовая"/>
            <label for="finishing_trim">Чистовая</label>
            <input v-model="materials" type="checkbox" id="finishing_trim" value="Чистовая"/>
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

/**
 *
 *       materials: [],
 building_id: buildingId,
 quantity_floors: buildingProperties.quantity_floors || null,
 living_floors: buildingProperties.living_floors || null,
 quantity_entrance: buildingProperties.quantity_entrance || null,
 quantity_apartment: buildingProperties.quantity_apartment || null,
 street_name: buildingProperties.street_name || null,
 number: buildingProperties.number || null,
 trim: buildingProperties.trim || null,
 stage_development: buildingProperties.stage_development || null,
 start_development: buildingProperties.start_development || null,
 end_development: buildingProperties.end_development || null
 * */

export default {
  name: 'BuildingsCreateProperties',
  components: {
    ButtonDefault,
    BuildingsCreate
  },
  data () {
    return {
      materials: [],
      building_id: null,
      quantity_floors: null,
      living_floors: '',
      quantity_entrance: 2,
      quantity_apartment: 34,
      street_name: 'Rostov',
      number: '55',
      trim: 'Finished',
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
        quantity_floors: this.quantity_floors,
        living_floors: this.living_floors,
        quantity_entrance: this.quantity_entrance,
        quantity_apartment: this.quantity_apartment,
        street_name: this.street_name,
        number: this.number,
        materials: this.materials,
        trim: this.trim,
        stage_development: this.stage_development,
        start_development: this.start_development,
        end_development: this.end_development
      }
      const buildingProperties = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: buildingProperties,
        url: 'http://172.100.2.15:8000/houses',
        name: 'buildingProperties'
      })
        .then(response => {
          this.$router.push('/buildings/create/layout')
        })
        .catch(error => {
          console.info(error.message)
        })
    }
  },
  created () {
    let buildingInfoJson = this.$store.state.buildingInfo
    let buildingId = JSON.parse(buildingInfoJson).hash_id
    let buildingPropertiesJson = this.$store.state.buildingProperties
    const buildingProperties = JSON.parse(buildingPropertiesJson)
    this.building_id = buildingId
    for (let i in buildingProperties) {
      let value = buildingProperties[i]
      this[i] = value
    }
  }
}
</script>

<style scoped>

</style>
