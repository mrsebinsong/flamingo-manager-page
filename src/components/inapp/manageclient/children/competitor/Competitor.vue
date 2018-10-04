<template>
<div id="competitor">
  <CompetitorList :list="competitorNames"
                  :activelist="activeList"
  />
  <content>
    <Content />
  </content>
</div>
</template>
<script>
import CompetitorList from '@/components/assetComponents/CompetitorList';
import Content from './Content_Competitor';


export default {
  name: 'Competitor',
  data(){
    return {
      competitorNames: null, activeList: null
    };
  },
  components: { CompetitorList, Content },
  computed: {
    competitorsData(){ return this.$store.state.currentClient.competitors; }
  },
  methods: {
    slugify(str){
      return str.toLowerCase().replace(/\s+/g, "");
    }
  },
  created(){
    let nameList = [], activeList = {};

    this.competitorsData.forEach( (item, index) => {
      nameList.push(item.name);
      activeList[ this.slugify(item.name) ] = (index === 0)? true : false;
    });

    this.competitorNames = nameList;
    this.activeList = activeList;
  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div#competitor {

  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  content {
    position: absolute;
    width: 100%; height: calc(100% - #{$competitor_listHeight});
    bottom: 0; left: 0;

    overflow-y: auto;
  }
}
</style>
