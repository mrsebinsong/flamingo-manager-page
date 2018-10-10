<template>
<div class="loading_jumpingpill">
	<div class="pill"><span class="_1"></span><span class="_2"></span></div>
	<div class="shadow"></div>
</div>
</template>
<script>
export default {
  name: 'LoadingAnimation',
  props: ['width', 'bgColor'],
  data(){
    return {

    };
  }
}
</script>
<style lang="scss">
div.loading_jumpingpill {
  position: relative;
  height: 60px; width: 60px;
  margin-top: 10px;
  overflow: hidden;

  > div.pill {
    position: absolute;
    height: 60%; width: 25%;

    bottom: 0; left: calc(50% - 12.5%);
    transform-origin: 50% 50%;

    animation: jumpingpill 0.7s linear infinite;

    span {
      display: block;
      width: 100%; height: 50%;

      &._1 {
        border: none; border-radius: 50% 50% 0 0;
        background-color: #000;
      }
      &._2 {
        border: 2px solid #000; border-radius: 0 0 50% 50%;
        border-top: none;
        background-color: transparent;
      }
    }

  }

  div.shadow {
    height: 5%; width: 20%;
    border: none; border-radius: 100%;
    background-color: rgba(0,0,0,1);
    opacity: 0.3;
    position: absolute;
    bottom: 5%; left: 50%;
    transform: translateX(-50%);

    animation: jumpingpill_shadow 0.7s linear infinite;
  }
}

@keyframes jumpingpill {
  0%{ height: 60%; bottom: 10%; transform: rotate(0deg);}
  25% { height: 80%; bottom: 40%;} 50% { height: 60%; bottom: 10%; }
  75% { height: 80%; bottom: 40%;} 100% { height: 60%; bottom: 10%; transform: rotate(360deg);}
}
@keyframes jumpingpill_shadow {
  0%{height: 5%; width: 20%; opacity: 0.3; }
  25%{height: 0%; width: 50%; opacity: 0; }
  50%{height: 5%; width: 20%; opacity: 0.3; }
  75%{height: 0%; width: 50%; opacity: 0; }
  100%{height: 5%; width: 20%; opacity: 0.3; }
}
</style>
