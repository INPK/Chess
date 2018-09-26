<template>
  <div class="uk-card"
     @mouseover="toggleEditButton"
     @mouseout="toggleEditButton"
  >
    <a href="#make-flats-schemas_container" uk-toggle>
      <ButtonDefault
        v-if="isVisibleButtons"
        name="Редактировать"
        color="green"
        class="button-expand"
        :actionForClick="editFlatSchema"
      />
    </a>
    <ButtonDefault
      v-if="isVisibleButtons"
      name="Удалить"
      color="red"
      class="button-expand"
      :actionForClick="removeFlatSchema"
    />
    <div class="uk-card-header">
      <img :src="image">
    </div>
    <div class="uk-card-body">
      <div>
        Тип квартиры: {{ type }}
      </div>
      <div>
        Типовая площадь: {{ area }} м <sup>2</sup>
      </div>
      <div>
        Балконы: {{ numberOfBalcony }}
      </div>
      <div>
        Лоджии: {{ numberOfLoggia }}
      </div>
      <div>
        Цена: {{ price }}
      </div>
    </div>
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import HouseFlatsSchemasAdd from './HouseFlatsSchemasAdd'

export default {
  name: 'HouseFlatsSchemasItem',
  data () {
    return {
      isVisibleButtons: false,
      sidebarShow: false
    }
  },
  props: {
    flatSchemaId: {
      type: String,
      require: true
    },
    image: {
      type: String,
      required: true
    },
    type: String,
    area: {
      type: String,
      required: true
    },
    numberOfBalcony: Number,
    numberOfLoggia: Number,
    editFlatSchemaFunction: Function,
    storeIndex: Number,
    price: String
  },
  components: {
    ButtonDefault,
    HouseFlatsSchemasAdd
  },
  methods: {
    toggleEditButton () {
      this.isVisibleButtons = !this.isVisibleButtons
    },
    removeFlatSchema () {
      this.$emit('activateAlertConfirm', this.flatSchemaId)
    },
    editFlatSchema () {
      this.$emit('activateSidebar', this.storeIndex)
    }
  }
}
</script>

<style scoped>

</style>
