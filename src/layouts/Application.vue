<template>
  <ion-tabs>
    <ion-tab tab="movements">
      <router-view />
    </ion-tab>
    <ion-tab tab="workouts">
      <router-view />
    </ion-tab>

    <template slot="bottom">
      <ion-tab-bar>
        <ion-tab-button tab="movements">
          <ion-icon name="body"></ion-icon>
          <ion-label>MOVEMENTS</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="workouts">
          <ion-icon name="bicycle"></ion-icon>
          <ion-label>WORKOUTS</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </template>
  </ion-tabs>
</template>
