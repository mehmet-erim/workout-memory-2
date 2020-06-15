<template>
  <div>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>
          <slot />
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <router-view />
    </ion-content>
  </div>
</template>