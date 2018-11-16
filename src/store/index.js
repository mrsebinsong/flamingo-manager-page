import { expireCookie } from '@/../static/js/helperFunctions.js';

import Vue from 'vue'
import Vuex from 'vuex'

import axios from '@/axios';
import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentPage: 'main',

    currentClient: null,
    currentClientCopy: null,
    updateButtonOn: false,
    idEmailPairs: null,

    //axios
    requestToken: null,
    clientList: null,
    clientId: ''
  },
  getters: {
    anyUpdateMade(state){
      let objStr1, objStr2;

      objStr1 = JSON.stringify(state.currentClient);
      objStr2 = JSON.stringify(state.currentClientCopy);

      return objStr1 !== objStr2;
    }
  },
  mutations: {
    pageChange(state, pageName){
      state.currentPage = pageName;
    },
    currentClientChange(state, client){
      state.currentClient = client;

      if(client.id) state.clientId = client.id;
      else if(idEmailPairs[client.email])
          state.clientId = idEmailPairs[client.email];
      else state.clientId = null;

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
    updateIdEmailPairs(state, list){
      let obj = {};

      list.forEach( client => {
        obj[client.email] = client.id;
      });

      state.idEmailPairs = obj;
    },
    signOut(state){
      state.requestToken = null;
      state.clientList= null;
      expireCookie('flamingoAdminToken');
    },

    updateButtonOnOff(state, value){

      state.updateButtonOn = value;
    },
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
    },
    updateAccount({ state, commit }){
      let ObjToSend =
        JSON.parse( JSON.stringify(state.currentClient) );

      if(ObjToSend.id) delete ObjToSend.id;

      if(!state.clientId)
        throw new Error(`invalid clientId: ${state.clientId}`);
      if(!state.requestToken)
        throw new Error(`invalid requestToken: ${state.requestToken}`);

      return axios.put('manager/account', {
        token: state.requestToken,
        accountId: state.clientId,
        update: ObjToSend
      });

    },

    uploadFile({ state, commit }, { path, data }){
      return axios.post(path, data);
    },
    uploadSalesAndMenuFile({ state, commit }, { path, data }){
      return Axios.post( path, data );
    },

    remoteControlSNS({ state , commit}){
      return axios.post(
        'remote-control/social/sns',
        {}
      );
    },

    remoteControlReview({ state, commit }){
      return axios.post(
        'remote-control/social/review', {}
      );
    },

    updateDB({ state, commit }){
      return axios.post(
        'remote-control/update', {}
      );
    }
  }
});
