<template>
<div class="fileinput">
  <input type="file" ref="input" multiple />
  <button @click.stop="submit">submit</button>
</div>
</template>
<script>
export default {
  name: 'FileInput',
  data(){
    return {

    };
  },
  mthods: {
    submit(){}
  },
  mounted(){

  }
};
</script>
<style lang="scss">
div.fileinput {
  position: relative;


  input {
    padding: 5px;
    border-bottom: 1px dashed rgba(180,20,25,0.3);
  }
  button {
    margin-left: 10px;
    padding: 10px 22px;
    background-color: #fe648c;

    font: { size: 11px; family: "Roboto", courier;  weight: bold; }
    color: #fff;
    box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.15);
    cursor: pointer;

    &:active { transform: translateY(1px); }
  }
}
</style>
