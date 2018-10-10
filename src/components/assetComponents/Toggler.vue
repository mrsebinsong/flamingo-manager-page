<template>
  <div :class="{ toggler: true,
                 on: toggle, off: !toggle }"
        @click.stop="clicked"
  >
    <span class="obj"></span>
  </div>
</template>
<script>
export default {
  name: 'Toggler',
  data(){
    return {
      toggle: null
    };
  },
  props: ['onoff'],
  methods: {
    clicked(){
      this.toggle = !this.toggle;
      this.$emit('toggle', this.toggle);
    }
  },
  mounted(){
    this.toggle = this.onoff;
  }
};
</script>
<style lang='scss'>
div.toggler {
  position: relative;
  display: inline-block;
  width: 55px; height: 20px;

  border-radius: 10px;
  box-shadow: inset 1px 1px 2px 3px rgba(0,0,0,0.075);

  transition: all 0.2s ease-out;
  cursor: pointer;

  &.off { background-color: rgba(#C95454, 0.6); }
  &.on { background-color: rgba(#1A9733, 0.6); }

  span.obj {
    position: absolute;
    display: inline-block;
    width: 30px; height: 30px;
    top: 50%;
    transform: translateY(-50%);

    border-radius: 50%;
    background-color: #fff;

    box-shadow: 2px 2px 7px 3px rgba(0,0,0,0.2);

    transition: left 0.2s ease-out;
  }

  &.off span.obj { left: calc(100% - 30px); }
  &.on span.obj { left: 0px; }
}
</style>
