import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentPage: 'main',
    currentClient: null
  },
  getters: {

  },
  mutations: {
    pageChange(state, pageName){
      state.currentPage = pageName;
    },
    currentClientChange(state, client){
      state.currentClient = client;
    }
  },
  actions: {

  }
});
