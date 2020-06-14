<template>
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
</template>

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
      console.warn(item);
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
              title: movement ? `Edit - ${movement.value}` : 'New',
            },
          },
        })
        .then((m) => m.present());
    },
  },
};
</script>
