<template>
  <ion-button @click="logout">Logout</ion-button>
</template>

<script>
import { auth } from '../firebaseConfig';

export default {
  name: 'Home',
  methods: {
    // showModal: async function() {
    //   const modal = await this.$ionic.modalController.create({
    //     component: About,
    //     componentProps: {
    //       propsData: {
    //         userData: Math.round(Math.random() * 100),
    //       },
    //     },
    //   });
    //   await modal.present();
    // },
    logout: function() {
      auth.signOut();
    },
  },
};
</script>
