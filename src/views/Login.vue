<template>
  <div class="container">
    <ion-button @click="loginWithFacebook">Login with Facebook</ion-button>
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

<script>
/* eslint-disable no-undef */
import firebase from "firebase";

export default {
  name: "login",
  mounted: function() {
    this.$lazyLoadService
      .loadScript({
        src: "https://connect.facebook.net/en_US/sdk.js",
        id: "facebook-jssdk"
      })
      .then(loaded => {
        if (!loaded) return;

        FB.init({
          appId: "812845172480383",
          cookie: true,
          xfbml: true,
          version: "v7.0"
        });
      });
  },
  methods: {
    loginWithFacebook: async function() {
      let loader;
      this.$ionic.loadingController
        .create({
          message: "Loading"
        })
        .then(l => {
          loader = l;
          l.present();
        });
      FB.login(
        fbRes => {
          if (fbRes.authResponse) {
            const credential = firebase.auth.FacebookAuthProvider.credential(
              fbRes.authResponse.accessToken
            );

            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                alert("An error occurred", error);
              })
              .then(() => {
                this.$router.push("workouts");
              })
              .finally(() => loader.dismiss());
          } else {
            loader.dismiss();
          }
        },
        { scope: "email,public_profile" }
      );
    }
  }
};
</script>
