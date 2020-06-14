<template>
  <ion-tabs>
    <ion-tab tab="movements"> </ion-tab>
    <ion-tab tab="workouts"> </ion-tab>

    <ion-header translucent>
      <ion-toolbar>
        <ion-title>List</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <router-view />
    </ion-content>

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
