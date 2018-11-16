<template>
<div id="customer">
  <div class="section company">
    <p class="tag">[ Company ]</p>
    <input type="text" placeholder="company"
           v-model="company"
           @input="companyInputChange"
    />
  </div>
  <div class="section upgrade">
    <p class="tag">[ Upgrade Request ]</p>
    <div v-if="false">
      <span class="content">
        <i class="fas fa-exclamation-circle"></i>
        The client wants to bump up the plan to
        <span :class="`version
                      ${clientInfo.plan.upgradeRequest.toLowerCase()}`"
        >'{{ null }}'</span>
        version.
      </span>
      <button>Accept</button>
    </div>
    <div v-else>
      <span class="content">
        <i class="fas fa-exclamation-circle"></i>
        There is no upgrade request.
      </span>
    </div>
  </div>
  <div class="section isverified">
    <p class="tag">[ Verification ]</p>
    <!--span class="yes"
          v-if="clientInfo.isVerified">
    <i class="fas fa-check-circle"></i>&nbsp;&nbsp;&nbsp;Yes
    </span>
    <span class="no" v-else>
      <i class="fas fa-times-circle"></i>&nbsp;&nbsp;&nbsp;No
    </span-->
    <Toggler :onoff="isVerified"
             @toggle="isVerifiedChange"
              class="toggler1" />
  </div>
  <div class="section noticemessage">
    <p class="tag">[ Send A Notice Message ]</p>
    <div>
      <input type="text" placeholder="ex.) Would you give the PRO Version a try?" />
      <button @click="sendNotice">Push</button>
    </div>
    <ul class="messagesent">
      <li></li>
    </ul>
  </div>
  <div class="section socialonuse">
    <p class="tag">[ SNS Service On Use ]</p>
    <div class="wrapper">
      <div class="item">
        Instagram :
        <span class="yes"
              v-if="clientInfo.social.hasOwnProperty('instagram')"
        ><i class="fas fa-check-circle"></i></span>
        <span class="no" v-else><i class="fas fa-times-circle"></i></span>
      </div>
      <div class="item">
        Twitter :
        <span class="yes"
              v-if="clientInfo.social.hasOwnProperty('twitter')"
        ><i class="fas fa-check-circle"></i></span>
        <span class="no" v-else><i class="fas fa-times-circle"></i></span>
      </div>
      <!--div class="item">
        Youtube :
        <span class="yes"
              v-if="clientInfo.social.onUse.indexOf('youtube')>=0"
        ><i class="fas fa-check-circle"></i></span>
        <span class="no" v-else><i class="fas fa-times-circle"></i></span>
      </div-->
    </div>
  </div>
  <div class="section currentplan">
    <p class="tag">[ Current Plan ]</p>
    <div>{{ clientInfo.plan }}</div>
  </div>
  <div class="section language">
    <p class="tag">[ Language ]</p>
    <div><Dropdown :List="language.list"
                   :initialItem="language.selected"
                   @select="languageSelect" /></div>
  </div>
  <div class="section currency">
    <p class="tag">[ Currency Setting ]</p>
    <div class="item">
      <span>Currency type: </span>
      <input class="currency" type="text" placeholder="currency"
                 v-model="currency.type"
                 @input="currencyTypeInput"
      />
    </div>
    <div class="item">
      <span>Unit: </span>
      <input class="currency" type="text" placeholder="unit"
                v-model="currency.unit"
                @input="currencyUnitInput"
      />
    </div>
  </div>

  <div class="section ishq">
    <p class="tag">[ isHQ ]</p>
    <Toggler :onoff="isHQ"
             @toggle="isHQChanged"
             class="ishqtoggle"
    />
  </div>
</div>
</template>
<script>
import Dropdown from '@/components/assetComponents/Dropdown';
import Toggler from '@/components/assetComponents/Toggler';

export default {
  name: 'Customer',
  data(){
    return {
      noticeMessage: {
        input: '',
        store: []
      },
      language: { list: ['language', 'eng', 'kr'],
                selected: '' },
      isVerified: false,

      currency: { type: '', unit: ''  },
      company: '',
      isHQ: false
    };
  },
  computed: {
    clientInfo(){ return this.$store.state.currentClient; },
    originalClientInfo(){ return this.$store.state.currentClientCopy; },
    updateButtonOn(){ return this.$store.state.updateButtonOn; }
  },
  components: { Dropdown, Toggler },
  methods: {
    sendNotice(){
      this.noticeMessage.store.push(
        { time: Date.now(), content: this.noticeMessage.input }
      );
    },
    initForms(){
      this.language.selected = this.clientInfo.language;
      this.isVerified = this.clientInfo.isVerified;
      this.isHQ = this.clientInfo.isHQ;

      if(this.clientInfo.currency){
        this.currency.type = this.clientInfo.currency.type;
        this.currency.unit = this.clientInfo.currency.unit;
      }

      if(this.clientInfo.company)
        this.company = this.clientInfo.company;

    },
    languageSelect(selected){

      this.language.selected = selected;

      if(!this.updateButton){
        if(selected !== this.originalClientInfo.language)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);
      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'language', value: selected
      });

    },
    isVerifiedChange(changed){
      this.isVerified = changed;

      if(!this.updateButton){
        if(changed !== this.originalClientInfo.isVerified)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);
      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'isVerified', value: changed
      });

    },

    isHQChanged(changed){
      this.isHQ = changed;

      if(!this.updateButton){

        if(!this.originalClientInfo.isHQ)
          this.$store.commit('updateButtonOnOff', true);
        else if(changed !== this.originalClientInfo.isHQ)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);
      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'isHQ', value: changed
      });
    },

    currencyTypeInput(){
      if(this.currency.type === '') this.currency.type = null;

      if(!this.updateButton){

        if(!this.originalClientInfo.currency)
          this.$store.commit('updateButtonOnOff', true);
        else if(this.currency.type !== this.originalClientInfo.currency.type)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);

      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'currency',
        value: { type: this.currency.type, unit: this.currency.unit }
      });

    },

    currencyUnitInput(){
      if(this.currency.unit === '') this.currency.unit = null;

      if(!this.updateButton){

        if(!this.originalClientInfo.currency)
          this.$store.commit('updateButtonOnOff', true);
        else if(this.currency.unit !== this.originalClientInfo.currency.unit)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);

      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'currency',
        value: { type: this.currency.type, unit: this.currency.unit }
      });

    },

    companyInputChange(){
      if(this.company === '') this.company = null;

      if(!this.updateButton){

        if(!this.originalClientInfo.company)
          this.$store.commit('updateButtonOnOff', true);
        else if(this.company !== this.originalClientInfo.company)
          this.$store.commit('updateButtonOnOff', true);
        else
          this.$store.commit('updateButtonOnOff', false);

      }

      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'company',
        value: this.company
      });
    }

  },
  created(){
    this.initForms();
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#customer {
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  > div.section {
    position: relative;
    padding: 60px 30px;
    border-top: 1px solid #f2f2f2;

    > * { font-family: 'Roboto', courier; }

    > p.tag {
      font-size: 14px;
      font-weight: bold;
      color: $text;
      letter-spacing: 1px;

      margin-bottom: 30px;
    }

    button {
      margin-left: 50px;
      padding: 10px 22px;
      background-color: #fe648c;

      font-weight: bold;
      color: #fff;
      box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.15);
      cursor: pointer;

      &:active { transform: translateY(1px); }
    }

    input {
      height: 45px;

      padding: {
        top: 15px; bottom: 15px;
        left: 25px; right: 60px;
      }
      background-color: rgba(#fff, 0.25);

      border: none;
      border-bottom: 1px solid rgba(#444, 0.25);

      font-size: 16px;
      color: $text;

      &::placeholder {
        color: rgba($text, 0.5);
        font-style: italic;
      }
    }
  }

  div.company {
    width: 33%;

    input { width: 250px; }
  }

  div.upgrade {
    width: 33%;
    float: left;

    > div { margin-top: 30px; }

    > div span.content {
        font-size: 14px; color: $text;
        text-shadow: 2px 2px 2px rgba(0,0,0,0.075);

        i {
          opacity: 0.7; margin-right: 10px;
          transform: scale(1.2);
        }
    }

    > div span.version {
        color: #28b446;
        text-transform: uppercase;
        font-weight: bold;
    }

  } // div.Upgrade

  div.isverified {
    width: 33%;
    float: left;
  }

  div.noticemessage {
    width: 100%;
    float: left;

    > div input {
      width: 50%; min-width: 400px;
    }

  } // div.noticemessage


  div.socialonuse {
    width: 40%;
    float: left;

    div.wrapper {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      text-shadow: 2px 2px 2px rgba(0,0,0,0.075);

      div.item {
         margin-right: 25px;
         font-weight: 500;
         font-size: 14px;
      }
    }
  }

  div.currency {

    > div {
      margin-bottom: 8px;

      > span {
        font: { size: 13px; weight: bold; }
        margin-right: 10px;
      }
    }

    input { width: 150px; }

  }

  span.yes, span.no {
    margin-left: 12px;
    text-shadow: 2px 2px 2px rgba(0,0,0,0.075);
    opacity: 0.85;

    i { transform: scale(1.2); }
  }

  span.yes { color: #28b446; }
  span.no { color: #ff5757; }

  div.currentplan, div.language {
    width: 30%;
    float: left;
  }
}
</style>
