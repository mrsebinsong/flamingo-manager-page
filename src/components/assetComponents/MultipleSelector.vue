<template>
<ul class="multipleselector">
  <li v-for="(item, index) in list"
      :key="`multiple-${index}`"
      class="item"
      :class="{ selected: selectedList.indexOf(item) >= 0 }"
      @click.stop="selectItem(item)"
      >{{ item }}</li>
</ul>
</template>
<script>
export default {
  name: 'MultipleSelector',
  data(){
    return {
      selectedList: []
    };
  },
  methods: {
    selectItem(selected){
      let index = this.selectedList.indexOf(selected);

      if(index === -1) this.selectedList.push(selected);
      else this.selectedList.splice(index, 1);

      this.$emit('select', this.selectedList);
    }
  },
  props: [ 'list', 'initialSelected' ],
  watch: {
    initialSelected(newVal, oldVal){
      if(newVal) this.selectedList = newVal.slice();
    }
  },
  mounted(){

    if(this.initialSelected)
      this.selectedList = this.initialSelected.slice();

  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

ul.multipleselector {
  position: relative;

  display: flex;
  flex-direction: row;

  > li.item {
    padding: 7px 12px;
    background-color: #fff;
    border-right: 1px solid #ddd;

    cursor: pointer;
    text-align: center;

    color: $text;
    font: { size: 11px; weight: bold; }
    letter-spacing: 1px;

    &.selected {
      background-color: $text;
      color: #fff;
    }

    &:hover {
      outline: 1px solid $text;
      outline-offset: -1px;
    }
  }
}
</style>
