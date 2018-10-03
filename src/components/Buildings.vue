<template>
  <div class="buildings">
    <AlertDefault
      v-if="alertMessage"
      :message="alertMessage"
      @alertDie="alertMessage = ''"
    />
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
    <AlertConfirm
      v-if="alertConfirm.isActive"
      :additionalMessage="alertConfirm.additionalMessage"
      @isAgree="removeBuilding"
      @isDisagree="closeAlertConfirm"
    />
    <BuildingsItem
      v-for="(item, index) of buildings"
      :key="item.building.id"
      :storeIndex="index"
      :buildingId="item.building.hash_id"
      :title="item.building.name"
      :imageSource="item.building.images"
      :city="item.building.city"
      :address="item.building.address"
      :country="item.building.country"
      :district="item.building.district"
      :region="item.building.region"
      :flats="item.flats_by_type"
      @activateAlertConfirm="activateAlertConfirm"
    />
  </div>
</template>

<script>
import ButtonDefault from './ButtonDefault'
import BuildingsItem from './BuildingsItem'
import AlertDefault from './AlertDefault'
import AlertConfirm from './AlertConfirm'

export default {
  name: 'Buildings',
  data () {
    return {
      buildings: [],
      alertMessage: '',
      selectedBuildingId: '',
      alertConfirm: {
        isActive: false,
        additionalMessage: 'Если вы удалите этот объект, то все данные будут отображаться не корректно'
      }
    }
  },
  components: {
    AlertDefault,
    AlertConfirm,
    BuildingsItem,
    ButtonDefault
  },
  created () {
    // На главной странице удаляем индекс текущего дома из store.
    // this.$store.dispatch('destroyItemFromStore', 'currentBuildingStoreIndex')
    this.getBuildings()
  },
  methods: {
    getBuildings () {
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
          this.alertMessage = 'Не могу получить список домов. Обратитесь к администратору.'
          console.info(error.response)
        })
    },
    redirectToCreate () {
      this.$router.push({ name: 'BuildingProperties' })
    },
    removeBuilding () {
      this.$store.dispatch('removeItem', {
        url: '/buildings/' + this.selectedBuildingId
      })
        .then(() => {
          this.alertMessage = 'Объект успешно удалён'
          this.getBuildings()
        })
        .catch(error => {
          this.alertMessage = 'Не удалось удалить объект'
          console.info('Не удалось удалить объект. Вот почему: ', error.response.data)
        })
      this.closeAlertConfirm()
    },
    activateAlertConfirm (buildingId) {
      this.selectedBuildingId = buildingId
      this.alertConfirm.isActive = true
    },
    closeAlertConfirm () {
      this.alertConfirm.isActive = false
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
