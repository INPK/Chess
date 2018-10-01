<template>
  <div class="flats-schemas">
    <div>
      <div class="schemas-title">Создайте типовые планировки:</div>
      <div class="schemas">
        <div class="schemas-create">
          <div class="schemas-create__image">
            <img width="200" height="200" src="/static/img/blank_layout.svg"/>
          </div>
          <ButtonDefault
            color="green"
            name="Добавить планировку"
            :actionForClick="activateSidebar"
          />
        </div>
        <HouseFlatsSchemasItem
          v-for="(flatSchema, index) in flatsSchemas"
          :key="flatSchema.fields.hash_id"
          :flatSchemaId="flatSchema.fields.hash_id"
          :storeIndex="index"
          :image="flatSchema.fields.image"
          :type="flatSchema.fields.type"
          :area="flatSchema.fields.area"
          :numberOfBalcony="flatSchema.fields.number_of_balcony"
          :numberOfLoggia="flatSchema.fields.number_of_loggia"
          :price="flatSchema.fields.price"
          @activateSidebar="activateSidebar"
          @activateAlertConfirm="activateAlertConfirm"
        />
      </div>
    </div>
    <HouseFlatsSchemasAdd
      v-if="sidebar.show"
      :houseId="houseId"
      :selectedFlatSchema="sidebar.selectedFlatSchema"
      :editMode="sidebar.editMode"
      :sidebarShow="sidebar.show"
      @closeSidebar="closeSidebar"
      @refreshAfterChange="refreshAfterChange"
    />
    <AlertConfirm
      v-if="alertConfirm.isActive"
      :additionalMessage="alertConfirm.additionalMessage"
      @isAgree="removeFlatSchema"
      @isDisagree="cancelRemove"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import AlertConfirm from './AlertConfirm'
import HouseFlatsSchemasItem from './HouseFlatsSchemasItem'
import HouseFlatsSchemasAdd from './HouseFlatsSchemasAdd'

export default {
  name: 'HouseFlatsSchemasList',
  data () {
    return {
      houseId: '',
      selectedFlatSchemaId: '',
      alertConfirm: {
        isActive: false,
        additionalMessage: 'Если вы удалите этот объект, то все данные будут отображаться не корректно'
      },
      flatsSchemas: [],
      sidebar: {
        show: false,
        editMode: false,
        selectedFlatSchema: {}
      }
    }
  },
  components: {
    ButtonDefault,
    AlertConfirm,
    HouseFlatsSchemasItem,
    HouseFlatsSchemasAdd
  },
  created () {
    this.houseId = JSON.parse(this.$store.state.properties).hash_id
    if (this.houseId !== undefined) {
      this.getFlatsSchemas()
    }
  },
  methods: {
    closeSidebar () {
      /** Возвращает все элементы объекта sidebar в data в первоначальное состояние */
      Object.assign(this.$data.sidebar, this.$options.data().sidebar)
    },
    getBack () {
      this.$router.push({
        name: 'HouseProperties',
        params: {
          houseStoreIndex: this.storeIndex
        }
      })
    },
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
    activateSidebar (flatSchemaStoreIndex) {
      if (flatSchemaStoreIndex !== undefined) {
        this.sidebar.selectedFlatSchema = this.flatsSchemas[flatSchemaStoreIndex].fields
        this.sidebar.editMode = true
      }
      this.sidebar.show = true
    },
    removeFlatSchema () {
      this.$store.dispatch('removeItem', {
        url: '/flats-schemas/' + this.selectedFlatSchemaId
      })
        .then(() => {
          this.refreshAfterChange()
        })
    },
    activateAlertConfirm (flatSchemaId) {
      this.selectedFlatSchemaId = flatSchemaId
      this.alertConfirm.isActive = true
    },
    refreshAfterChange () {
      this.alertConfirm.isActive = false
      this.getFlatsSchemas()
      this.closeSidebar()
    },
    cancelRemove () {
      this.alertConfirm.isActive = false
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
  .flats-schemas {
    .schemas {
      &-title {
        .font(@s: 1.75rem; @w: 100);
        margin-bottom: 2rem;
      }
      .grid(@c: 5);
      @media @xdesktop {
        .grid(@c: 4);
      }
      @media @desktop {
        .grid(@c: 3);
      }
      @media @tablet {
        .grid(@c: 2);
      }
      @media @mobile {
        .grid(@c: 1);
      }
      &-create {
        background-color: @color-white;
        .padding(@v: 2rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        &:hover {
          box-shadow: 0 28px 50px rgba(22, 0, 27, 0.14);
        }
        &__image {
          margin-bottom: 2rem;
        }
      }
    }
  }
</style>
