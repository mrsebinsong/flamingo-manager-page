import { expireCookie } from '@/../static/js/helperFunctions.js';

import Vue from 'vue'
import Vuex from 'vuex'

import axios from '@/axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentPage: 'main',

    currentClient: null,
    currentClientCopy: null,

    //axios
    requestToken: null,
    clientList: null,
    clientId: ''
  },
  getters: {
    clientDataModified( state ){
      let str1, str2;

      str1 = JSON.stringify( state.currentClient );
      str2 = JSON.stringify( state.currentClientCopy );

      return str1 !== str2;
    }
  },
  mutations: {
    pageChange(state, pageName){
      state.currentPage = pageName;
    },
    currentClientChange(state, client){
      state.currentClient = client;

      if(client.id){
        state.clientId = client.id;
        delete state.currentClient.id;
      }

      state.currentClientCopy = JSON.parse( JSON.stringify(client) );
    },

    // axios
    updateToken(state, value){
      state.requestToken = value;
    },
    updateClientList(state, list){
      state.clientList = list;
    },
    updateCurrentClient(state, payload){

      if(payload.isSocial)
        state.currentClient.social[ payload.key ]
          = payload.value;
      else
        state.currentClient[ payload.key ]
          = payload.value;
    },
    signOut(state){
      state.requestToken = null;
      state.clientList= null;
      expireCookie('flamingoAdminToken');
    }
  },
  actions: {
    currentClientChange({ commit }, payload){
      console.log("selected Client: ", payload);
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
    },
    updateAccount({ state, commit }){
      let ObjToSend =
        JSON.parse( JSON.stringify(state.currentClient) );

      delete ObjToSend.id;

      return axios.put('manager/account', {
        token: state.requestToken,
        accountId: state.clientId,
        update: ObjToSend
      })

    },

    uploadFile({ state, commit }, { path, data }){
      console.log("---------- formData to be sent(uploadFile) --------- ");
      for(let key of data.keys()){
        console.log(`data[${key}]: `, data.get(key));
      }

      return axios.post(path, data);
    }
  }
});
