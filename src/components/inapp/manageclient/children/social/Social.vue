<template>
<div id="social">
  <div class="section1">
    <div class="text">
      <span>SNS + Review</span>
      <span class="toggler">
        <Toggler :onoff="currentClient.updateOn" />
      </span>
      <p class="explain">
        <span class="on">On</span>&nbsp;&nbsp;: Each SNS/Review setting will work as they are set individually.<br />
        <span class="off">Off</span>&nbsp;&nbsp;: This button will override all individual settings and turn them all off.
      </p>
    </div>
  </div>
  <div class="section2">
    <div class="wrapper sns">
      <p class="title">SNS</p>
      <content class="cardwrapper">
        <SNSCard v-for="(item, key) in dataset.sns"
                 :key="`social-sns-${key}`"
                 :name="key" :data="item"
        />
      </content>
    </div>
    <div class="wrapper review">
      <p class="title">Review</p>
      <content class="cardwrapper">
        <ReviewCard v-for="(item, key) in dataset.review"
                 :key="`social-review-${key}`"
                 :name="key" :data="item"
        />
      </content>
    </div>
  </div>


<template v-if="false">
  <div class="section sns">
    <p class="tag">[ SNS ]</p>
    <form @submit.prevent="registersns">
      <input type="text" class="sns"
             placeholder="Register sns URLs for crawling"
             v-model="sns.input"
      />
      <button @click.stop="snsURLRegister">Register</button>
    </form>

    <URLList :list="sns.urls"
             @remove="snsURLRemove"/>
  </div>
  <div class="section review">
    <p class="tag">[ Review ]</p>

    <ReviewStatus :reviewFields="clientInfo.review" />

    <form @submit.prevent="registerReview">
      <input type="text" class="social"
             placeholder="Register URLs to be used for collecting review data"
             v-model="review.input"
      />
      <button @click.stop="reviewURLRegister">Register</button>
    </form>

    <URLList :list="review.urls"
             @remove="reviewURLRemove"/>
  </div>
  <div class="section snsandreview">
    <p class="tag">[ filter ]</p>
    <input type="text" class="filter"
           placeholder="keywords to be used."
           v-model="filter.input"
           @keydown.enter="addFilterKeyword"
    />
    <button @click.stop="addFilterKeyword">Add</button>
    <div class="itemboxwrapper">
      <selectedItemContainer :itemList="filter.list"
                             @remove="removeFilterItem"
      />
    </div>
  </div>
</template>

</div>
</template>
<script>
import URLList from '@/components/assetComponents/URLList';
import ReviewStatus from '@/components/assetComponents/ReviewStatus';
import Toggler from '@/components/assetComponents/Toggler';

import SNSCard from './SNSCard';
import ReviewCard from './ReviewCard';
import selectedItemContainer from '@/components/assetComponents/selectedItemContainer';

export default {
  name: 'Social',
  data(){
    return {
      dataset: { sns: {}, review: {} },

      sns: {
        input: '',
        urls: []
      },
      review: {
        input: '',
        urls: []
      },
      filter: {
        input: '',
        list: ['word1', 'word2']
      }
    };
  },
  components: { URLList, Toggler, ReviewStatus, selectedItemContainer,
                SNSCard, ReviewCard },
  computed: {
    currentClient(){ return this.$store.state.currentClient; }
  },
  methods: {
    snsURLRegister(){
      let str = this.sns.input.trim();
      if(!str) return;

      this.sns.urls.push( str );
      this.sns.input = '';
    },
    reviewURLRegister(){
      let str = this.review.input.trim();
      if(!str) return;

      this.review.urls.push( str );
      this.review.input = '';
    },
    snsURLRemove(index){
      this.sns.urls.splice(index, 1);
    },
    reviewURLRemove(index){
      this.review.urls.splice(index, 1);
    },
    activateFilters(){

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
    }
  },
  watch: {

  },
  mounted(){
    this.sortData();
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

  overflow-x: hidden;
  overflow-y: auto;

  > div.section1 {
    position: relative;
    margin-top: 25px;
    width: 100%; height: 120px;
    padding: 0;

    > div.text {
      @include absoluteCenter;

      width: calc(100% - 30px*2);
      height: 80px; line-height: 80px;
      background-color: #fff;
      padding: 0px 45px;
      box-shadow: 4px 4px 20px 2px rgba(0,0,0,0.15);

      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      > span.toggler {
        margin-left: 20px;
      }

      > p.explain {

        position: relative;
        line-height: 1.5em;
        margin-left: 20px;
        font: { size: 13px; weight: normal; }
        color: rgba($text, 0.7);

        > span { font-weight: bold; font-size: 14px; }
        > span.off { color: rgba(#C95454, 0.6); }
        > span.on { color: rgba(#1A9733, 0.6); }
      }

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
    min-width: 550px;
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

    > div.itemboxwrapper {
      margin-top: 10px; width: 70%;
    }

    button {
      margin-left: 50px;
      padding: 14px 22px;
      background-color: #fe648c;

      font-weight: bold;
      color: #fff;
      box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.15);
      cursor: pointer;

      &:active { transform: translateY(1px); }
    }

    button.reverse {
      background-color: #fff;
      border: 2px solid $deeppink;
      color: $deeppink;
      margin-left: 20px;
    }

    input {
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

    input.filter { width: 250px; min-width: 0; }

  }
}
</style>
