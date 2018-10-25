<template>
  <div class="snscard">
    <p class="name">{{ name | deslugify }}</p>
    <div class="setting">
      <p class="field" v-if="data.hasOwnProperty('on')">
        <span class="fieldname">ON/OFF</span>
        <span><Toggler :onoff="(updateOn === false)? updateOn : on"
                       :disable="!updateOn"
                       @toggle="onOffChange"
              /></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('account')">
        <span class="fieldname">Account</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="account name"
                     v-model="account"
                     @input="accountChange"
                /></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('tag')">
        <span class="fieldname">Tag</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="tag"
                     v-model="tag"
                     @input="tagChange"
              /></span>
      </p>
      <p class="field" v-if="data.hasOwnProperty('filters')">
        <span class="fieldname filters">Filters</span>
        <FiltersForm :data="data.filters"
                     @listChange="filtersChange"
        />
      </p>
    </div>
  </div>
</template>
<script>
import Toggler from '@/components/assetComponents/Toggler';
import FiltersForm from './FiltersForm';

export default {
  name: 'SNSCard',
  data(){
    return {
      // These are the initial values
      account: '',
      tag: '',
      on: false,
      filters: [],

      fieldList: []
    };
  },
  components: { Toggler, FiltersForm },
  props: [ 'name', 'data', 'updateOn' ],
  methods: {
    initForms(){

      for(let key in this.data){
        this.fieldList.push( key );
      }
      this.fieldList.forEach( field => {
        this[field] = this.data[field];
      });
    },
    onOffChange(changed){
      this.on = changed;

      this.commitChange();
    },
    accountChange(changed){

      this.commitChange();
    },
    tagChange(changed){
      this.commitChange();
    },
    filtersChange(changed){
      this.filters = changed;

      this.commitChange();
    },
    commitChange(){
      let ObjToSend = {}, payload;

      this.fieldList.forEach( field => {
        ObjToSend[field] = (this[field] === '')? null: this[field];
      });

      payload = { isSocial: true, key: this.name, value: ObjToSend };

      this.$store.commit('updateCurrentClient', payload);
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

div.snscard {
  position: relative;
  width: 100%; min-height: 200px;
  border: 1px solid #e2e2e2;
  margin-bottom: 20px;

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
      background-color: rgba(#112F41,0.9);
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

        &.filters {
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
