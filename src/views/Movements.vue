<template>
  <div>
    <ion-list>
      <ion-item-sliding v-for="movement in movements" :key="movement.key">
        <ion-item>
          <ion-label>{{ movement.value }}</ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option @click="edit(movement)">Edit</ion-item-option>
          <ion-item-option color="danger" @click="remove(movement)"
            >Remove</ion-item-option
          >
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>

    <ion-fab-button @click="openModal">
      <ion-icon name="add"></ion-icon>
    </ion-fab-button>
  </div>
</template>

<style>
ion-fab-button {
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>

<script>
import { mapGetters } from 'vuex';
import CreateUpdateMovement from '../components/CreateUpdateMovement.vue';

export default {
  name: 'movements',
  computed: {
    ...mapGetters(['movements']),
  },
  methods: {
    edit(item) {
      this.openModal(item);
    },
    remove(item) {
      this.$ionic.alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Are you sure?',
          message: `<strong>${item.value}</strong> will be deleted!`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
            },
            {
              text: 'Yes',
              handler: () => {
                this.$dbService.removeMovement(item.key);
              },
            },
          ],
        })
        .then((a) => a.present());
    },
    openModal(movement) {
      return this.$ionic.modalController
        .create({
          component: CreateUpdateMovement,
          componentProps: {
            data: {
              movement,
            },
            propsData: {
              title: movement?.key ? `Edit - ${movement.value}` : 'New',
            },
          },
        })
        .then((m) => m.present());
    },
  },
};
</script>
