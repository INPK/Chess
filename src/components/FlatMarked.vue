<template>
  <div
    class="flat-marked" 
    :class="flatTypeId"
    @click="editBlock"
  >
    <div class="marked-item">
      <div>Квартира № {{ flatTypeNumber }}</div>
      <div>
        <ButtonDefault
          class="button-icon"
          :actionForClick="alertShow = true"
        />
      </div>
    </div>
    <AlertDefault
      v-if="singleErrorMessage"
      :message="singleErrorMessage"
      @alertDie="singleErrorMessage = ''"
    />
    <transition name="slide-fade">
      <div class="marked-form" v-if="editMode">
        <div class="form-group">
          <label class="form-group__label" for="number">Квартира №</label>
          <div class="form-group__input">
            <input
              v-model="flatType.number"
              type="number"
              name="number"
            />
            <span class="form-group__input_bar"></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__label" for="flatSchema">Планировка</label>
          <div class="form-group__input">
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
            <span class="form-group__input_bar"></span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-group__label" for="numberEntrance">Подъезд №</label>
          <div class="form-group__input">
            <input
              v-model="flatType.entrance"
              type="number"
              name="numberEntrance"
            />
            <span class="form-group__input_bar"></span>
          </div>
        </div>
        <div class="marked-window">
          <div class="window-title">Окна выходят на: {{ flatType.windows }}</div>
          <div class="window-list">
            <div>
              <input v-model="flatType.windows"
                     type="checkbox"
                     id="street"
                     value="Улица"
                     name="street" />
              <label for="street">Улица</label>
            </div>
            <div>
              <input v-model="flatType.windows"
                     type="checkbox"
                     id="north"
                     value="Север"
                     name="north" />
              <label for="north">Север</label>
            </div>
            <div>
              <input v-model="flatType.windows" type="checkbox" id="south" value="Юг"/>
              <label for="south">Юг</label>
            </div>
            <div>
              <input v-model="flatType.windows" type="checkbox" id="outdoors" value="Двор"/>
              <label for="outdoors">Двор</label>
            </div>
            <div>
              <input v-model="flatType.windows" type="checkbox" id="east" value="Восток"/>
              <label for="east">Восток</label>
            </div>
            <div>
              <input v-model="flatType.windows" type="checkbox" id="west" value="Запад"/>
              <label for="west">Запад</label>
            </div>
          </div>
        </div>
        <ButtonDefault
          name="Сохранить квартиру"
          class="button-expand"
          color="green"
          :actionForClick="writeFlatType"
        />
      </div>
    </transition>
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

<style lang="less" scoped>
  @import (less) "../../static/less/color.less";
  @import (less) "../../static/less/font.less";
  @import (less) "../../static/less/form.less";
  @import (less) "../../static/less/grid.less";
  @import (less) "../../static/less/media.less";
  @import (less) "../../static/less/padding.less";

  .flat-marked {
    .marked {
      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        background-color: lighten(@color-light-green, 50%);
        border: 1px solid lighten(@color-light-green, 40%);
        border-radius: 3px;
        .padding-h(@v: 1.5rem);
        .padding-v(@v: 1rem);
        margin-bottom: 0.5rem;
        &:hover {
          background-color: lighten(@color-light-green, 40%);
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      &-form {
        border-radius: 3px;
        border: 1px solid lighten(@color-light-grey, 0%);
        .padding(@v: 1.5rem);
      }
      &-window {
        margin-bottom: 2rem;
        .window {
          &-list {
            .grid(@c: 2; @cg: 1rem; @rg: 1rem);
          }
        }
        
      }
    }
  }

</style>
