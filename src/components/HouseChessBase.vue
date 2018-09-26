<template>
    <div class="uk-flex">
      <div class="tmp-chess uk-width-1-3">
        <h3>Проверьте правильность нумерации квартир и приступите к последнему шагу</h3>
        <h5>При необходимости вернитесь на предыдущий шаг для внесения правок</h5>
        <div class="uk-width-2-3">
          <div
            v-for="(flatType, index) in flatTypes"
            :key="index"
          >
            <span>{{ flatType.type }}</span>
            <span>{{ flatType.number_of }}</span>
          </div>
        </div>
      </div>
      <div>
        <h3>Шахматка</h3>
        <div>
          <div class="uk-flex uk-flex-row">
            <label for="rooms">Комнатность</label>
            <input v-model="roomsView" type="checkbox" id="rooms" value="rooms"/>
          </div>
          <div class="uk-flex uk-flex-column">
            <div class="tmp-headers uk-flex uk-flex-between">
              <h5>Этажи</h5>
              <h5>Подъезды </h5>
              <h5>Этажи</h5>
            </div>
            <div
              v-for="(flat, index) in flats.slice().reverse()"
              :key=index
              :floor="flat[0].floor"
            >
              <div>
                <span>Этаж {{ flat[0].floor }}</span>
                <div>
                  <span>
                    {{ flat[0].floor }}
                  </span>
                  <span
                    v-for="(properties, index) in flat"
                    class="tmp-flat"
                    :key="index"
                  >
                    <span v-if="roomsView">{{ properties.number }}</span>
                    <span v-else>{{ properties.number_of_rooms }}</span>
                  </span>
                  <span>
                    {{ flat[0].floor }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HouseChessBase',
  data () {
    return {
      roomsView: true,
      focusedFloor: false,
      focusMode: 'off',
      flats: {},
      flatTypes: {}
    }
  },
  created () {
    this.houseId = this.$store.state.currentHouseId
    this.$store.dispatch('retrieveItem', {
      // url: '/houses/' + this.houseId + '/flats'
      url: '/houses/' + this.houseId + '/flats'
    })
      .then(response => {
        this.flats = response.data.flats
        this.flatTypes = response.data.number_of_flats_by_type
      })
      .catch(error => {
        console.info('ERROR', error.response.data)
      })
  },
  methods: {
    getFlatsSchemas () {
      return this.$store.dispatch('retrieveItem', {
        url: '/houses/' + this.houseId + '/flats-schemas',
        storageName: 'flatsSchemas'
      })
        .then(flatsSchemas => {
          this.$store.dispatch('setItemToStore', {
            storageName: 'flatsSchemas',
            fields: flatsSchemas.data
          })
            .then(() => {
              this.flatsSchemas = JSON.parse(flatsSchemas.data)
            })
            .catch(error => {
              console.info(error)
            })
        })
    },
    setFocus (event) {
      let floor = event.target.getAttribute('floor')
      console.info(document.getElementsByTagNameNS('floor', floor))
      document.getElementsByTagNameNS('floor', floor).classList.add('focus-on')
    }
  },
  computed: {
    numberOfFloors () {
      let floors = 0
      Array.from(this.flats).map(() => {
        floors++
      })
      return floors
    }
  }
}
</script>

<style lang="less" scoped>
.tmp-chess {
  background-color: #2ec1b3;
  & *{
    color: #fff;
  }
}
.tmp-flat {
  background-color: #2ec1b3;
  padding: 5px;
  margin: 3px;
  border-radius: 5px;
  & *{
    color: #fff;
  }
}
.focus-on {
  font-size: 20px;
}
</style>
