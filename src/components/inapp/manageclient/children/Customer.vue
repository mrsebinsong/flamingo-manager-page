<template>
<div id="customer">
  <div class="section upgrade">
    <p class="tag">[ Upgrade Request ]</p>
    <div>
      <span class="content"><i class="fas fa-exclamation-circle"></i> The client wants to upgrade the plan to <span class="version">Pro</span> version. </span>
      <button>Accept</button>
    </div>
  </div>
  <div class="section noticemessage">
    <p class="tag">[ Send A Notice Message ]</p>
    <div>
      <input type="text" placeholder="ex.) Would you give the PRO Version a try?" />
      <button>Push</button>
    </div>
  </div>
  <div class="section socialonuse">
    <p class="tag">[ SNS Service On Use ]</p>
    <div class="wrapper">
      <div class="item">Instagram : <span class="yes"><i class="fas fa-check-circle"></i></span></div>
      <div class="item">Facebook : <span class="no"><i class="fas fa-times-circle"></i></span></div>
      <div class="item">Twitter : <span class="yes"><i class="fas fa-check-circle"></i></span></div>
    </div>
  </div>
  <div class="section currentplan">
    <p class="tag">[ Current Plan ]</p>
    <div>Basic</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Customer',
  data(){
    return {

    };
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
    width: 50%;
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

      div.item > span {
        margin-left: 12px;
        text-shadow: 2px 2px 2px rgba(0,0,0,0.075);
        opacity: 0.85;

        i { transform: scale(1.2); }
      }
      div.item > span.yes { color: #28b446; }
        div.item > span.no { color: #ff5757; }
    }
  }


  div.currentplan {
    width: 50%;
    float: right;
  }
}
</style>
