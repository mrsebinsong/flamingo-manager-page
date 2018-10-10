<template>
<div id="api">
  <div class="section">
    <p class="tag">
      <span class="text">[ P.O.S ]</span>
      <Toggler :onoff="true" />
    </p>

  </div>
  <div class="section">
    <p class="tag">
      <span class="text">[ OPEN API ]</span>
      <Toggler :onoff="true" />
    </p>
  </div>
  <div class="section">
    <p class="tag"><span class="text">[ SNS API ]</span></p>
    <div class="line">
      <div class="togglecard"
           v-for="(item, index) in snsAPI"
           :key="`${item[0]}-${index}`"
      >
        <span>{{ item[0]}}</span>
        <Toggler :onoff="item[1]" />
      </div>
    </div>
  </div>
  <div class="section">
    <p class="tag"><span class="text">[ REVIEW API ]</span></p>
    <div class="line">
      <div class="togglecard"
           v-for="(item, index) in reviewAPI"
           :key="`${item[0]}-${index}`"
      >
        <span>{{ item[0]}}</span>
        <Toggler :onoff="item[1]" />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Toggler from "@/components/assetComponents/Toggler";

export default {
  name: "API",
  data(){
    return {
      snsAPI: [ ['Instagram', true], ['Facebook', true], ['Twitter', false] ],
      reviewAPI: [ ['Yelp', true], ['TripAdvisor', true], ['FourSquare', false],
                   ['Google', true], ['OpenTable', true], ['Zomato', false] ]
    };
  },
  components: { Toggler }
}
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#api {
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  > div.section {
    position: relative;
    padding: 40px 30px;
    border-top: 1px solid #f2f2f2;

    * { font-family: 'Roboto', courier; }

    > p.tag {
      display: flex;
      align-items: center;

        > span.text {
          display: inline-block;
          font-size: 11px;
          font-weight: bold;
          color: $text;
          letter-spacing: 1px;
          margin-right: 30px;
        }
    }

    div.line {
      position: relative;
      margin-top: 15px;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;

      div.togglecard {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-right: 30px;
        padding: 8px;

        &:last-child { margin-right: 0; }

        > span {
          font-size: 12px;
          font-weight: bold;
          color: $text;
          margin-bottom: 10px;
        }
      }
    }

  }
}
</style>
