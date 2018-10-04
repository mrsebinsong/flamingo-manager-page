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
@import '@/scss/variables.scss';

div.competitorlist {
  position: relative;
  width: 100%; height: $competitor_listHeight; /* 30*2 + 45 */
  border-bottom: 1px solid #f2f2f2;
  padding: 30px 50px;

  ul {
    position: relative;

    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;

  }

  li {
    border: 1px solid $competitor_itemcolor;
    position: relative;
    cursor:pointer;

    &:hover { border: 1px solid $competitor_itemcolor; }
  }

  li.competitor {
    height: $competitor_itemheight; min-width: 135px;
    text-align: center;
    line-height: 45px;

    padding: { left: 35px; right: 35px; }
    color: $competitor_itemcolor;
    font: {
      size: 14px; family: 'Roboto', courier; weight: 500;
    }
    text-transform: uppercase;

    &.active {
      color: #fff;
      background-color: $competitor_itemcolor;
    }
  }

  li.additem {
    width: 45px; height: $competitor_itemheight;
    color: $competitor_itemcolor;

    &:after {
      content: '+';
      position: absolute;
      display: block;
      left: 50%; top: 50%;
      transform: translate(-50%, -60%);
      font-size: 30px;
      line-height: $competitor_itemheight;
      color: inherit;

    }
  }
}
</style>
