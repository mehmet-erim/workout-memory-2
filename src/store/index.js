import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: { movements: [], workouts: [] },
  actions: {
    setMovements(context, payload) {
      context.commit('setMovements', payload);
    },
    setWorkouts(context, payload) {
      context.commit('setWorkouts', payload);
    },
  },
  mutations: {
    setMovements(state, payload) {
      state.movements = payload;
    },
    setWorkouts(state, payload) {
      state.workouts = payload;
    },
  },
  getters: {
    movements(state) {
      return state.movements;
    },
    workouts(state) {
      return state.workouts;
    },
  },
});
