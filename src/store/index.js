import { expireCookie } from '@/../static/js/helperFunctions.js';

import Vue from 'vue'
import Vuex from 'vuex'

import axios from '@/axios';

// data import
import clientData from '@/../static/js/clientData.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // demo
    currentPage: 'main',
    currentClient: null,
    clientData: null,

    //axios
    requestToken: null,
    clientList: null
  },
  getters: {

  },
  mutations: {
    // demo
    pageChange(state, pageName){
      state.currentPage = pageName;
    },
    currentClientChange(state, client){
      state.currentClient = client;
    },
    storeClientData(state, data){
      state.clientData = data;
    },

    // axios
    updateToken(state, value){
      state.requestToken = value;
    },
    updateClientList(state, list){
      state.clientList = list;
    },
    signOut(state){
      state.requestToken = null;
      state.clientList= null;
      expireCookie('flamingoAdminToken');
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
