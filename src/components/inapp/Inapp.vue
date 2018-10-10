<template>
<div class="inapp">
  <Navbar />
  <content>
    <router-view/>
  </content>
</div>
</template>
<script>
import { getCookie } from '@/../static/js/helperFunctions.js';
import axios from 'axios';

import Navbar from './Navbar';
import ClientList from './clientlist/ClientList';
import ManageClient from './manageclient/ManageClient';

export default {
  name: 'Inapp',
  data(){
    return {
      componentActive: { clientList: true, manageClient: false }
    };
  },
  components: { Navbar, ClientList, ManageClient },
  methods: {
    fetchClientData(){
      const token = getCookie('flamingoAdminToken');

      if(!token){
        alert("not authorized");
        return;
      }
      else this.$store.commit('updateToken', token);

      this.$store.dispatch('getClientAccounts', token)
      .then( response => {
        let requestList = [];

        response.data.forEach( datum => {
          console.log("datum: ", datum);

          requestList.push(
            this.$store.dispatch('getAccount', datum.id)
          );
        });

        axios.all(requestList).then( results => {
          const filteredList = results.map( d => d.data );
          this.$store.commit("updateClientList", filteredList);
        });

      })
      .catch( err => {
        console.log("getAccounts Error(Inapp.vue): ", err);
      });
    }
  },
  mounted(){
    let idList = this.$store.state.clientList;

    this.fetchClientData();

    this.$store.dispatch('fetchClientData')
    .then( response => { console.log("fetching succeeded(Inapp.vue): ", response); })
    .catch( err => { console.log("fetching went wrong(Inapp.vue): ", err); });

    console.log("idList(Inapp.vue): ", idList);
    idList.forEach( (item, index) => {
      this.$store.dispatch('getAccount', item.id)
          .then( response => {
            console.log(`index[${index}]: `, response);
          });
    });

  }
};
</script>
<style lang="scss" scoped>

div.inapp {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #fff;

  > content {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: calc(100% - 100px);
    z-index: 2;
  }
}
</style>
