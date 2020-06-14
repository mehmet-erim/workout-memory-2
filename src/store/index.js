import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: { movements: [], workouts: [] },
  actions: {
    setMovements(context, payload) {
      console.warn('payload', payload);
      context.commit('setMovements', payload);
    },
  },
  mutations: {
    setMovements(state, payload) {
      state.movements = payload;
    },
  },
});
