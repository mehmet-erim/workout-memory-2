<template>
  <ion-tabs>
    <ion-tab tab="movements">
      <layout-header>Movements</layout-header>
    </ion-tab>
    <ion-tab tab="workouts">
      <layout-header>Workouts</layout-header>
    </ion-tab>

    <template slot="bottom">
      <ion-tab-bar>
        <ion-tab-button tab="movements">
          <ion-icon name="body"></ion-icon>
          <ion-label>MOVEMENTS</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="workouts" selected="true">
          <ion-icon name="bicycle"></ion-icon>
          <ion-label>WORKOUTS</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>

<script>
import LayoutHeader from "../components/LayoutHeader.vue";
export default {
  components: {
    "layout-header": LayoutHeader
  }
};
</script>