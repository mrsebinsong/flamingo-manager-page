<template>
<div id="clientlist">
  <div class="listwrapper">
    <div class="search">
      <input type="text" class="search" placeholder="Shop Name" v-model="text" />
      <i class="fas fa-search"></i>
    </div>
    <ul class="list">
      <template v-if="clientsFromServer">
        <ClientItem v-for="(client, i) in clientsFromServer" :key="`client-${i}`"
                    :clientInfo="client" :bgColor="colorList[i%colorList.length]"
        />
      </template>
      <div v-else class="loading">
        <LoadingAnimation />
        <span>Loading Client Data</span>
      </div>
    </ul>
  </div>
  <p class="tag">Client List</p>
</div>
</template>
<script>
import ClientItem from './ClientItem';
import LoadingAnimation from '@/components/assetComponents/LoadingAnimation';

export default {
  name: 'ClientList',
  data(){
    return {
      text: '',
      colorList: ['#ffe28f', '#e3ff8f', '#b1d5ff', '#4a90e2',
                  '#dadfe5', '#fe648c', '#ff530d', '#78BE97',
                  '#CEF19E', '#A86355', '#F1A9BB', '#009EA9']
    };
  },
  computed: {
    clients(){
      let clientList, filteredList;
      clientList = this.$store.state.clientData;
      filteredList = (clientList)?
                        clientList.filter( client =>
                          client.name.toLowerCase().indexOf(this.text) >= 0 ) :
                        [];

      return filteredList;
    },
    clientsFromServer(){
      return this.$store.state.clientList || [];
    }
  },
  components: { ClientItem, LoadingAnimation },
  methods: {
  },
  mounted(){

  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/variables.scss';
@import '@/scss/mixins.scss';

div#clientlist {
  position: absolute;
  width: 100%; height: 100%;
  top: 0; left: 0;

  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%; height: 65%;
    left: 0; top: 0;
    transform-origin: 0% 0%;
    transform: skewY(-7deg);

    box-shadow:
    inset 0px 0px 40px 6px rgba(0,0,0,0.15),
    0px 0px 10px 6px rgba(0,0,0,0.06);

    background: #ff323d;
    background: -moz-linear-gradient(left, #ff323d 0%, #ac00ea 100%);
    background: -webkit-linear-gradient(left, #ff323d 0%,#ac00ea 100%);
    background: linear-gradient(to right, #ff323d 0%,#ac00ea 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff323d', endColorstr='#ac00ea',GradientType=1 );
  }

  p.tag {
    position: absolute;
    right: 100px; top: 80px;
    color: rgba($text, 0.65);
    text-shadow:
    5px 5px 2px rgba($text, 0.2);

    font: { family: 'Roboto', courier; weight: 800; size: 40px; }
  }

  div.listwrapper {
    position: absolute;
    left: 50%; top: 80px;
    transform: translateX(-50%);
    overflow: hidden;

    width: 600px; min-height: 450px;
    height: 70%;
    background-color: #f2f2f2;
    border-radius: 15px;
    border: 1px solid rgba(#aaa,0.2);

    box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.075);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%; height: 30px;
      top: -2px; left: 0;
      background-color: #fff;
    }

    div.search {
      position: relative;
      width: 70%; height: auto;
      margin-bottom: 35px;

      > input {
        height: 50px; width: 100%;
        padding: {
          top: 15px; bottom: 15px;
          left: 25px; right: 60px;
        }
        background-color: rgba(#fff, 0.25);

        border: 1px solid rgba(#444, 0.25);
        border-radius: 15px;

        font: { family: 'Roboto', courier; weight: normal; size: 16px; }
        color: $text;

        &::placeholder {
          color: rgba($text, 0.5);
          font-style: italic;
        }
      }

      > i {
        position: absolute;
        top: 50%; right: 25px;
        transform: translateY(-50%);
        opacity: 0.4;
      }
    }
    ul.list {

      position: relative;
      width: 70%; height: 55%;
      overflow-x: hidden; overflow-y: auto;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      div.loading {
        @include absoluteCenter;

        display: flex;
        flex-direction: column;
        align-items: center;

        > span {
          font: { family: 'Roboto', courier; weight: normal; size: 12px; }
          letter-spacing: 1px;
          color: $text;
          margin-top: 15px;
        }
      }
    } // ul.list

  } // div.listwrapper
}
</style>
