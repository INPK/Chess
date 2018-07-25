<template>
    <div class="uk-flex">
      <div class="uk-width-3-4">
        <FlatSVG/>
      </div>
      <div class="uk-width-1-4">
        <div class="usr-finished-flats uk-flex uk-flex-column">
          <div>
            <span>Новый объект</span>
            <div>
              Квартира № <input v-model="flatNumber" type="number" name="floorNumber"/>
            </div>
            <div>
              Планировка <input type="file" @change="processFile" name="flatSchema"/>
            </div>
            <div>
              Подъезд № <input v-model="entranceNumber" type="number" />
            </div>
            <span>Окна выходят на: {{ windows }}</span>
            <div class="uk-flex uk-flex-row">
              <label for="street">Улица</label>
              <input v-model="windows" type="checkbox" id="street" value="Улица"/>
              <label for="north">Север</label>
              <input v-model="windows" type="checkbox" id="north" value="Север"/>
              <label for="south">Юг</label>
              <input v-model="windows" type="checkbox" id="south" value="Юг"/>
              <label for="outdoors">Двор</label>
              <input v-model="windows" type="checkbox" id="outdoors" value="Двор"/>
              <label for="east">Восток</label>
              <input v-model="windows" type="checkbox" id="east" value="Восток"/>
              <label for="west">Запад</label>
              <input v-model="windows" type="checkbox" id="west" value="Запад"/>
            </div>
          </div>
        </div>
        <ButtonDefault
          name="Сохранить квартиру"
          color="green"
          :actionForClick="storeFlat"
        />
      </div>
    </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import FlatSVG from './FlatSVG'

export default {
  name: 'BuildingsFloorsMarkup',
  data () {
    return {
      flatNumber: '',
      flatSchema: '',
      entranceNumber: '',
      windows: []
    }
  },
  components: {
    FlatSVG,
    ButtonDefault
  },
  methods: {
    storeFlat () {
      const data = {
        flat_number: this.flatNumber,
        api_key: this.$store.state.apiKey,
        company_id: this.$store.state.companyHashId,
        flat_schema: this.flatSchema,
        entrance_number: this.entranceNumber,
        windows: this.windows
      }
      const markedFlat = JSON.stringify(data)
      this.$store.dispatch('writeItem', {
        data: markedFlat,
        url: '/flats-schemas',
        name: 'buildingsMarkedFlats'
      })
        .then(response => {
          console.info(response)
        })
        .catch(error => {
          console.info(error.message)
        })
    },
    processFile (event) {
      this.flatSchema = event.target.files[0]
    }
  }
}
</script>

<style scoped>

  label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
  }

  #raw {
    position: absolute;
    top: 0;
    left: 300px;
  }
</style>
