<template>
<li class="clientitem"
    @click.stop="toClientPage">
  <p class="icon"
     :style="{backgroundColor: bgColor}">{{ clientInfo.name.slice(0,1) }}</p>
  <p class="name">{{ clientInfo.name }}</p>
</li>
</template>
<script>
export default {
  name: 'ClientItem',
  data(){
    return {

    };
  },
  props: ['clientInfo', 'bgColor'],
  methods: {
    toClientPage(){
      this.$store.commit('pageChange', 'clientpage');
      this.$store.commit('currentClientChange', this.clientInfo);
      this.$router.push({ path: '/inapp/client'});
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixins.scss';
@import "@/scss/variables.scss";

li.clientitem {
  @include flexCenter;
  flex-direction: column;
  cursor: pointer;

  min-height: 120px;
  margin-bottom: 20px;

  &:hover > p {
    transform: scale(1.1);
    opacity: 1;
  }

  > p {
    font-family: 'Roboto', courier;
    transition: transform 0.15s ease-out;
    opacity: 0.8;
  }
  > p.icon {
    width: 50px; height: 50px;
    border-radius: 50%;
    margin-bottom: 15px;

    line-height: 50px;
    text-align: center;
    font-weight: bold; font-size: 25px;

    color: #fff;
    text-shadow: 0px 0px 3px rgba(0,0,0,0.05);
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.05);
  }
  > p.name {
    font-weight: bold; font-size: 11px;
    text-shadow: 0px 0px 3px rgba(0,0,0,0.15);
    color: $text;
  }
}
</style>
