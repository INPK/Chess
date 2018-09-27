<template>
  <div class="buildings">
    <div class="buildings-create">
      <div class="create">
        <div class="create-title">Новый объект</div>
        <div class="create-button">
          <ButtonDefault
            name="Добавить объект"
            color="grey"
            class="create-button__add button-expand"
            :actionForClick = "redirectToCreate"
          ></ButtonDefault>
          <ButtonDefault
            name="Создадим за вас"
            color="green"
            class="button-expand"
          ></ButtonDefault>
        </div>
      </div>
      <img class="create-image" src="/static/img/PersonalManager.jpg" alt="">
    </div>
    <BuildingsItem
      v-for="(item, index) of buildings"
      :key="item.building.id"
      :storeIndex="index"
      :id="item.building.id"
      :title="item.building.name"
      :imageSource="item.building.images"
      :city="item.building.city"
      :address="item.building.address"
      :country="item.building.country"
      :district="item.building.district"
      :region="item.building.region"
      :flats="item.flats_by_type"
      @viewDetail="viewDetail"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsItem from './BuildingsItem'

export default {
  name: 'Buildings',
  data () {
    return {
      buildings: []
    }
  },
  components: {
    BuildingsItem,
    ButtonDefault
  },
  created () {
    this.$store.dispatch('destroyItemFromStore', 'currentBuildingStoreIndex')
    let companyHashId = this.$store.state.companyHashId
    this.$store.dispatch('retrieveItem', {
      url: '/company/' + companyHashId + '/buildings',
      storageName: 'buildings'
    })
      .then(response => {
        this.$store.dispatch('setItemToStore', {
          storageName: 'buildings',
          fields: JSON.stringify(response.data)
        })
        this.buildings = response.data
      })
      .catch(error => {
        console.info(error)
      })
  },
  methods: {
    viewDetail (title) {
      console.log(title)
    },
    redirectToCreate () {
      this.$router.push({ name: 'BuildingProperties' })
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
    .grid();
    @media @desktop {
      .grid(@c: 2);
    }
    @media @tablet{
      .grid(@c: 1);
    }
    @media @mobile {
      grid-row-gap: 1rem;
    }
    &-create {
      background-color: @color-white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:hover {
        box-shadow: 0 28px 50px rgba(22, 0, 27, 0.14);
      }
      .create {
        .padding(@v: 2rem);
        &-title {
          font-size: 2rem;
          font-weight: 100;
        }
        &-button {
          .padding-v(@v: 2rem);
          .grid(@c: 2);
          @media @xdesktop {
            .grid(@c: 1;@rg: 1rem);
          }
          @media @desktop {
            .grid(@c: 2;@rg: 1rem);
          }
          @media @mobile {
            .grid(@c: 1;@rg: 1rem);
          }
        }
        &-image {
          display: block;
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
</style>
