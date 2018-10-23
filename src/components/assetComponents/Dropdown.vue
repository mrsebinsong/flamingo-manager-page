<template>
  <!-- By adding tabIndex attribute,
       we can achieve focus&blur event on a ul tag -->
  <div class="selectbox">
    <ul tabIndex="0"
        class="toggle"
        :class="{active: ulActive}"
        :style="{minWidth: (absoluteWidth)? `${absoluteWidth}px` : '120px' }"
        @blur="selectBoxBlur"
        ref="ul"
    >
      <i class="fas fa-chevron-down"></i>
      <li class="topmost"
          @click.stop="ulActive = !ulActive;"
          ref="topitem"
      >{{ List[0] }}</li>
      <li class="listitem"
          v-for='item in List.slice(1)'
          v-if="item !== selected"
          @click.stop="selectItem(item)"
      >{{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Selectbox",
  data(){
    return {
      ulActive: false,
      selected: null
    };
  },
  props: [ 'List', 'languageOff', 'absoluteWidth', 'initialItem'],
  methods: {
    selectItem(selected){
      this.selected = selected;

      this.$refs.topitem.textContent = selected;
      this.$refs.ul.scrollTop = 0;
      this.ulActive = false;

      this.$emit('select', selected);
    },
    selectBoxBlur(){
      this.ulActive = false;
      this.$refs.ul.scrollTop = 0;
    }
  },
  mounted(){

    if(this.initialItem)
      this.selectItem(this.initialItem);

  }
};
</script>
<style lang="scss">
/* 30px is the default hehight of the selectbox */
$ulHeight: 35px;
$text: #353341;
$active: #fe648c;

div.selectbox {
  width: auto; height: $ulHeight;
}

ul.toggle {
  position: relative;
  display: inline-block;

  height: $ulHeight;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  background-color: #fff;

  &:focus { outline: none; }
  &.active {
    height: auto;
    max-height: $ulHeight * 4;
    overflow-y: auto;
    z-index: 5;

    i { transform: translateY(-50%) rotate(180deg); }
  }

  i {
    position: absolute;
    transform-origin: 50% 50%;
    right: 8px; top: 20px;
    transform: translateY(-50%);
    transition: transform 0.2s ease-out;
    pointer-events: none;
  }

  li {
    display: block;
    height: $ulHeight;

    line-height: $ulHeight;
    text-align: left;
    text-transform: capitalize;

    padding: { left: 15px; right: 45px; }
    cursor: pointer;

    font-size: 14px;
    color: $text;
  }
  li.listitem {
    &:active, &:hover { color: $active; }
  }
}
</style>
