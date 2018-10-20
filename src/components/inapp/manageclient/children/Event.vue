<template>
<div id="event">
  <div class="section">
    <p class="tag">[ Event ]</p>
    <ul class="eventlist">
      <li v-for="(item, i) in eventList"
          :key="`event-${i}`"
          class="eventitem"
      >
        <p class="time">
          <span class="from">{{ item.from }}</span>
          <span> ~ </span>
          <span class="to">{{ item.to }}</span>
        </p>
        <p class="content">{{ item.content }}</p>
        <span class="vbar"
              :style="{ backgroundColor: colorList[i%colorList.length] }"
        ></span>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import Dataset from '@/../static/js/eventData.js'

export default {
  name: 'Event',
  data(){
    return {
      eventList: null,
      colorList: ['#112F41', '#068587', '#4FB99F', '#F2B134', '#ED553B']
    };
  },
  mounted(){
    this.eventList = Dataset;
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#event {
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

    > ul.eventlist {
      min-height: 30px;
    }

    > ul.eventlist li.eventitem {
       position: relative;
       margin: 8px 0px;
       padding: 12px;
       padding-left: 25px;
       max-width: 85%;

       background-color: #fff;
       box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1);

       p.time {
         font-size: 11px;
         font-weight: bold;
         letter-spacing: 1px;
         margin-bottom: 8px;
         color: rgba($text,0.6);
       }
       p.content {
         font-size: 15px;
         color: $text;
       }

       span.vbar {
         position: absolute;
         display: block;
         width: 6px; height: 100%;
         left: 0; top: 0;
         background-color: rgba($text,0.6);
       }
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
}
</style>
