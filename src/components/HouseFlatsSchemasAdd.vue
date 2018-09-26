<template>
  <Sidebar
    v-if="sidebarShow"
    title="Создание"
    @closeSidebar="closeSidebarToFlatsSchemas"
  >
    <div v-if="singleErrorMessage" class="login-alert">
      {{ singleErrorMessage }}
    </div>
    <div class="login-form">
      <img
        v-if="editMode"
        width="100"
        height="100"
        :src="flatSchemaImage"
      />
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.type"
              class="form-group__alert"
            >
              {{ errorsStack.type }}
            </span>
          </transition>
          Тип квартиры: <input v-model="type" name="type_apartment"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.area"
              class="form-group__alert"
            >
              {{ errorsStack.area }}
            </span>
          </transition>
          Типовая площадь: <input v-model="area" name="typical_area"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
          <span
            v-if="errorsStack.number_of_balcony"
            class="form-group__alert"
          >
            {{ errorsStack.number_of_balcony }}
          </span>
          </transition>
          Балконы: <input v-model.number="numberOfBalcony"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
          <span
            v-if="errorsStack.number_of_rooms"
            class="form-group__alert"
          >
            {{ errorsStack.number_of_rooms }}
          </span>
          </transition>
          Количество комнат: <input v-model.number="numberOfRooms"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.number_of_loggia"
              class="form-group__alert"
            >
              {{ errorsStack.number_of_loggia }}
            </span>
          </transition>
          Лоджии: <input v-model.number="numberOfLoggia" name="quantity_loggia"/>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.price"
              class="form-group__alert"
            >
              {{ errorsStack.price }}
            </span>
          </transition>
          Цена: <input v-model="price" name="price"/>
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
        </div>
      </div>
      <ButtonDefault
        v-if="!editMode"
        name="Создать типовую планировку"
        color="grey"
        :actionForClick="writeFlatSchema"
      />
      <ButtonDefault
        v-else
        name="Обновить"
        color="grey"
        :actionForClick="updateFlatSchema"
      />
    </div>
  </Sidebar>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import Sidebar from './Sidebar'

export default {
  name: 'HouseFlatsSchemasAdd',
  data () {
    return {
      type: this.selectedFlatSchema.type,
      flatSchemaId: this.selectedFlatSchema.hash_id,
      area: this.selectedFlatSchema.area,
      singleErrorMessage: '',
      numberOfBalcony: this.selectedFlatSchema.number_of_balcony,
      numberOfLoggia: this.selectedFlatSchema.number_of_loggia,
      numberOfRooms: this.selectedFlatSchema.number_of_rooms,
      price: this.selectedFlatSchema.price,
      flatSchemaImage: '',
      errorsShow: false,
      errorsStack: []
    }
  },
  props: {
    storeIndex: String,
    houseId: {
      type: String,
      require: true
    },
    selectedFlatSchema: Object,
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
    ButtonDefault,
    Sidebar
  },
  methods: {
    closeSidebarToFlatsSchemas () {
      this.$emit('closeSidebar')
    },
    storeFlatSchema (FlatSchemaIdPath = '', action = 'writeItem') {
      let flatSchemaProperties = new FormData()
      const data = {
        house_id: this.houseId,
        flats_schemas_id: this.flatSchemaId || '',
        type: this.type,
        area: this.area,
        number_of_balcony: this.numberOfBalcony,
        number_of_rooms: this.numberOfRooms,
        number_of_loggia: this.numberOfLoggia,
        price: this.price,
        image: this.flatSchemaImage
      }
      for (let i in data) {
        flatSchemaProperties.append(i, data[i])
      }
      return this.$store.dispatch(action, {
        fields: flatSchemaProperties,
        url: '/flats-schemas' + FlatSchemaIdPath,
        storageName: 'houseFlatsSchemas'
      })
    },
    writeFlatSchema () {
      this.storeFlatSchema()
        .then(() => {
          this.$emit('refreshAfterChange')
        })
        .catch(error => {
          // this.showError(error, this)
          // console.info(error.response.data)
          this.errorsStack = error.response.data
          this.errorsShow = true
        })
    },
    updateFlatSchema () {
      this.storeFlatSchema('/' + this.selectedFlatSchema.hash_id, 'updateItem')
        .then(() => {
          this.$emit('refreshAfterChange')
        })
        .catch(error => { console.info(error) })
    },
    processFile (event) {
      this.flatSchemaImage = event.target.files[0]
    }
  }
}
</script>

<style lang="less" scoped>
@import (less) "../global.less";
@import (less) "../form.less";
</style>
