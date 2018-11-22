<template>
  <div class="reviewcard">
    <p class="name">{{ name | deslugify }}</p>
    <div class="setting">
      <p class="field" v-if="data.hasOwnProperty('on')">
        <span class="fieldname">ON/OFF</span>
        <span><Toggler :onoff="(!updateOn)? updateOn : data.on"
                       :disable="!updateOn"
                       @toggle="onOffChange"/></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('language')">
        <span class="fieldname">Language</span>
        <Dropdown :List="languageList"
                  :initialItem="data.language"
                  @select="languageSelect"
        />
      </p>
      <p class="field" v-if="data.hasOwnProperty('account')">
        <span class="fieldname">Account</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="account name"
                     v-model="account"
                     @input="accountChange"/></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('keyword')">
        <span class="fieldname">Keyword</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="Keyword"
                     v-model="keyword"
                     @input="keywordChange" /></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('id')">
        <span class="fieldname">Id</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="Id"
                     v-model="id"
                     @input="idChange" /></span>
      </p>
      <p class="field">
        <span class="fieldname filters">Filters</span>
        <FiltersForm :data="data.filters"
                     @listChange="filtersChange"
        />
      </p>
      <p class="field" v-if="data.hasOwnProperty('url')">
        <span class="fieldname url">Urls</span>
        <urlForm :list="(data.url)? [ data.url ] : []"
                 @urlChange="urlChange"
        />
      </p>
    </div>
  </div>
</template>
<script>
import Toggler from '@/components/assetComponents/Toggler';
import Dropdown from '@/components/assetComponents/Dropdown';
import FiltersForm from './FiltersForm';
import urlForm from './urlForm';

import { compareArrays } from '@/../static/js/helperFunctions.js';

export default {
  name: 'ReviewCard',
  data(){
    return {
      account: '',
      keyword: '',
      on: false,
      url: '',
      filters: [],
      language: '',
      id: '',

      fieldList: [],

      languageList: ['language', 'eng', 'kr']
    };
  },
  components: { Toggler, Dropdown, FiltersForm, urlForm },
  props: [ 'name', 'data', 'updateOn' ],
  computed: {
    dataToCompare(){
      return this.$store.state.currentClientCopy.social[this.name];
    },
    updateButtonOn(){ return this.$store.state.updateButtonOn; }
  },
  methods: {
    initForms(){

      for(let key in this.data){
        this.fieldList.push( key );
      }

      this.fieldList.forEach( field => {

        this[field] = (Array.isArray(this.data[field]))?
        this.data[field].slice() :
        this.data[field];

      });
    },

    accountChange(){
      if(this.account === '') this.account = null;

      if(this.dataToCompare.account !== this.account)
        this.commitChange();

    },
    keywordChange(){
      if(this.keyword === '') this.keyword = null;

      if(this.dataToCompare.keyword !== this.keyword)
        this.commitChange();

    },
    onOffChange(changed){
      this.on = changed;

      if(this.dataToCompare.on !== changed)
        this.commitChange();

    },
    languageSelect(selected){
      this.language = selected;

      if(this.dataToCompare.language !== this.language)
        this.commitChange();

    },
    filtersChange(changed){
      this.filters = changed;

      if( !this.dataToCompare.hasOwnProperty('filters') ||
          !compareArrays(this.filters, this.dataToCompare.filters))
        this.commitChange();

    },
    urlChange(urlList){
      if(urlList.length === 0)
        this.url = null;
      else
        this.url = urlList[0];

        if(this.dataToCompare.url !== this.url)
          this.commitChange();

    },

    commitChange(){
      let ObjToSend = {}, payload;

      this.fieldList.forEach( field => {
        ObjToSend[field] = this[field];
      });

      payload = { isSocial: true, key: this.name, value: ObjToSend };
      this.$store.commit('updateCurrentClient', payload);

      if(!this.updateButtonOn)
        this.$store.commit('updateButtonOnOff', true);
    }
  },
  filters: {
    deslugify(str){ return str.replace('_', ' '); }
  },
  mounted(){
   this.initForms();
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.reviewcard {
  position: relative;
  width: 100%; min-height: 200px;
  border: 1px solid #e2e2e2;
  margin-bottom: 20px;

  overflow-x: hidden;
  overflow-y: auto;

  p.name {

    position: relative;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: bold;

    padding: 12px 0px 12px 20px;
    border-bottom: 1px solid #e2e2e2;
    background-color: #eee;

    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 0; top: 0;
      width: 4px; height: 100%;
      background-color: rgba(#068587, 0.9);
    }
  }

  div.setting {
    padding: 24px 20px;

    p.field {
      margin: 8px 0px;
      padding: 3px 0px;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      min-height: 35px;

      > span {
        display: inline-block;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 1px;

      }
      span.fieldname {
        position: relative;
        min-width: 70px;
        margin-right: 15px;

        &:after {
          content: ':';
          display: inline-block;
          position: absolute;
          right: 0;
        }

        &.filters, &.url {
          display: inline-block;
          align-self: stretch;
          height: 50px; line-height: 50px;
        }
      }

      input.inlineinput {
        border: none;
        border-bottom: 1px solid rgba(#000, 0.8);
        padding: 8px;
        width: 150px;
        color: $text;

        &::placeholder {
          color: rgba(0,0,0,0.5);
          font-style: italic;
        }
      }

    }
  }
}
</style>
