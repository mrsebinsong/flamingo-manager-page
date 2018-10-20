<template>
  <div class="reviewcard">
    <p class="name">{{ name | deslugify }}</p>
    <div class="setting">
      <p class="field" v-if="data.on">
        <span class="fieldname">ON/OFF</span>
        <span><Toggler :onoff="data.on" /></span>
      </p>
      <p class="field" v-if="data.language">
        <span class="fieldname">Language</span>
        <Dropdown :List="languageList"
                  :initialItem="data.language"
        />
      </p>
      <p class="field" v-if="data.account">
        <span class="fieldname">Account</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="account name"
                     v-model="accountinput" /></span>
      </p>
      <p class="field" v-if="data.keyword">
        <span class="fieldname">Keyword</span>
        <span><input type="text"
                     class="inlineinput"
                     placeholder="Keyword"
                     v-model="keywordinput" /></span>
      </p>
      <p class="field" v-if="data.filters">
        <span class="fieldname filters">Filters</span>
        <FiltersForm :data="data.filters" />
      </p>
      <p class="field" v-if="data.url">
        <span class="fieldname url">Urls</span>
        <urlForm :list="(data.url)? [ data.url ] : []" />
      </p>
    </div>
  </div>
</template>
<script>
import Toggler from '@/components/assetComponents/Toggler';
import Dropdown from '@/components/assetComponents/Dropdown';
import FiltersForm from './FiltersForm';
import urlForm from './urlForm';

export default {
  name: 'ReviewCard',
  data(){
    return {
      accountinput: '',
      keywordinput: '',
      languageList: ['language', 'eng', 'kr']
    };
  },
  components: { Toggler, Dropdown, FiltersForm, urlForm },
  props: [ 'name', 'data' ],
  filters: {
    deslugify(str){ return str.replace('_', ' '); }
  },
  mounted(){}
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
