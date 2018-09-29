<template>
<div class="maincover">
  <div class="background_img">
    <img src="@/../static/cover_background.png" />
    <img src="@/../static/cover_darkener.png" />
  </div>

  <div class="getin">
    <div class="card_background"></div>
    <img src="@/../static/flamingo_white.png" />

    <p>Manager Page</p>

    <form @submit.prevent="submit">
      <input type="text" placeholder="type the access code"
             class="acceptcode" v-model="acceptCode"/>
      <button>Get In</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Maincover',
  data () {
    return {
      acceptCode: null
    }
  },
  methods: {
    submit(){ console.log("Submit!!"); }
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {margin-bottom: 20px; }

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
  }
}

</style>
