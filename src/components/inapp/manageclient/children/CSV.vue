<template>
<div id="csv" ref="outermost">
  <div class="section sales">
    <p class="tag">[ SALES ]</p>
    <div class="field closeddays">
      <p class="fieldname">Closed Days: </p>
      <MultipleSelector :list="weekdays"
                        :initialSelected="closedDaysInitial"
                        @select="salesClosedDaysChange"
                        />
    </div>
    <div class="field">
      <p class="fieldname">Company Name: </p>
      <input type="text" class="inlineinput"
             placeholder="Company Name"
             v-model="sales.company"
             @input="salesCompanyNameChange"
      />
    </div>
    <div class="field">
      <p class="fieldname">On: </p>
      <Toggler  :onoff="clientSalesData.on"
                :disable="false"
                @toggle="salesOnOffChange"
      />
    </div>
    <div class="field">
        <FileInput :path="'file/sales'"
                   @fileSelect="filePreview"
        />
    </div>
  </div>

  <div class="section menu">
    <p class="tag">[ MENU ]</p>
    <div class="field">
      <p class="fieldname">Company Name: </p>
      <input type="text" class="inlineinput"
             placeholder="Company Name"
             v-model="menu.company"
             @input="menuCompanyNameChange"
      />
    </div>
    <div class="field">
      <p class="fieldname">Main Category: </p>
      <input type="text" class="inlineinput"
             placeholder="Main Category"
             v-model="menu.mainCategory"
             @input="menuMainCategoryChange"
      />
    </div>
    <div class="field">
      <p class="fieldname">On: </p>
      <Toggler  :onoff="menu.on"
                :disable="false"
                @toggle="menuOnOffChange"
      />
    </div>
    <div class="field">
      <p class="fieldname">toRemoveItems: </p>
      <FiltersForm :data="menu.toRemoveItems"
                   @listChange="menuToRemoveItemsChange"/>
    </div>
    <div class="field">
      <p class="fieldname">menu/top-low: </p>
      <FileInput :path="'file/menu/top-low'"
                 @fileSelect="filePreview"
      />
    </div>
    <div class="field">
        <p class="fieldname">menu/match: </p>
      <FileInput :path="'file/menu/match'"
                 @fileSelect="filePreview"
      />
    </div>
    <div class="field">
        <p class="fieldname">menu/prediction: </p>
      <FileInput :path="'file/menu/prediction'"
                 @fileSelect="filePreview"
      />
    </div>
  </div>

  <div class="section">
    <p class="tag">[ SALE + MENU ]</p>
    <FileInput @fileSelect="filePreview"
               :path="'file/raw'"/>
  </div>

  <div class="section">
    <p class="tag">[ RISK ]</p>
    <div class="field">
      <p class="fieldname">closedDays: </p>
      <MultipleSelector :list="weekdays"
                        @select="riskClosedDaysChange"
                        />
    </div>
    <FileInput @fileSelect="filePreview"m/>
  </div>

  <div id="csvpreview" v-if="previewOn">
    <div v-for="(csv, i) in csvList" class="csvfile">
      <p class="filename"><span>FileName:</span>{{ csv.name }}</p>
      <p class="filesize"><span>Size:</span>{{ csv.size }} <span class="filepath">Path: </span>{{ currentPath }}</p>
      <p class="filecontent">File Content ( displays 100 rows at maximum )</p>
      <ul class="previewtable" v-if="csv.data">
        <li class="trow header">
          <span v-for="(value, key) in csv.data[0]"
              :key="`header-${key}`"
              class="header"
          >{{ key }}</span>
        </li>
        <li class="trow data"
            v-for="(row, rowi) in csv.data"
            :key="`csvrow-${rowi}`"
        >
          <span class=""
              v-for="(value, key) in row"
              :key="`row-${rowi}-${key}`"
          >{{ value }}</span>
        </li>
      </ul>
    </div>

    <div class="previewbtn">
      <span v-if="!requestSent"
            class="filesend"
            @click.stop="uploadFile"><i class="fas fa-cloud-upload-alt"></i>Send</span>
      <span class="feedback" v-if="requestSent">{{ feedback }}</span>
      <span class="previewclose"
            @click.stop="closePreview"><i class="fas fa-times"></i></span>
    </div>
  </div>
</div>
</template>
<script>
import FileInput from '@/components/assetComponents/FileInput';
import FiltersForm from '@/components/assetComponents/FiltersForm';
import Toggler from '@/components/assetComponents/Toggler';
import MultipleSelector from '@/components/assetComponents/MultipleSelector';

import Dataset from '@/../static/js/eventData.js';
import { compareArrays } from '@/../static/js/helperFunctions.js';

export default {
  name: 'CSV',
  data(){
    return {
      csvList: null,
      previewOn: false,
      currentPath: '',

      requestSent: false,
      feedback: 'Uploading...',

      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      sales: {
        closedDays: [],
        company: '',
        on: false
      },

      menu: {
        company: '',
        mainCategory: '',
        on: false,
        toRemoveItems: []
      },

      risk: {
        closedDays: []
      }

    };
  },
  computed: {
    clientId(){ return this.$store.state.clientId; },
    clientSalesData(){ return this.$store.state.currentClientCopy.sale },
    clientMenuData(){ return this.$store.state.currentClientCopy.menu },

    closedDaysInitial(){
      let retArr = [], arrFrom;
      let map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      arrFrom = this.clientSalesData.closedDays;

      if(arrFrom && arrFrom.length > 0)
          retArr = arrFrom.map( d => map[d] );

      return retArr;
    },

    updateButtonOn(){ return this.$store.state.updateButtonOn; }
  },
  components: { FileInput, MultipleSelector, Toggler, FiltersForm },
  methods: {
    initForms(){

      if(this.clientSalesData){
        this.sales.closedDays = this.clientSalesData.closedDays.slice();
        this.sales.company = this.clientSalesData.company;
        this.sales.on = this.clientSalesData.on;
      }

      if(this.clientMenuData){
        this.menu.company = this.clientMenuData.company;
        this.menu.mainCategory = this.clientMenuData.mainCategory;
        this.menu.on = this.clientMenuData.on;
        this.menu.toRemoveItems = this.clientMenuData.toRemoveItems.slice();
      }
    },
    filePreview({ fileList, path }){

      this.csvList = fileList;
      this.previewOn = true;
      this.currentPath = path;

      this.$refs.outermost.scrollTop = 0;
    },
    closePreview(){
      this.previewOn = false;
      this.requestSent = false;
      this.feedback = 'Uploading...';

    },
    uploadFile(){

      let fd = new FormData();

      fd.append('id', this.clientId);
      fd.append('company', this.company || this.clientSalesData.company);
      fd.append('file', this.csvList[0].content);

      if(this.currentPath){

        this.$store.dispatch('uploadFile', {
          path: this.currentPath, data: fd
        })
        .then( response => {
          console.log("succeeded response(CSV.vue): ", response);
          this.feedback = 'File upload was successfully done.';
        })
        .catch( err => {
          for(let key in err){
            console.log(`err[${key}](CSV.vue): `, err[key]);
          }

          this.feedback = 'Error: Something went wrong.';
        });

        this.requestSent = true;
      }
      else
        console.log("path is not given(CSV.vue). Formdata: ", fd);

    },


    salesClosedDaysChange(newArr){
      let map = {
        'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
      };

      this.sales.closedDays = (newArr.length === 0)? [] :
                          newArr.map( d => map[d] );


        if(!compareArrays(this.sales.closedDays, this.clientSalesData.closedDays))
          this.commitChange('sales');

    },

    riskClosedDaysChange(newArr){
      let map = {
        'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6
      };

      this.risk.closedDays = (newArr.length === 0)? [] :
                          newArr.map( d => map[d] );
    },
    salesCompanyNameChange(){
      if(this.sales.company === '') this.sales.company = null;

    if(this.clientSalesData.company !== this.sales.company)
        this.commitChange('sales');

    },
    salesOnOffChange(changed){
      this.sales.on = changed;

      if(this.clientSalesData.on !== this.sales.on)
        this.commitChange('sales');
    },

    menuCompanyNameChange(){
      if(this.menu.company === '')
        this.menu.company = null;

      if(!this.clientMenuData)
        this.commitChange('menu');
      else if(this.clientMenuData.company !== this.menu.company)
        this.commitChange('menu');
    },
    menuOnOffChange(changed){
      this.menu.on = changed;

      if(!this.clientMenuData)
        this.commitChange('menu');
      else if(this.clientMenuData.on !== this.menu.on)
        this.commitChange('menu');
    },
    menuMainCategoryChange(){
      if(this.menu.mainCategory === '')
        this.menu.mainCategory = null;

      if(!this.clientMenuData)
        this.commitChange('menu');
      else if(this.clientMenuData.mainCategory !== this.menu.mainCategory)
        this.commitChange('menu');
    },
    menuToRemoveItemsChange(changed){

      this.menu.toRemoveItems = changed.slice();

      if(!this.clientMenuData)
        this.commitChange('menu');
      else if(!compareArrays(this.menu.toRemoveItems,
              this.clientMenuData.toRemoveItems))
        this.commitChange('menu');
    },

    commitChange(key){

      let ObjToSend = {}, payload, fieldList;
      let keyToSend = { 'menu': 'menu', 'sales': 'sale' };

      fieldList = {
        'sales': ['closedDays', 'company', 'on'],
        'menu': ['company', 'toRemoveItems', 'on', 'mainCategory']
      };

      fieldList[key].forEach( field => {
        ObjToSend[field] = this[key][field];
      });

      payload = { isSocial: false, key: keyToSend[key], value: ObjToSend };

      this.$store.commit('updateCurrentClient', payload);

      if(!this.updateButtonOn)
        this.$store.commit('updateButtonOnOff', true);

    }

  },

  mounted(){
    this.eventList = Dataset;
    this.initForms();

  }
};
</script>
<style lang="scss">
@import '@/scss/mixins.scss';
@import '@/scss/variables.scss';

div#csv {
  position: absolute;
  width: 100%; height: 100%;
  left: 0; top: 0;

  overflow-x: hidden;
  overflow-y: auto;

  > div.section {

    position: relative;
    padding: 40px 30px;
    border-top: 1px solid #ddd;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > * { font-family: 'Roboto', courier; }

    > p.tag {
      font-size: 13px;
      font-weight: bold;
      color: $text;
      letter-spacing: 1px;

      margin-top: 15px;
      margin-bottom: 40px;
    }

    > div.field {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      margin-bottom: 25px;

      p.fieldname {
        margin-right: 20px;

        font: { size: 12px; weight: bold; }
        letter-spacing: 1px;
      }
    }

    input.inlineinput {
      border: none;
      border-bottom: 1px solid rgba(#000, 0.8);
      padding: 8px;
      width: 150px;
      color: $text;

      &::placeholder {
        color: rgba(0,0,0,0.5);
        font-style: italic;
      }
    }

  }


  div#csvpreview {
    @include absoluteCenter;

    width: 60%; min-width: 350px;
    height: 70%; min-height: 450px;
    padding: 70px 30px 25px 30px;
    overflow-x: hidden;
    overflow-y: auto;

    background-color: #fff;
    box-shadow: 5px 5px 25px 6px rgba(0,0,0,0.1);

    opacity: 0;
    animation: previewIntro 0.4s ease-out 1;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;


    div.csvfile {
      position: relative;
      border: 1px solid rgba(0,0,0,0.3);

      > p.filename, > p.filesize {

        color: $text;
        font-size: 14px;
        font-weight: bold;
        background-color: #f2f2f2;
        > span {

          font-size: 12px;
          display: inline-block;
          letter-spacing: 1px;
          margin-right: 13px;
          color: #068587;
        }

        > span.filepath { margin-left: 20px; }
      }

      > p.filename { padding: 20px 25px 8px 25px; }
      > p.filesize {
        padding: 0px 25px 20px 25px;
        border-bottom: #666;
        margin-bottom: 20px;
      }
      > p.filecontent {
        position: relative;
        margin-bottom: 15px;
        color: $text;
        font: { size: 12px; weight: bold; }
        padding: 0px 25px;
      }

      ul.previewtable {
        position: relative;
        width: calc(100% - 20px*2);
        margin: 0px 20px 20px;
        color: $text;

        max-height: 200px;
        overflow: auto;

        > li {
          padding: 8px 12px;
          font-size: 12px;

          display: flex;
          flex-direction: row;

          &:not(:first-of-type){ border: 1px solid #c2c2c2; }
        }
        > li.header {
          background-color: $text;
          color: #fff;
        }


        li > span {
          padding: 5px;
          overflow: hidden;
          display: inline-block;
          width: 150px;
        }
      }
    }

    div.previewbtn {
      position: absolute;
      right: 0; top: 0;
      margin: { right: 30px; top: 20px; }

      display: flex;
      align-items: center;
      justify-content: flex-end;

      span {
        display: inline-block;
        height: 30px; line-height: 30px;
        padding: 0 10px;
        cursor: pointer;

        font: { size: 14px; weight: bold; }

        &:active { transform: translateY(1px); }
      }

      > span.filesend {
        background-color: $deeppink;
        color: #fff;
        margin-right: 10px;
        border-radius: 3px;

        > i { margin-right: 6px; }
      }

      > span.feedback {
        color: $deeppink;

      }

      > span.previewclose {
        background-color: #fff;
        border: 2px solid $deeppink;
        color: $deeppink;
      }
    }

  }

  @keyframes previewIntro {
    0% { opacity: 0; transform: translate(-40%, -50%); }
    100% { opacity: 1; transform: translate(-50%, -50%); }
  }
}
</style>
