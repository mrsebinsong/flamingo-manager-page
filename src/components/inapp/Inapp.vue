<template>
<div class="inapp">
  <Navbar />
  <content>
    <router-view/>
  </content>
</div>
</template>
<script>
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
  mounted(){
    this.$store.dispatch('fetchClientData')
    .then( response => { console.log("fetching succeeded: ", response); })
    .catch( err => { console.log("fetching went wrong: ", err); });
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
