<template>
<div class="fileinput">

  <input class="fileinput" type="file" ref="input" multiple
         @change="filesFetched"
  />

  <div class="wrapper">
    <p class="text">
      <span class="info"
            @click.stop="tooltipOn = !tooltipOn"
      >{{ textInfo | shorten }}</span>
      <ul class="tooltip"
          :class="{ active: tooltipOn }"
          v-show="fileList.length > 0"
      >
        <li v-for="(item, j) in fileList"
            class="file"
        >
          <span class="name">-&nbsp;&nbsp;{{ item.name }} &nbsp;({{ item.size }})</span>
          <span class="remove"
                @click.stop="removeFileItem(j)">x</span>
        </li>
      </ul>
    </p>
    <button class="selection" @click.stop="selectFiles"><i class="fas fa-folder-open"></i> Select Files</button>
    <button class="upload"
            v-show="fileList.length > 0"
            @click.stop="submit"
    ><i class="fas fa-cloud-upload-alt"></i>Upload</button>
  </div>
  <p class="guide">Only .csv file format is allowed</p>
</div>
</template>
<script>
export default {
  name: 'FileInput',
  data(){
    return {
      fileList: [],
      tooltipOn: false
    };
  },
  computed: {
    textInfo(){
      const listLength = this.fileList.length;
      let fileName;

      if(listLength === 0)
        return '';
      else if(listLength === 1)
        return this.fileList[0].name;
      else
        return `${listLength} files selected`;
    }
  },
  watch: {
    fileList(newVal, oldVal){
      if(newVal.length === 0) this.tooltipOn = false;
    }
  },
  methods: {
    selectFiles(){ this.$refs.input.click(); },
    filesFetched(event){
      let files = event.target.files;
      this.fileList = [];

      for(let i=0; i<files.length; i++){
        this.fileList.push({
          name: files[i].name,
          size: this.fileSizeCalculator(files[i].size)
        });
      }

    },
    removeFileItem(index){ this.fileList.splice(index,1); },
    fileSizeCalculator(size){
      if(size < 100) return `${size} b`
      else if(size < 1000000) return `${(size/1000).toFixed(1)} kb`;
      else return `${(size/1000000).toFixed(1)} mb`;
    },
    submit(){
      let fd = new FormData();

      this.fileList.forEach( (file, index, arr) => {
        fd.append(
          `csvFile${ (arr.length == 1)? '' : index+1 }`,
          file
        );
      });

      for(let val of fd.keys()){
        console.log("fd values: ", fd.get(val));

      }

    }
  },
  filters: {
    shorten(str){
      let short;

      if(str.length >= 20) short = str.slice(0,20) + "...";
      else short = str;

      return short;
    }
  },
  mounted(){

  }
};
</script>
<style lang="scss">
@import '@/scss/variables.scss';

div.fileinput {
  position: relative;

  input.fileinput { display: none; }


  div.wrapper {
    $boxHeight: 35px;

    position: relative;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;

    height: $boxHeight;

    > p.text {
      position: relative;
      height: $boxHeight; width: 250px;

      border: 2px solid rgba($deeppink, 0.5);
      border-right: none;

      background-color: rgba($deeppink, 0.1);
      text-align: center;

      span.info {
        line-height: $boxHeight;
        cursor: pointer;
        font: { size: 13px; family: "Roboto", courier;  weight: bold; }
        color: $deeppink;
      }
    }

    > p.text ul.tooltip {
      position: absolute;
      width: 80%;
      min-height: $boxHeight; max-height: 130px;
      top: 130%; left: 50%;
      transform: translate(-50%, 15%);
      padding: 12px;
      z-index: 3;

      overflow-y: auto;

      background-color: rgba(0,0,0,0.8);
      border-radius: 7px;
      box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15);
      transition: all 0.25s ease-out;

      opacity: 0;
      pointer-events: none;

      &.active {
        opacity: 1;
        pointer-events: all;
        transform: translate(-50%, 0%);
      }

      > li.file {
        position: relative;
        padding-right: 18px;

        color: #fff;
        font: { size: 10px; family: "Roboto", courier;  weight: normal; }
        margin-bottom: 6px;

        &:last-child { margin-bottom: 0px; }

        span.remove {
          position: absolute;
          right: 0; top: 0;
          padding: 0px 4px;
          cursor: pointer;
          font: { size: 13px; weight: bold; }

          &:hover { border: 1px solid rgba(#fff,0.45); }
        }
      }
    }

    > button {
      height: $boxHeight;
      padding: 10px 17px;

      font: { size: 11px; family: "Roboto", courier;  weight: bold; }
      cursor: pointer;

      &:active { transform: translateY(1px); }

      > i { margin-right: 4px; }
    }

    button.selection {
      background-color: #fe648c;
      color: #fff;
    }

    button.upload {
      margin-left: 5px;
      border: 2px solid $deeppink;
      color: $deeppink;
    }

  }

  p.guide {
    margin-top: 8px;
    padding-left: 4px;
    font: { size: 12px; family: "Roboto", courier;  weight: bold; }
    color: rgba($text, 0.55);
    text-decoration: line-through;
  }
}
</style>
