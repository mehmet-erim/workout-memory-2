<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ title }}
          <ion-button class="f-right" size="small" shape="round" @click="save">
            <ion-icon name="checkmark"></ion-icon>
          </ion-button>
          <ion-button
            class="f-right"
            color="dark"
            fill="outline"
            size="small"
            shape="round"
            @click="back"
          >
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-item>
      <ion-label position="floating">Title</ion-label>
      <ion-input :value="workout.title" @ionInput="workout.title = $event.target.value"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Date</ion-label>
      <ion-datetime
        display-format="DDDD MMM D, YYYY"
        :value="workout.date"
        @ionChange="onChangeDate"
      ></ion-datetime>
    </ion-item>

    <ion-title class="ion-margin-top">
      Movements
      <ion-button
        class="f-right"
        color="dark"
        fill="outline"
        size="small"
        shape="round"
        @click="addWorkoutElement"
      >
        <ion-icon name="add"></ion-icon>
      </ion-button>
    </ion-title>

    <add-update-workout-element
      v-if="isShowAddUpdateWorkoutElement"
      :item="selectedElement"
      :title="workoutElementTitle"
      @back="isShowAddUpdateWorkoutElement = false"
      @submit="onSubmitElement"
    ></add-update-workout-element>

    <ion-list>
      <ion-item-sliding v-for="item in workout.elements" :key="item.movement">
        <ion-item @click="editMovement(item)">
          <ion-label>
            {{ movementResponse[item.movement] }} | Set: {{item.setCount}} | Rep: {{item.repCount}} | Weight: {{item.weight}}
            <br v-if="item.notes" />
            <ion-note>{{item.notes}}</ion-note>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option color="danger" @click="removeMovement(item)">Remove</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  </div>
</template>

<style>
ion-button.f-right {
  float: right;
}
</style>

<script>
import { mapGetters } from "vuex";
import { uuid } from "../utils/uuid";
import AddUpdateWorkoutElement from "./AddUpdateWorkoutElement.vue";

export default {
  name: "CreateUpdateWorkout",
  props: {
    title: { type: String },
    item: { type: Object }
  },
  data() {
    return {
      workout: {},
      selectedElement: {},
      isShowAddUpdateWorkoutElement: false
    };
  },
  computed: {
    ...mapGetters(["movementResponse"]),
    workoutElementTitle() {
      return this.selectedElement?.movement
        ? `Edit - ${this.movementResponse[this.selectedElement.movement]}`
        : "New movement";
    }
  },
  mounted() {
    this.workout = {
      ...this.item,
      date: this.item.date ? new Date(this.item.date) : new Date(),
      elements: this.item.elements || []
    }; // for avoiding root object mutation
  },
  methods: {
    save() {
      let loader;
      this.$ionic.loadingController
        .create({
          message: "Loading"
        })
        .then(l => {
          loader = l;
          l.present();
        });

      let request;
      const data = {
        ...this.workout,
        date: new Date(this.workout.date).valueOf()
      };
      if (this.workout.key) {
        request = this.$dbService.updateWorkout(data);
      } else {
        request = this.$dbService.addWorkout(data);
      }

      request.finally(() => {
        loader.dismiss();
        this.back();
      });
    },
    back() {
      this.$emit("back");
    },
    onChangeDate(e) {
      this.workout.date = new Date(e.target.value);
    },
    addWorkoutElement() {
      this.selectedElement = {};
      this.isShowAddUpdateWorkoutElement = true;
    },
    editMovement(item) {
      this.selectedElement = item;
      this.isShowAddUpdateWorkoutElement = true;
    },
    removeMovement(item) {
      const index = this.workout.elements.findIndex(
        el => el.movement === item.movement
      );

      this.workout.elements = [
        ...this.workout.elements.slice(0, index),
        ...this.workout.elements.slice(index + 1)
      ];
    },
    onSubmitElement(element) {
      if (!element.id) {
        this.workout.elements = [
          ...this.workout.elements,
          { ...element, id: uuid() }
        ];
      } else {
        const index = this.workout.elements.findIndex(
          el => el.id === element.id
        );
        this.workout.elements[index] = element;
        this.workout.elements = [...this.workout.elements];
      }
      this.isShowAddUpdateWorkoutElement = false;
    }
  },
  components: {
    "add-update-workout-element": AddUpdateWorkoutElement
  }
};
</script>
