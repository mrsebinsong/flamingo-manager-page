<template>
<div id="customer">
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
    <span class="yes"
          v-if="clientInfo.isVerified">
    <i class="fas fa-check-circle"></i>&nbsp;&nbsp;&nbsp;Yes
    </span>
    <span class="no" v-else>
      <i class="fas fa-times-circle"></i>&nbsp;&nbsp;&nbsp;No
    </span>
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
                   :initialItem="clientInfo.language"
                   @select="languageSelect" /></div>
  </div>
</div>
</template>
<script>
import Dropdown from '@/components/assetComponents/Dropdown';

export default {
  name: 'Customer',
  data(){
    return {
      noticeMessage: {
        input: '',
        store: []
      },
      language: { list: ['language', 'eng', 'kr'],
                selected: '' }
    };
  },
  components: { Dropdown },
  methods: {
    sendNotice(){
      this.noticeMessage.store.push(
        { time: Date.now(), content: this.noticeMessage.input }
      );
    },
    languageSelect(selected){
      
      this.language.selected = selected;
      this.$store.commit('updateCurrentClient', {
        isSocial: false,
        key: 'language', value: selected
      });

    }
  },
  computed: {
    clientInfo(){ return this.$store.state.currentClient; }
  },
  mounted(){

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
  }

  div.upgrade {
    width: 50%;
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
    width: 50%;
    float: left;
  }

  div.noticemessage {

    > div input {
      height: 45px; width: 50%;
      min-width: 400px;

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
