<template>
  <div class="itembox">
    <span class="selecteditem"
          v-for="(selectedItem, index) in itemList"
          :key="index*100"
    >{{ selectedItem }}<span class="close" @click="$emit('remove', index)"><i class="fas fa-times"></i></span></span>
  </div>
</template>
<script>
export default {
  name: 'selectedItemContainer',
  data(){
    return {

    };
  },
  props: [ 'itemList' ],
  mounted(){

  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.itembox {
    position: relative;
    width: 100%; height: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    padding: 10px;

    span.selecteditem {
      position: relative;
      padding: 7px 32px 7px 18px;
      min-width: 98px;
      border-radius: 15px;
      margin: { right: 15px; bottom: 15px; }
      text-align: center;
      background-color: #ffe28f;

      &:last-child { margin-right: 0px; }

      font: { size: 12px; weight: bold; }
      color: $text;

      .close {
        position: absolute;
        top: 50%; right: 15px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
</style>
