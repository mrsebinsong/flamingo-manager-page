<template>
<div class="maincover">
  <div class="background_img">
    <img id="coverimage" src="@/../static/imgs/cover_background.png" />
    <img id="darkener" src="@/../static/imgs/cover_darkener.png" />
  </div>

  <div class="getin">
    <div class="card_background"></div>
    <img src="@/../static/imgs/flamingo_white.png" />

    <p>Admin Page</p>

    <form @submit.prevent="submit">
      <input type="text" placeholder="type the access code"
             class="acceptcode" v-model="inputcode"/>
      <button>Get In</button>
    </form>

    <div class="feedback_signin"
         :class="{ active: !!feedback }"
    >
      <p class="text">{{ feedback }}</p>
      <span class="close" @click.stop="feedback = ''">x</span>
    </div>

  </div>
</div>
</template>

<script>
import { setCookie } from '@/../static/js/helperFunctions.js';

export default {
  name: 'Maincover',
  data () {
    return {
      inputcode: '',
      acceptCode: '0000',
      feedback: '',
      feedbacklist: {
        'emptyCode': 'Access Code is required',
        'wrongCode': 'Wrong Code. Ask Sangwan, Sofia, Lea or Sebin for the correct one.',
        'correctCode': 'Logging in...',
        'fetchFail': 'Fetch request has gone wrong. Inform the server engineer about this issue.'
      }
    }
  },
  methods: {
    submit(){
      if(!this.isAccessCodeOK()) return;
      this.feedback = this.feedbacklist['correctCode'];

      this.$store.dispatch('Signin', this.inputcode)
          .then( response => {
            this.feedback = this.feedbacklist['signInSuccess'];

            const token = response.data.token;
            setCookie('flamingoAdminToken', token, 7);
            this.$store.commit('updateToken', token);

            this.$store.commit('pageChange', 'clientlist');
            this.$router.push({ path: '/inapp'});

          })
          .catch( err => { console.log("Signin error:", err); });

    },
    isAccessCodeOK(){
      if(this.inputcode.length === 0){
        this.feedback = this.feedbacklist['emptyCode'];
        return false;
      }

      if(this.inputcode !== '0000'){
        this.feedback = this.feedbacklist['wrongCode'];
        return false;
      }

      return true;
    }
  },
  mounted(){

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/scss/mixins.scss';
$text: #353341;

div.maincover {
  position: absolute;
  width: 100%; height: 100%;
  top: 0; left: 0;

  div.background_img {
    position: absolute;
    width: 100%; height: 100%;
    left: 0; top: 0;
    background-size: cover;

    > img {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
    }

  }

  div.getin {
    @include absoluteCenter;
    min-width: 400px; min-height: 550px;
    border: 1px solid rgba(#fff, 0.6);
    box-shadow: 0px 0px 40px 10px rgba(0,0,0,0.25);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    > img {
      margin-bottom: 20px;
      transform-origin: 50% 50%;

     //  animation: hoppingIcon 3.75s linear infinite;
    }

    div.card_background {
      position: absolute;
      width: 100%; height: 100%;
      left: 0; top: 0;

      outline-offset: -10px;
      outline: 1px solid rgba(#fff, 0.6);

      background-color: rgba($text, 0.5);
      z-index: -1;
    }

    p {
      font: {
        family: 'Roboto', Times; size: 25px;
      }

      color: rgba(#fff,0.8);
      text-shadow: 3px 3px 4px rgba(0,0,0,0.15);
      letter-spacing: 3px;
      margin-bottom: 70px;
    }

    form {
      position: relative;
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;


      > input.acceptcode {
        width: 100%; height: 40px;
        margin-bottom: 15px;
        border: none;
        border-bottom: 1px solid #fff;

        background-color: transparent;
        padding: 16px;
        color: #fff;
        text-align: center;

        &:focus { background-color: rgba(#fff, 0.025); }

        font: {
          family: 'Roboto', courier; size: 17px;
        }

        &::placeholder {
          color: rgba(#fff, 0.25);
          font-style: italic;
        }
      }

      > button {
        display: inline-block;
        padding: 12px;
        width: 50%;
        border: 1px solid rgba(#000, 0.2);
        box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.15);

        font: {
          family: 'Roboto', courier; size: 15px;
        }

        &:active { transform: translateY(1px); }

        background-color: $text;
        color: #fff;
      }
    }

    div.feedback_signin {
      position: absolute;
      width: 70%; min-height: 60px;

      left: 50%; bottom: -100px;
      transition: bottom 0.2s ease-out;
      transform: translateX(-50%);
      background-color: rgba(#fff, 0.85);

      border-radius: 7px;

      &.active { bottom: 20px; }

      > * {
        color: $text;
        text-align: left;
        letter-spacing: 0px;
        font: { size: 13px; weight: bold; family: 'Roboto', courier; }
      }

      p {
        @include absoluteCenter;
        width: 80%;
      }

      span.close {
        position: absolute;
        right: 6px; top: 6px;
        line-height: 1;
        padding: 1px 3px;
        cursor: pointer;

        &:hover { border: 1px solid rgba($text, 0.6); }
        &:active { background-color: rgba($text, 0.1); }
      }
    }
  }
}

@keyframes hoppingIcon {
  0% { transform: translateY(0%) rotate(0deg); }
  5% { transform: translateY(-25%) rotate(-20deg); }
  8% { transform: translateY(-50%) rotate(0deg); }
  12% { transform: translateY(-25%) rotate(20deg); }
  15% { transform: translateY(0%) rotate(0deg); }
  100% { transform: translateY(0%) rotate(0deg); }
}

</style>
