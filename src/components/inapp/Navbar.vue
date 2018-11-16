<template>
<nav class="navbar">
  <div class="flamingologo">
    <img id="character" src="@/../static/imgs/flamingocharacter.svg" />
    <img id="logo" src="@/../static/imgs/flamingo_pink.png"
                   @click.stop="toClientList"
    />
    <p id="text">Adminstrator Page</p>
  </div>

  <ul class="btns">
    <li id="toclientlist"
        v-if="currentPage !== 'clientlist'"
        @click.stop="toClientList">client-list</li>
    <li id="exit" @click="exitApp">Exit</li>
  </ul>
</nav>
</template>
<script>
export default {
  name: "Navbar",
  data(){
    return {

    };
  },
  computed: {
    currentPage(){ return this.$store.state.currentPage }
  },
  methods: {
    exitApp(){

      this.$store.dispatch('Signout')
          .then( () => {
            this.$store.commit('pageChange', 'main');
            this.$router.push({ path: '/' });
          });
    },
    toClientList(){
      this.$store.commit('pageChange', 'clientlist');
      this.$router.push({ path: '/inapp/clientlist'});
    }
  },
  mounted(){
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/variables.scss';

nav.navbar {
  $navheight: 100px;

  position: absolute;
  width: 100%; height: $navheight;
  left: 0; top: 0;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 0px 1px 1px #f2f2f2;

  background-color: #fff;
  z-index: 2;

  div.flamingologo {
    position: absolute;
    top: 0; left: 0;
    width: auto; height: 100%;

    padding: { left: 25px; right: 25px; }

    display: flex;
    flex-direction: row;
    align-items: flex-end;

    > * { margin-bottom: 25px; }
    #character, #logo {
      height: 50%;
    }
    #logo { cursor: pointer; }
    #character { margin-right: 10px; opacity: 0.85; }
    #text {
      color: rgba($deeppink, 0.8);
      font: { family: 'Roboto', courier; weight: bold; size: 11px; }
      letter-spacing: 1px;
      text-shadow: 2px 2px 3px rgba(0,0,0,0.075);

      margin-left: 8px;
      min-width: 150px;
    }

  }

  ul.btns {
    position: absolute;
    top: 0; right: 0;
    width: auto; height: 100%;
    padding-right: 25px;

    display: flex;
    flex-direction: row;
    align-items: center;

    > li {
      position: relative;
      height: 70%;
      padding: { left: 20px; right: 20px; }
      margin-left: 8px;

      color: rgba($deeppink, 0.8);
      font: { family: 'Roboto', courier; weight: 700; size: 15px; }
      text-shadow: 2px 2px 3px rgba(0,0,0,0.075);

      line-height: $navheight*0.7;
      overflow: hidden;
      cursor: pointer;

      &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0; left: -110%;
        width: 100%; height: 5%;
        transition: left 0.15s ease-out;

        background-color: rgba($deeppink, 0.7);
      }

      &:hover:after, &.active:after { left: 0; }
    }
  }
}
</style>
