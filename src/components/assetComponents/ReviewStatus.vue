<template>
<div class="reviewstatus">
  <ul class="list">
    <li class="listitem"
        v-for="(value, key) in reviewFields"
        :key="key">
      <span>{{ key }}</span>

      <Toggler :onoff="value"
               class="reviewtoggle" />
    </li>
  </ul>
</div>
</template>
<script>
import Toggler from '@/components/assetComponents/Toggler';

export default {
  name: 'ReviewStatus',
  data(){
    return {
      toggle: true
    };
  },
  props: ['reviewFields'],
  components: { Toggler }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.reviewstatus {

  ul.list {
    margin-bottom: 25px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  ul.list li.listitem {
    min-height: 40px;
    line-height: 40px;

    margin-right: 30px;

    font: { family: 'Roboto', courier; weight: 800;
            size: 17px; }

    text-transform: capitalize;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.15);
    color: rgba($text, 0.8);

    display: flex;
    align-items: center;

    .reviewtoggle { margin-left: 20px; }
  }
}
</style>
