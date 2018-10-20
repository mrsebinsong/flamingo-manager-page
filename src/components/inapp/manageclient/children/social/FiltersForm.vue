<template>
<div class="filters">
  <input type="text" class="filterinput"
         placeholder="keywords to be used."
         v-model="filterinput"
         @keydown.enter="addFilterKeyword"
  />
  <button @click.stop="addFilterKeyword">Add</button>
  <div class="itemboxwrapper">
    <selectedItemContainer :itemList="list"
                           @remove="removeFilterItem"
    />
  </div>
</div>
</template>
<script>
import selectedItemContainer from '@/components/assetComponents/selectedItemContainer';

export default {
  name: 'FilterForm',
  data(){
    return {
      filterinput: '',
      list: []
    };
  },
  components: { selectedItemContainer },
  props: [ 'data' ],
  methods: {
    addFilterKeyword(){
      let keyword = this.filterinput.trim();
      if(!keyword) return;

      this.list.push( this.filterinput );
      this.filterinput = '';
    },
    removeFilterItem(index){ this.list.splice(index, 1); }
  },
  mounted(){
    this.list = this.data;
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.filters {
  position: relative;
  padding: 12px 0px;

  input.filterinput {
    border: none;
    border-bottom: 1px solid rgba(#000, 0.8);

    padding: 8px;
    width: 150px;
    margin-bottom: 15px;
    color: $text;

    &::placeholder {
      color: rgba(0,0,0,0.5);
      font-style: italic;
    }
  }

  button {
    margin-left: 15px;
    padding: 10px 16px;
    background-color: #fe648c;

    font: { weight: bold; size: 13px; }
    color: #fff;
    box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.15);
    cursor: pointer;

    &:active { transform: translateY(1px); }
  }
}
</style>
