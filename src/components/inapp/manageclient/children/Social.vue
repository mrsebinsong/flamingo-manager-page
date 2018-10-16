<template>
<div id="social">
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
    <button class="reverse" @click.stop="activateFilter">Activate</button>

    <div class="itemboxwrapper">
      <selectedItemContainer :itemList="filter.list"
                             @remove="removeFilterItem"
      />
    </div>
  </div>
</div>
</template>
<script>
import URLList from '@/components/assetComponents/URLList';
import ReviewStatus from '@/components/assetComponents/ReviewStatus';

import selectedItemContainer from '@/components/assetComponents/selectedItemContainer';

export default {
  name: 'Social',
  data(){
    return {
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
  components: { URLList, ReviewStatus, selectedItemContainer },
  computed: {
    clientInfo(){ return this.$store.state.currentClient; }
  },
  methods: {
    snsURLRegister(){
      this.sns.urls.push( this.sns.input );
      this.sns.input = '';
    },
    reviewURLRegister(){
      this.review.urls.push( this.review.input );
      this.review.input = '';
    },
    snsURLRemove(index){
      this.sns.urls.splice(index, 1);
    },
    reviewURLRemove(index){
      this.review.urls.splice(index, 1);
    },

    addFilterKeyword(){
      let keyword = this.filter.input.trim();
      if(!keyword) return;

      this.filter.list.push( this.filter.input );
      this.filter.input = '';
    },
    removeFilterItem(index){ this.filter.list.splice(index, 1); },
    activateFilters(){

    }
  },
  mounted(){
    this.sns.urls =
    this.clientInfo.social.urlOnCrawling.slice();
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#social {
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
