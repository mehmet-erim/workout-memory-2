<template>
  <div>
    <ion-item-divider>
      <ion-label>{{this.title}}</ion-label>
    </ion-item-divider>

    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Movement</ion-label>
            <ion-select
              :value="element.movement"
              @ionChange="element.movement = $event.target.value"
            >
              <ion-select-option
                v-for="item in movements"
                :key="item.key"
                :value="item.key"
              >{{item.value}}</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Set</ion-label>
            <ion-input
              :value="element.setCount"
              @ionInput="element.setCount = $event.target.value"
              type="number"
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Rep</ion-label>
            <ion-input
              :value="element.repCount"
              @ionInput="element.repCount = $event.target.value"
              type="number"
            ></ion-input>
          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Weight</ion-label>
            <ion-input
              :value="element.weight"
              @ionInput="element.weight = $event.target.value"
              type="number"
            ></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-item>
            <ion-label position="floating">Notes</ion-label>
            <ion-input :value="element.notes" @ionInput="element.notes = $event.target.value"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <ion-button
            color="dark"
            fill="outline"
            size="small"
            shape="round"
            expand="block"
            @click="back"
          >
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-col>
        <ion-col>
          <ion-button
            color="primary"
            fill="outline"
            size="small"
            shape="round"
            expand="block"
            @click="submit"
          >
            <ion-icon name="checkmark"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-item-divider></ion-item-divider>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    item: { type: Object },
    title: { type: String, default: "New" }
  },
  data() {
    return {
      element: {}
    };
  },
  computed: {
    ...mapGetters(["movements"])
  },
  mounted() {
    this.element = { ...this.item };
  },
  methods: {
    back() {
      this.$emit("back");
    },
    submit() {
      this.$emit("submit", this.element);
    }
  }
};
</script>