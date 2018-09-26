<template>
  <div class="buildings-item"
       @mouseover="toggleEditButton"
       @mouseout="toggleEditButton"
  >
    <ButtonDefault
      v-if="isVisibleButtons"
      name="Редактировать"
      color="green"
      class="button-expand"
      :actionForClick="editBuilding"
    />
    <div
      class=""
      @click="redirectToCurrentBuildingMain"
    >
      <div class="item-image">
        <img :src="imageSource" alt="">
      </div>
      <div class="item-desc">
        <div class="">
          <div>
            <h3 class="">{{ title }}</h3>
            <div>
              <small>{{ country }}, {{ region }}, {{ city }}, {{ district }}</small>
            </div>
          </div>
          <div>
            <h3>Осталось квартир</h3>
            <div>{{ numberOfFlats }}</div>
          </div>
        </div>
      </div>
      <div class="item-flats">
        <div
          v-for="(flatType, key) in flats"
          :key="key"
          class=""
        >
          <div>{{ staticFlatsSchemasTypes[key] }}</div>
          <div>{{ flatType }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ButtonDefault from './ButtonDefault'

export default {
  components: { ButtonDefault },
  props: {
    imageSource: String,
    title: {
      type: String,
      required: true
    },
    storeIndex: {
      type: Number,
      required: true
    },
    city: String,
    address: String,
    country: String,
    district: String,
    region: String,
    flats: Object
  },
  data () {
    return {
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
      isVisibleButtons: false
    }
  },
  methods: {
    viewDetailsClicked () {
      this.$emit('viewDetail', this.title)
    },
    toggleEditButton () {
      this.isVisibleButtons = !this.isVisibleButtons
    },
    editBuilding () {
      this.$router.push({
        name: 'BuildingProperties',
        params: {
          buildingStoreIndex: this.storeIndex,
          editMode: true
        }
      })
    },
    redirectToCurrentBuildingMain () {
      this.$router.push({
        name: 'BuildingMain',
        params: {
          buildingStoreIndex: this.storeIndex
          // editMode: true
        }
      })
    }
  },
  computed: {
    numberOfFlats () {
      let globalNumberOfFlats = 0
      for (let key in this.flats) {
        globalNumberOfFlats += this.flats[key]
      }
      return globalNumberOfFlats
    }
  }
}
</script>

<style lang="less" scoped>
  @import (less) "../../static/less/color.less";
  @import (less) "../../static/less/grid.less";
  @import (less) "../../static/less/media.less";
  @import (less) "../../static/less/padding.less";

  .buildings {
    &-item {
      background-color: @color-white;
      .item {
        &-desc {
          .padding(@v: 2rem);
        }
        &-flats {
          border-top: 1px solid #f2f4f6;
          .padding(@v: 2rem);
        }
      }
    }
  }
</style>
