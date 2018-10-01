<template>
<div id="manageclient">
  <ul class="menu">
    <li class="clientname">{{ clientInfo.name }}</li>
    <li v-for="(menu, i) in menus"
        class="menuitem"
        :class="{ active: menuActive[ menu.toLowerCase() ] }"
        @click.stop="menuClick(menu)"
    >{{ menu }}</li>
  </ul>
  <content>
    <router-view/>
  </content>
</div>
</template>
<script>
export default {
  name: 'ManageClient',
  data(){
    return {
      clientInfo: { name : ''},
      menus: [ 'Customer', 'Social', 'Competitor' ],
      menuActive: { 'customer': true, 'social': false, 'competitor': false }
    };
  },
  methods: {
    menuClick(clicked){
      this.menuActiveChange( clicked.toLowerCase() );
      this.$router.push({ name: clicked });
    },
    menuActiveChange(menu){
      for(let key in this.menuActive){ this.menuActive[key] = false; }
      this.menuActive[menu] = true;
    }
  },
  created(){
    let client = this.$store.state.currentClient;
    if(!client) this.$router.replace({ path: '/inapp/clientlist' });
    else this.clientInfo = client;
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/variables.scss';

div#manageclient {
  position: absolute;
  width: 100%; height: 100%;
  top: 0; left: 0;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    min-width: 300px; height: 100%;
    width: 20vw;
    left: 0; top: 0;
    transform-origin: 0% 0%;
    transform: skewX(-7deg);

    box-shadow:
    inset 0px 0px 40px 6px rgba(0,0,0,0.15),
    0px 0px 10px 6px rgba(0,0,0,0.06);

    background: #ff323d;
    background: -moz-linear-gradient(top, #ff323d 0%, #ac00ea 100%);
    background: -webkit-linear-gradient(top, #ff323d 0%,#ac00ea 100%);
    background: linear-gradient(to bottom, #ff323d 0%,#ac00ea 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff323d', endColorstr='#ac00ea',GradientType=1 );
  }

  ul.menu {
    position: absolute;
    height: 100%; max-width: 300px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    > li {
      font: { family: 'Roboto', courier;}
      word-break: keep-all;
      padding: 15px 15px 15px 30px;
      margin-left: 20px;
    }

    > li.clientname {
      width: calc(100% - 20px);
      font: { size: 40px; weight: bold; }
      color: rgba($text, 0.75);
      text-shadow: 5px 5px 2px rgba($text, 0.2);

      margin: { top: 30px; bottom: 50px; }
      padding-right: 35px;
      line-height: 1.3em;

      cursor: default;
    }
    > li.menuitem {
      position: relative;

      font: { size: 20px; weight: 500; }
      color: rgba(#fff, 0.8);

      text-shadow: 0px 0px 8px rgba($text, 0.5);
      text-transform: uppercase;
      letter-spacing: 2px;

      cursor: pointer;
      margin-bottom: 15px;
      transition: all 0.15s ease-out;

      &:hover {
        color: rgba($text,0.8);
        font-weight: bold;
      }

      &:after {
        content: '';
        display: none;
        position: absolute;
        width: 6px; height: 100%;
        left: 0; top: 0;
        background-color: rgba($text, 0.8);
        transform: scaleY(0.85);
      }
      &.active:after { display: block; }
    }
  }

  content {
    position: absolute;
    height: 100%; max-width: calc(100% - 300px);
    width: 80vw;
    top: 0; right: 0;
  }
}
</style>
