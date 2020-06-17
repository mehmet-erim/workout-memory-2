<template>
  <div>
    <div :hidden="isShowCreateUpdateWorkout">
      <ion-list>
        <ion-item-sliding v-for="workout in workouts" :key="workout.key">
          <ion-item @click="edit(workout)">
            <ion-label>{{ workout.title }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="remove(workout)">Remove</ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <ion-fab-button class="bottom-right" @click="create()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </div>
    <create-update-workout
      v-if="isShowCreateUpdateWorkout"
      :title="createUpdateWorkoutTitle"
      :item="selectedItem"
      @back="() => isShowCreateUpdateWorkout = false"
    ></create-update-workout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateUpdateWorkout from "../components/CreateUpdateWorkout.vue";

export default {
  name: "workouts",
  data() {
    return {
      isShowCreateUpdateWorkout: false,
      selectedItem: {}
    };
  },
  computed: {
    ...mapGetters(["workouts"]),
    createUpdateWorkoutTitle() {
      return this.selectedItem?.key
        ? `Edit - ${this.selectedItem.title}`
        : "New";
    }
  },
  methods: {
    edit(item) {
      this.selectedItem = item;
      this.isShowCreateUpdateWorkout = true;
    },
    remove(item) {
      this.$ionic.alertController
        .create({
          cssClass: "my-custom-class",
          header: "Are you sure?",
          message: `<strong>${item.title}</strong> will be deleted!`,
          buttons: [
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary"
            },
            {
              text: "Yes",
              handler: () => {
                this.$dbService.removeWorkout(item.key);
              }
            }
          ]
        })
        .then(a => a.present());
    },
    create() {
      this.selectedItem = {};
      this.isShowCreateUpdateWorkout = true;
    },
    openModal(workout) {
      return this.$ionic.modalController
        .create({
          component: CreateUpdateWorkout,
          componentProps: {
            data: {
              workout
            },
            propsData: {
              title: workout?.key ? `Edit - ${workout.title}` : "New"
            }
          }
        })
        .then(m => m.present());
    }
  },
  components: {
    "create-update-workout": CreateUpdateWorkout
  }
};
</script>
