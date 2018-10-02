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
</div>
</template>
<script>
import URLList from '@/components/assetComponents/URLList';
import ReviewStatus from '@/components/assetComponents/ReviewStatus';

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
      }
    };
  },
  components: { URLList, ReviewStatus },
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

  }
}
</style>
