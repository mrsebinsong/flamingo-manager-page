import { expireCookie } from '@/../static/js/helperFunctions.js';

import Vue from 'vue'
import Vuex from 'vuex'

import axios from '@/axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentPage: 'main',
    currentClient: null,

    //axios
    requestToken: null,
    clientList: null
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

    // axios
    updateToken(state, value){
      state.requestToken = value;
    },
    updateClientList(state, list){
      console.log("accounts Data(done from Inapp.vue): ", list);
      state.clientList = list;
    },
    signOut(state){
      state.requestToken = null;
      state.clientList= null;
      expireCookie('flamingoAdminToken');
    }
  },
  actions: {
    currentClientChange({ commit }, payload){

      return new Promise( function( resolve, reject ){
        commit('currentClientChange', payload);
        resolve();
      });

    },
    Signin({ commit }, code){
      return axios.post('/manager/sign-in', { code });
    },
    Signout({ commit }){
      return new Promise( (resolve, reject) => {
        commit('signOut');
        resolve(true);
      });
    },
    getClientAccounts({ commit }, token){
      return axios.post('/manager/accounts', { token });
    },
    getAccount({ state, commit }, accountId){
      return axios.post('/manager/account', {
        token: state.requestToken, accountId
      });
    }
  }
});
