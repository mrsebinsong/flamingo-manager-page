<template>
<ul class="multipleselector">
  <li v-for="(item, index) in list"
      :key="`multiple-${index}`"
      class="item"
      :class="{ selected: selectedList.indexOf(item) }"
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
      let i = this.selectedList.indexOf(selected);

      if(i >= 0)
        this.selectedList.splice(i,1);
      else
        this.selectedList.push(selected);

      this.$emit('select', this.selectedList);
    }
  },
  props: [ 'list', 'initialSelected' ],
  mounted(){
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

  border: 1px dashed rgba(160,20,25,0.5);

  > li.item {
    padding: 5px 12px;
    border: 1px dashed $text;
    color: $text;
    background-color: #fff;

    cursor: pointer;
    text-align: center;

    &.selected {
      background-color: $text;
      color: #fff;
    }
  }
}
</style>
