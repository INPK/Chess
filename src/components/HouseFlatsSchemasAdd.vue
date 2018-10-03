<template>
  <Sidebar
    v-if="sidebarShow"
    title="Создание"
    @closeSidebar="closeSidebarToFlatsSchemas"
  >
    <AlertDefault
      v-if="singleErrorMessage"
      :message="singleErrorMessage"
      @alertDie="clearSingleError"
    />
    <div class="login-form">
      <img
        v-if="editMode"
        width="100"
        height="100"
        :src="flatSchemaImage"
      />
      <div class="form-group">
        <label class="form-group__label" for="flatSchema">Тип квартиры:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.type"
              class="form-group__alert"
            >
              {{ errorsStack.type }}
            </span>
          </transition>
          <!-- Тип квартиры: <input v-model="type" name="type_apartment"/> -->
          <select
            v-model="type"
            type="flatSchema"
            name="flatSchema"
            id="flatSchema"
          >
            <option
              v-for="(flatSchema, index) in staticFlatsSchemasTypes"
              :key="index"
              :value="index"
            >
              {{ flatSchema }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="typical_area">Типовая площадь:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.area"
              class="form-group__alert"
            >
              {{ errorsStack.area }}
            </span>
          </transition>
          <input v-model="area" name="typical_area" id="typical_area"/>
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="number_of_balcony">Балконы: </label>
        <div class="form-group__input">
          <transition name="slide-fade">
          <span
            v-if="errorsStack.number_of_balcony"
            class="form-group__alert"
          >
            {{ errorsStack.number_of_balcony }}
          </span>
          </transition>
          <input v-model.number="numberOfBalcony" id="number_of_balcony"/>
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="number_of_rooms">Количество комнат:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
          <span
            v-if="errorsStack.number_of_rooms"
            class="form-group__alert"
          >
            {{ errorsStack.number_of_rooms }}
          </span>
          </transition>
          <input v-model.number="numberOfRooms" id="number_of_rooms"/>
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="quantity_loggia">Лоджии:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.number_of_loggia"
              class="form-group__alert"
            >
              {{ errorsStack.number_of_loggia }}
            </span>
          </transition>
          <input v-model.number="numberOfLoggia" name="quantity_loggia" id="quantity_loggia"/>
          <span class="form-group__input_bar"></span>
        </div>
      </div>
      <div class="form-group">
        <label class="form-group__label" for="price">Цена:</label>
        <div class="form-group__input">
          <transition name="slide-fade">
            <span
              v-if="errorsStack.price"
              class="form-group__alert"
            >
              {{ errorsStack.price }}
            </span>
          </transition>
          <input
            v-model="price"
            name="price"
            id="price"
            :class="validationClass.password_confirmation"
            @click="clearError"
          />
          <span class="form-group__input_bar"></span>
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
import AlertDefault from './AlertDefault'
import Sidebar from './Sidebar'

export default {
  name: 'HouseFlatsSchemasAdd',
  data () {
    return {
      type: this.selectedFlatSchema.type,
      flatSchemaId: this.selectedFlatSchema.hash_id,
      area: this.selectedFlatSchema.area,
      numberOfBalcony: this.selectedFlatSchema.number_of_balcony,
      numberOfLoggia: this.selectedFlatSchema.number_of_loggia,
      numberOfRooms: this.selectedFlatSchema.number_of_rooms,
      price: this.selectedFlatSchema.price,
      flatSchemaImage: this.selectedFlatSchema.image,
      imagePreview: '',
      staticFlatsSchemasTypes: {
        'studio_flat': 'Студия',
        'one_room_flat': 'Однокомнатная',
        'two_room_flat': '2х-комнатная',
        'three_room_flat': '3х-комнатная',
        'four_room_flat': '4х-комнатная',
        'five_room_flat': '5и-комнатная',
        'euro_two_room_flat': 'Евро 2х-комнатная',
        'euro_three_room_flat': 'Евро 3х-комнатная'
      },
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
    AlertDefault,
    Sidebar
  },
  methods: {
    closeSidebarToFlatsSchemas () {
      this.$emit('closeSidebar')
    },
    resetImage () {
      this.flatSchemaImage = ''
      this.imagePreview = ''
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
          this.errorsStack = error.response.data
        })
    },
    updateFlatSchema () {
      this.storeFlatSchema('/' + this.selectedFlatSchema.hash_id, 'updateItem')
        .then(() => {
          this.$emit('refreshAfterChange')
        })
        .catch(error => {
          this.errorsStack = error.response.data
          console.info(error.response.data)
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
    },
    processFile (event) {
      this.flatSchemaImage = event.target.files[0]
      let reader = new FileReader()
      reader.onprogress = (progress) => {
        console.info(progress)
      }
      reader.onloadend = () => {
        this.imagePreview = reader.result
      }
      if (this.flatSchemaImage) {
        reader.readAsDataURL(this.flatSchemaImage)
      } else {
        this.imagePreview = ''
      }
    }
  },
  computed: {
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

<style lang="less" scoped>
@import (less) "../../static/less/color.less";
@import (less) "../../static/less/global.less";
@import (less) "../../static/less/media.less";
@import (less) "../../static/less/form.less";
</style>
