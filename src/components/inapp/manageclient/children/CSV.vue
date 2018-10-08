<template>
<div id="csv">
  <div class="section">
    <p class="tag">[ SALES ]</p>
    <FileInput />
  </div>
  <div class="section">
    <p class="tag">[ REVENUE ]</p>
    <FileInput />
  </div>
  <div class="section">
    <p class="tag">[ SALE + REVENUE ]</p>
    <FileInput />
  </div>
</div>
</template>
<script>
import FileInput from '@/components/assetComponents/FileInput';
import Dataset from '@/../static/js/eventData.js'

export default {
  name: 'CSV',
  data(){
    return {

    };
  },
  components: { FileInput },
  methods: {

  },
  mounted(){
    this.eventList = Dataset;
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#csv {
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  > div.section {
    position: relative;
    padding: 40px 30px;
    border-top: 1px solid #f2f2f2;

    > * { font-family: 'Roboto', courier; }

    > p.tag {
      font-size: 11px;
      font-weight: bold;
      color: $text;
      letter-spacing: 1px;

      margin-bottom: 30px;
    }

  }
}
</style>
