<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ title }}
          <ion-button size="small" shape="round" @click="save">
            <ion-icon name="checkmark"></ion-icon>
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">Movement</ion-label>
        <ion-input
          :value="movement.value"
          @ionInput="movement.value = $event.target.value"
        ></ion-input>
      </ion-item>
    </ion-content>
  </div>
</template>

<style>
ion-button {
  float: right;
}
</style>

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
  mounted() {
    this.movement = { ...this.movement }; // for avoiding root object mutation
  },
  methods: {
    save() {
      let loader;
      this.$ionic.loadingController
        .create({
          message: 'Loading',
        })
        .then((l) => {
          loader = l;
          l.present();
        });

      let request;
      if (this.movement.key) {
        request = this.$dbService.updateMovement(this.movement);
      } else {
        request = this.$dbService.addMovement(this.movement.value);
      }

      request.finally(() => {
        loader.dismiss();
        this.$ionic.modalController.dismiss();
      });
    },
  },
};
</script>
