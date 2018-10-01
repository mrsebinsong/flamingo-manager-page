<template>
<div id="social">
  <div class="section sns">
    <p class="tag">[ SNS ]</p>
    <form @submit.prevent="registersns">
      <input type="text" class="sns"
             placeholder="Register A New URL for Crawling"/>
      <button>Register</button>
      <ul>
        <li></li>
      </ul>
    </form>
  </div>
  <div class="section review">
    <p class="tag">[ Review ]</p>
    <form @submit.prevent="registerReview">
      <input type="text" class="social"
             placeholder="Register A New Review"/>
      <button>Register</button>
    </form>
  </div>
</div>
</template>
<script>
export default {
  name: 'Social',
  data(){
    return {

    };
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
