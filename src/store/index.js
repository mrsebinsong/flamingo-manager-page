import Vue from 'vue'
import Vuex from 'vuex'

// data import
import clientData from '@/../static/js/clientData.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentPage: 'main',
    currentClient: null,
    clientData: null
  },
  getters: {

  },
  mutations: {
    pageChange(state, pageName){
      state.currentPage = pageName;
    },
    currentClientChange(state, client){
      state.currentClient = client;
    },
    storeClientData(state, data){
      console.log("data: ", data);
      state.clientData = data;
    }
  },
  actions: {
    fetchClientData({ commit }){

      return new Promise(function(resolve, reject){

        // this line should be replaced with ajax call to fetch
        // clients data from the server
        if(clientData){
          commit('storeClientData', clientData);
          resolve( clientData );
        }
        else reject('client data is not valid.');

      });

    },
    currentClientChange({ commit }, payload){

      return new Promise( function( resolve, reject ){
        commit('currentClientChange', payload);
        resolve();
      });

    }
  }
});
