<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      {{ movement.value }}
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'CreateUpdateMovement',
  props: {
    title: { type: String },
  },
  data() {
    return {
      movement: {},
    };
  },
};
</script>
