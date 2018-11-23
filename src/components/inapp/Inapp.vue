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

//component
import Navbar from './Navbar';

export default {
  name: 'Inapp',
  data(){
    return {

    };
  },
  components: { Navbar },
  computed: {
    clientList(){ return this.$store.state.clientList; }
  },
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
        let clientListCreated = [];

        response.data.forEach( datum => {
          let promise = this.$store.dispatch('getAccount', datum.id);

          requestList.push( promise );
          promise.then( response => {
            let data = response.data;

            if(data.isVerified && data.id &&
                    data.email.indexOf('kiyeopyang') === -1){
                clientListCreated.push(response.data);
                this.$store.commit("updateClientList", clientListCreated);
            }

          });
        });

        axios.all(requestList).then( results => {
          this.$store.commit("updateIdEmailPairs", clientListCreated);
        });

      })
      .catch( err => {
        console.log("getAccounts Error(Inapp.vue): ", err);
      });
    }
  },
  mounted(){
    this.fetchClientData();
  }
};
</script>
<style lang="scss" scoped>

div.inapp {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: #f2f2f2;

  > content {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: calc(100% - 100px);
    z-index: 2;
  }
}
</style>
