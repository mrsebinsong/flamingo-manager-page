<template>
<div class="urllist">
  <p class="tag">Registered URLs</p>
  <ul class="urllist">

    <li v-if="!list || list.length === 0">
      <span class="url">-&nbsp; none</span>
    </li>
    <li v-else v-for="(url, i) in list"
        :key="`url-${i}`"
    >
     <span class="url">-&nbsp; {{ url }}</span>
     <span class="stop"
           @click.stop="$emit('remove', i)"
     ><i class="far fa-stop-circle"></i></span>
   </li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'URLList',
  data(){
    return {};
  },
  props: ['list']
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.urllist {
  position: relative;
  margin-top: 15px;

  p.tag {
    font: { weight: 800; size: 14px; }
    margin-bottom: 10px;
  }

  ul.urllist li{
    padding: 15px 0;

    span.url {
      font: { weight: 800; size: 14px; style: italic; }
      color: rgba($text,0.6);
      margin-right: 15px;
      word-break: break-all;
    }
    span.stop {
      cursor: pointer;
      color: #fe648c;
      text-shadow: 2px 2px 2px rgba($text, 0.2);

      i { transform: scale(1.3); }
    }
  }

}

</style>
