<template>
<div class="urlform">
  <form @submit.prevent="registerReview">
    <input type="text" class="urlinput"
           placeholder="Register URLs to be used for collecting review data"
           v-model="urlInput"
    />
    <button @click.stop="reviewURLRegister">Register</button>
  </form>

  <URLList :list="urlList"
           @remove="reviewURLRemove"/>
</div>
</template>
<script>
import URLList from '@/components/assetComponents/URLList';

export default {
  name: 'UrlForm',
  data(){
    return {
      urlInput: '',
      urlList: []
    };
  },
  methods: {
    reviewURLRemove(index){
      this.urlList.splice(index, 1);
    },
    reviewURLRegister(){
      let str = this.urlInput.trim();
      if(!str) return;

      this.urlList.push( str );
      this.urlInput = '';
    }
  },
  components: { URLList },
  props: [ 'list' ],
  mounted(){
    this.urlList = this.list;
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.urlform {
  position: relative;
  padding: 12px 0px;

  input.urlinput {
    border: none;
    border-bottom: 1px solid rgba(#000, 0.8);

    padding: 8px;
    width: 250px;
    margin-bottom: 15px;
    color: $text;

    &::placeholder {
      color: rgba(0,0,0,0.5);
      font-style: italic;
    }
  }

  button {
    margin-left: 15px;
    padding: 10px 16px;
    background-color: #fe648c;

    font: { weight: bold; size: 13px; }
    color: #fff;
    box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.15);
    cursor: pointer;

    &:active { transform: translateY(1px); }
  }
}
</style>
