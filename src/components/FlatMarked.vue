<template>
  <div
    :class="flatTypeId"
    @click="editBlock"
  >
    <div>
      <div>Квартира № {{ flatTypeNumber }}</div>
      <AlertDefault
        v-if="singleErrorMessage"
        :message="singleErrorMessage"
        @alertDie="singleErrorMessage = ''"
      />
      <transition name="slide-fade">
        <div v-if="editMode">
          <div>
            Квартира № <input v-model="flatType.number" type="number" name="number"/>
          </div>
          <div>
            Планировка
            <select
              v-model="flatType.flatSchemaId"
              type="flatSchema"
              name="flatSchema"
            >
              <option
                v-for="flatSchema in flatSchemas"
                :key="flatSchema.fields.hash_id"
                :value="flatSchema.fields.hash_id"
              >
                {{ flatSchema.fields.type }}
              </option>
            </select>
          </div>
          <div>
            Подъезд № <input v-model.number="flatType.entrance" type="number" />
          </div>
          <span>Окна выходят на: {{ flatType.windows }}</span>
          <div class="uk-flex uk-flex-row">
            <label for="street">Улица</label>
            <input v-model="flatType.windows" type="checkbox" id="street" value="Улица"/>
            <label for="north">Север</label>
            <input v-model="flatType.windows" type="checkbox" id="north" value="Север"/>
            <label for="south">Юг</label>
            <input v-model="flatType.windows" type="checkbox" id="south" value="Юг"/>
            <label for="outdoors">Двор</label>
            <input v-model="flatType.windows" type="checkbox" id="outdoors" value="Двор"/>
            <label for="east">Восток</label>
            <input v-model="flatType.windows" type="checkbox" id="east" value="Восток"/>
            <label for="west">Запад</label>
            <input v-model="flatType.windows" type="checkbox" id="west" value="Запад"/>
          </div>
        </div>
      </transition>
    </div>
    <ButtonDefault
      name="Удалить"
      color="green"
      :actionForClick="alertConfirm"
    />
    <AlertConfirm
      v-if="alertShow"
      @isAgree="removeFlatType"
      @isDisagree="alertShow = false"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'
import AlertDefault from './AlertDefault'

export default {
  name: 'FlatMarked',
  data () {
    return {
      alertShow: false,
      singleErrorMessage: '',
      selectedFlatType: []
    }
  },
  props: {
    flatType: {
      type: Object,
      required: true
    },
    flatTypeId: {
      type: String,
      required: true
    },
    flatIndex: {
      type: Number,
      required: true
    },
    editableFlatIndex: Number,
    flatTypeNumber: {
      type: Number,
      required: true
    },
    flatSchemas: {
      type: Array,
      required: true
    }
  },
  components: {
    AlertConfirm,
    ButtonDefault,
    AlertDefault
  },
  methods: {
    alertConfirm () {
      this.alertShow = true
    },
    removeFlatType () {
      this.$store.dispatch('removeItem', {
        url: '/flat-types/' + this.flatTypeId
      })
        .then(() => {
          this.$emit('flatTypeRemovedSuccessful')
        })
        .catch(error => {
          this.singleErrorMessage = 'Не удалось удалить квартиру.'
          console.info('Не удалось удалить квартиру. Вот почему: ', error.response.data)
        })
    },
    editBlock () {
      if (!this.editMode) {
        this.$emit('setCurrentCoordinates', {
          flatTypeId: this.flatTypeId,
          flatIndex: this.flatIndex,
          coords: this.flatType.coordinates
        })
      }
    }
  },
  computed: {
    editMode () {
      return this.editableFlatIndex === this.flatIndex
    }
  }
}
</script>

<style scoped>

</style>
