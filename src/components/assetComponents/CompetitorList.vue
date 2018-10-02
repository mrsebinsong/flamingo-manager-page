<template>
<div class="competitorlist">
  <ul>
    <li v-for="(item, index) in list"
        :class="{
                  competitor: true,
                  active: activelist[slugify(item)]
                }"
        :key="`competitorList-${index}`"
        @click.stop="competitorSelect(item)"
    >
      {{ item }}
    </li>
    <li class="additem"
        @click.stop="addItem"
    ></li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'CompetitorList',
  data(){
    return {

    };
  },
  props: [ 'list', 'activelist' ],
  methods: {
    competitorSelect(name){
      for(let key in this.activelist){ this.activelist[key] = false; }
      this.activelist[this.slugify(name)] = true;

      this.$emit('select', name);
    },
    slugify(str){
      return str.toLowerCase().replace(/\s+/g, "");
    },
    addItem(){

    }
  }
};
</script>
<style lang="scss">
$itemcolor: #fe648c;
$itemheight: 45px;

div.competitorlist {
  position: relative;
  width: 100%; height: 105px; /* 30*2 + 45 */

  padding: 30px 50px;
  border-bottom: 1px solid $itemcolor;

  ul {
    position: relative;

    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;

  }

  li {
    border: 1px solid $itemcolor;
    position: relative;
    cursor:pointer;

    &:hover { border: 1px solid $itemcolor; }
  }

  li.competitor {
    height: $itemheight; min-width: 135px;
    text-align: center;
    line-height: 45px;

    padding: { left: 35px; right: 35px; }
    color: $itemcolor;
    font: {
      size: 14px; family: 'Roboto', courier; weight: 500;
    }
    text-transform: uppercase;

    &.active {
      color: #fff;
      background-color: $itemcolor;
    }
  }

  li.additem {
    width: 45px; height: $itemheight;
    color: $itemcolor;

    &:after {
      content: '+';
      position: absolute;
      display: block;
      left: 50%; top: 50%;
      transform: translate(-50%, -60%);
      font-size: 30px;
      line-height: $itemheight;
      color: inherit;

    }
  }
}
</style>
