<template>
<div class="fileinput">

  <input class="fileinput" type="file" ref="input"
         @change="filesFetched" accept=".csv, .xlsx"
  />

  <div class="wrapper">
    <p class="text">
      <span class="info"
            @click.stop="emitFileSelectEvent"
      >{{ textInfo | shorten }}</span>
      <span class="clearinput"
            v-if="fileList.length > 0"
            @click.stop="clearInput">
        <i class="fas fa-times"></i>
      </span>
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
  <p class="guide">.csv, .xlsx are the only file formats allowed</p>
</div>
</template>
<script>
import Papa from 'papaparse';

export default {
  name: 'FileInput',
  data(){
    return {
      fileList: [],
      tooltipOn: false,
      fileTextArr: []
    };
  },
  props: [ 'path', 'wholepath' ],
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
    },
    clientId(){ return this.$store.state.clientId; },
    currentClient(){ return this.$store.state.currentClient; }
  },
  watch: {
    fileList(newVal, oldVal){
      if(newVal.length === 0) this.tooltipOn = false;
    }
  },
  methods: {
    selectFiles(){ this.$refs.input.click(); },
    clearInput(){

      this.$refs.input.value = '';
      this.fileList = [];
    },
    filesFetched(event){

      let { files } = event.target;
      const reader = new FileReader();

      if(files.length === 0) return;

      this.fileList = [];

      for(let i=0; i<files.length; i++){

        this.fileList.push({
          name: files[i].name,
          size: this.fileSizeCalculator(files[i].size),
          content: files[i]
        });

      }

      this.csvToJSON();
    },

    csvToJSON(){
        let fileParseArr =
        this.fileList.map(

          file => new Promise((resolve, reject) => {

            Papa.parse( file.content, {
              header: true, trimHeader: true,
              encoding: "UTF-8",
              complete(result){

                if(result.data){
                  console.log("result.data(csvToJSON, FileInput.vue): ", result.data);
                  file.data = result.data.slice(0, 101);
                  resolve(file);
                }
                else reject(new Error("csv parsing has failed."));
              }
            });

          })
        ); // this.fileList.map()

      Promise.all(fileParseArr)
      .then( results => {
        this.emitFileSelectEvent();
      })
      .catch( err => { console.log("Something went wrong during parsing csvs."); });
    }, // csvToJSON()

    emitFileSelectEvent(){
      this.$emit('fileSelect', {
        fileList: this.fileList,
        path: this.path || this.wholepath
      });
    },
    removeFileItem(index){ this.fileList.splice(index,1); },

    fileSizeCalculator(size){
      if(size < 100) return `${size} b`
      else if(size < 1000000) return `${(size/1000).toFixed(1)} kb`;
      else return `${(size/1000000).toFixed(1)} mb`;
    },

    submit(){

      let fd = new FormData();

      fd.append('id', this.clientId);
      fd.append('company', this.currentClient.sale.company);
      fd.append('file', this.fileList[0].content);

      return;

      if(this.path)
        this.$store.dispatch('uploadFile', {
          path: this.path, data: fd
        })
        .then( response => {
          this.clearInput();
          console.log("succeeded response(FIleInput.vue): ", response);
        })
        .catch( err => { console.log("err; ", err); });
      else if(this.wholepath){

        console.log("the wholepath: ", this.wholepath);
        this.$tore.dispatch('uploadSalesAndMenuFile', {
          path: this.wholepath. data.fd
        })
        .then( response => {
          this.clearInput();
          console.log("succeeded response(FIleInput.vue, this.wholepath): ", response);
        })
        .catch( err => { console.log("upload err(FileInput.vue this.wholepath): ", err); });

      }
      else
        console.log("path is not given. Formdata: ", fd);
    },

    initializeSetting(){

      this.$refs.input.value = '';
      this.fileList = [];
      this.tooltipOn = false;
      this.fileTextArr = [];

      this.$store.commit('clearFileInput', false);
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

      span.info, span.clearinput {
        line-height: $boxHeight;
        cursor: pointer;
        font: { size: 13px; weight: bold; }
        color: $deeppink;
      }
    }

    > p.text span.clearinput {
      position: absolute;
      top: 50%; right: 15px;
      transform: translateY(-50%);

      cursor: pointer;
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
        font: { size: 10px; weight: normal; }
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

      font: { size: 11px; weight: bold; }
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
  }
}

</style>
