<template>
<div id="social">

  <div class="section1">
    <div class="container">
      <div class="tag">SNS + Review</div>
      <div class="subsection updateon">
        <span class="fieldname"> UpdateOn: </span>
        <span class="toggler">
          <Toggler :onoff="currentClient.updateOn"
                   @toggle="updateOnToggle"/>
        </span>
        <p class="explain">
          <span class="on">On</span>&nbsp;&nbsp;: Each SNS/Review setting will work as they are set individually.<br />
          <span class="off">Off</span>&nbsp;&nbsp;: This button will override all individual settings and turn them all off.
        </p>
      </div>
      <div class="subsection remote">
        <span class="fieldname"> Manual Crawling: </span>
        <button
            @click.stop.prevent="remoteSNSCrawling" >Activate</button>
        <p class="explain">
          This button manually activates the crawling process of social data and update the database (remote-control/crawler API).
          Make sure you don't hit this multiple times at once. it will end up piling up multiple tasks.
        </p>
      </div>
    </div>
  </div>

  <div class="section2">
    <div class="wrapper sns">
      <p class="title">SNS</p>
      <content class="cardwrapper">
        <SNSCard v-for="(item, key) in dataset.sns"
                 :key="`social-sns-${key}`"
                 :name="key" :data="item"
                 :updateOn="updateOn"
        />
      </content>
    </div>
    <div class="wrapper review">
      <p class="title">Review</p>
      <content class="cardwrapper">
        <ReviewCard v-for="(item, key) in dataset.review"
                 :key="`social-review-${key}`"
                 :name="key" :data="item"
                 :updateOn="updateOn"
        />
      </content>
    </div>
  </div>

</div>
</template>
<script>
import Toggler from '@/components/assetComponents/Toggler';

import SNSCard from './SNSCard';
import ReviewCard from './ReviewCard';

export default {
  name: 'Social',
  data(){
    return {
      dataset: { sns: {}, review: {} },
      updateOn: false,
    };
  },
  components: { Toggler, SNSCard, ReviewCard },
  computed: {
    currentClient(){ return this.$store.state.currentClientCopy; }
  },
  methods: {
    updateOnToggle(changed){
      this.updateOn = changed;

      if(this.currentClient.updateOn !== changed){

        this.$store.commit('updateButtonOnOff', true);
        this.$store.commit("updateCurrentClient", {
          isSocial: false, key: 'updateOn', value: changed
        });

      }
      else
        this.$store.commit('updateButtonOnOff', false);

    },
    sortData(){
      let snsList = ['facebook', 'instagram', 'youtube', 'twitter'];
      let newSet = { sns: {}, review: {} };
      for(let key in this.currentClient.social){

        if(snsList.indexOf(key) >= 0)
          newSet.sns[key] = this.currentClient.social[key];
        else
          newSet.review[key] = this.currentClient.social[key];

      }

      this.dataset = newSet;
    },

    remoteSNSCrawling(){
      this.$store.dispatch('remoteControlSNS')
      .then( repsonse => { console.log("remoteControlSNS successful(from Social.vue)"); })
      .catch( err => { console.log("remoteControlSNS Failed(from Social.vue):", err); });
    }
  },
  mounted(){
    this.sortData();

    // initialize updateOn value
    this.updateOn = this.currentClient.updateOn;

  }
};
</script>
<style lang="scss">
@import '@/scss/mixins.scss';
@import '@/scss/variables.scss';

div#social {
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: auto;
  overflow-y: auto;

  > div.section1 {
    position: relative;
    margin-top: 40px;
    width: 100%; min-height: 120px;
    padding: 0;

    > div.container {
      position: relative;

      min-height: 80px; line-height: 80px;
      margin: 20px 30px;

      background-color: #fff;
      padding: 20px 0px 30px;
      box-shadow: 4px 4px 20px 2px rgba(0,0,0,0.15);

      font: { size: 25px; weight: bold; }
      color: $text;


      &:after {
        content: '';
        position: absolute;
        display: block;
        width: 30px; height: 30px;
        top: 0; left: 0;

        z-index: 1;
      }

      &:after { background-color: rgba(#4FB99F, 0.9); }

      > div { padding: 0px 45px; }
      > div.tag { border-bottom: 1px solid #f2f2f2; }
      > div.subsection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        line-height: 1.5em;
        margin-top: 30px;

        span.fieldname {
          display: inline-block;

          font: { size: 14px; weight: bold; }
          color: $text;
          line-height: 1.3em;

          margin-right: 15px;
        }

        p.explain {

          position: relative;
          line-height: 1.5em;
          margin-left: 20px;
          font: { size: 13px; weight: normal; }
          color: rgba($text, 0.7);

          > span { font-weight: bold; font-size: 14px; }
          > span.off { color: rgba(#C95454, 0.6); }
          > span.on { color: rgba(#1A9733, 0.6); }
        }

      }

      > div.updateon {

        span.toggler {
          margin-left: 10px;
        }

      }

      > div.remote {

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

    }
  }

  > div.section2 {
    position: relative;
    height: 100%; width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  div.wrapper {
    $titleHeight: 120px;

    position: relative;
    height: 90%;
    max-width: 45%;
    width: 550px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 20px 2px rgba(0,0,0,0.15);

    &:first-child { margin-right: 50px; }
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 30px; height: 30px;
      top: 0; left: 0;

      z-index: 1;
    }

    &.sns:after { background-color: rgba(#112F41,0.9); }
    &.review:after { background-color: rgba(#068587, 0.9); }

    p.title {
      position: absolute;
      top: 0; left: 0;

      font: { size: 25px; weight: bold; }
      letter-spacing: 1px;

      color: $text;
      padding: 0 40px;
      height: $titleHeight; width: 100%;
      line-height: $titleHeight;

      border: 1px solid rgba(0,0,0,0.1);
    }

    content.cardwrapper {
      position: absolute;
      width: 100%; height: calc(100% - #{$titleHeight});
      bottom: 0; left: 0;

      padding: 20px 15px 0px 15px;

      overflow-x: hidden;
      overflow-y: auto;
    }

  }
}
</style>
