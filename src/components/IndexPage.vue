<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Dashboard</h1>
        <p>
          Dashboard of Dental Hub.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-4">Filter Data</h3>

          <div class="row">
            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Select Start Date:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Select End Date:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>

            <div class="col-lg-4 col-sm-12 mb-4">
              <h6>Location:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
              <!-- <multiselect
              v-model="location"
              :options="options"

              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect> -->
            </div>
          </div>

          <div class="row">
            <div class="col-lg-10 col-sm-12">
              <h6>Select Activities:</h6>
              <b-form-group>
                <b-form-checkbox-group
                v-model="checkbox_selected"
                :options="checkbox_options"
                switches
                size="lg"
                ></b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="col-lg-2 col-sm-12">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="OverviewTable">Submit</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Overview</h3>
          <b-table
          id="user-table"
          show-empty
          :items="basic"
          :fields="basicFields"
          bordered
          responsive
          hover
          >
          </b-table>
          <div class="row pr-4">
            <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
          </div>
        </div>
      </div>
    </div>

    <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Overview filter required error</strong>
      </div>
      <div v-if="errors.Start_Date">
        <p>{{ errors.Start_Date }}</p>
      </div>
      <div v-if="errors.End_Date">
        <p>{{ errors.End_Date }}</p>
      </div>
      <div v-if="errors.location">
        <p>{{ errors.location }}</p>
      </div>
    </b-toast>


    <div class="row mt-4">
      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Bar graph of treatment type</h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Start Date:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select End Date:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Location:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Age Group:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Age Groups"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-12 text-center justify-content-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" class="mb-4" @click="Bargraphtreatment">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="settingsgraph" :type="type1"></Visualization>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Pie Chart of contacts by Activity</h3>

          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Start Date:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select End Date:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Location:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Treatment Type:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Treatment Types"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" class="mb-4" @click="Bargraphtreatment">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="piechart"></Visualization>
        </div>
      </div>
    </div>


    <div class="row mt-4 text-center table-area">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Treatment by Activity</h3>
            <b-table
              id="treatments-table"
              show-empty
              :items="treatmentTableItemsActivity"
              :fields="basicFields"
              bordered
              responsive
              hover
            >
            </b-table>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center table-area">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Treatment by Ward</h3>
            <b-table
              id="treatments-table"
              show-empty
              :items="treatmentTableItemsWard"
              :fields="basicFields"
              bordered
              responsive
              hover
            >
            </b-table>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Line graph of number of contacts by month by Ward</h3>
          <div class="row mt-3">
            <div class="col-lg-10 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-2 col-sm-12 mb-3 text-center">
              <!-- <h6>Location:</h6>
              <multiselect
              v-model="location"
              :options="options"
              :preserve-search="true"
              placeholder="Select Location"
              label="name"
              track-by="name"
              :preselect-first="true"
              >
              </multiselect> -->
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="WardLineVisualization">Submit</b-button>
            </div>
          </div>
          <Visualization :tag="lch6" :type="type2" :clean-data="locationChart"></Visualization>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
import Visualization from './Visualization';
import userChart from '../js/userchart.js';
import locationChart from '../js/locationchart.js';

// const axios = require('axios');
export default {
  name: "IndexPage",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['overview_obj','treatment_by_activity_obj','treatment_by_ward_obj', 'geography','activities_obj'
    ]),

    basic: function(){
      if(this.$store.state.overview_obj.length > 0){
        var formattedRecord = []
        this.$store.state.overview_obj.forEach(function(rec){
          formattedRecord.push({
           type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12]
          })
        })
        return formattedRecord;

      }else{
        return []
      }
    },

    treatmentTableItemsActivity: function(){
      if(this.$store.state.treatment_by_activity_obj.length > 0){
        var formattedRecord1 = []
        this.$store.state.treatment_by_activity_obj.forEach(function(rec){
          formattedRecord1.push({
           type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12]
          })
        })
        return formattedRecord1;

      }else{
        return []
      }
    },

    treatmentTableItemsWard: function(){
      if(this.$store.state.treatment_by_ward_obj.length > 0){
        var formattedRecord2 = []
        this.$store.state.treatment_by_ward_obj.forEach(function(rec){
          formattedRecord2.push({
           type: rec[0], check: rec[1], ext: rec[2], art: rec[3], seal: rec[4], sdf: rec[5],fullmouthsdf:rec[6], fv: rec[7], referhp: rec[8], referhyg: rec[9], referdent: rec[10], referdr: rec[11], referother:rec[12]
          })
        })
        return formattedRecord2;

      }else{
        return []
      }
    },




    // treatment: function(){
    //   if(this.$store.state.treatment_by_activity_obj.length > 0){
    //     var formattedRecord1 = []
    //     this.$store.state.treatment_by_activity_obj.forEach(function(rec){
    //       formattedRecord1.push({
    //        type: rec[0], exo: rec[1], art: rec[2], seal: rec[3], sdf: rec[4], fv: rec[5], contact: rec[6]
    //      })
    //     })
    //     return formattedRecord1;
    //
    //   }else{
    //     return []
    //   }
    //
    // }

  },

  created(){
    this.listOverview();
    this.listTreatmentbyActivity();
    this.listTreatmentbyWard();
    this.listGeography().then(() => {
      this.updateOptions();})

    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();})
  },

  data() {
    return {
      Start_Date:"",
      End_Date:"",
      userChart: userChart,
      locationChart: locationChart,
      uch:"uch",
      settingsgraph: "settingsgraph",
      lch:"lch",
      type1: "bar",
      piechart: "piechart",
      type2: "pie",
      lch6:"lch6",
      errors:[],
      isActive: true,
      location: "",
      options: [],

      checkbox_selected: [], // Must be an array reference!
      checkbox_options: [],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'check', label: 'Check'},
        { key: 'ext', label: 'EXT'},
        { key: 'art', label: 'ART'},
        { key: 'seal', label: 'SEAL'},
        { key: 'sdf', label: 'SDF'},
        { key: 'fullmouthsdf', label: 'Full Mouth SDF'},
        { key: 'fv', label: 'FV (ppl)'},
        { key: 'referhp', label: 'Refer HP'},
        { key: 'referhyg', label: 'Refer Hyg'},
        { key: 'referdent', label: 'Refer Dent'},
        { key: 'referdr', label: 'Refer Dr'},
        { key: 'referother', label: 'Refer Other'},
      ],

      // treatmentTableItemsActivity:[
      //   {type: 'Clinic', check: '35', ext: '1', art: '1', seal: '0', sdf: '0', fv: '20', refer: '17'},
      //   {type: 'Seminar', check: '35', ext: '1', art: '1', seal: '0', sdf: '0', fv: '20', refer: '17'},
      //   {type: 'Outreach', check: '35', ext: '1', art: '1', seal: '0', sdf: '0', fv: '20', refer: '17'},
      //   {type: 'Training', check: '35', ext: '1', art: '1', seal: '0', sdf: '0', fv: '20', refer: '17'},
      // ],

      // treatmentTableItemsWard:[
      //   {type: 'Ward 1', check: '4', ext: '1', art: '0', seal: '0', sdf: '0', fv: '0', refer: '3'},
      //   {type: 'Ward 2', check: '0', ext: '0', art: '0', seal: '0', sdf: '0', fv: '0', refer: '0'},
      //   {type: 'Ward 3', check: '0', ext: '0', art: '0', seal: '0', sdf: '0', fv: '0', refer: '0'},
      //   {type: 'Ward 4', check: '4', ext: '1', art: '0', seal: '0', sdf: '0', fv: '0', refer: '3'},
      // ]
    }
  },

  methods:{
    ...mapActions(['listOverview','listTreatmentbyActivity','listGeography','listActivitie','listTreatmentbyWard']),

    OverviewTable(){
      var l=[0,0,0,0]
      var a=0
      this.checkbox_selected.forEach(function(e){
          l[a]=e;
          a++;
      })
      this.errors=[]
      if(this.Start_Date==''){
        this.errors['Start_Date']="Start date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.End_Date==""){
        this.errors['End_Date']="End date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.location==""){
        this.errors['location']="Location required."
        this.$bvToast.show('error-toast');
      }
      else(
          this.$store.dispatch("CreateOverViewVisualization",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language,"health_post":l[0],"seminar":l[1],"outreach":l[2],"training":l[3]})
      )


    },

    Bargraphtreatment(){
      this.errors=[]
      if(this.Start_Date==''){
        this.errors['Start_Date']="Start date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.End_Date==""){
        this.errors['End_Date']="End date required."
        this.$bvToast.show('error-toast');
      }
      else if(this.location==""){
        this.errors['location']="Location required."
        this.$bvToast.show('error-toast');
      }
      else(
          this.$store.dispatch("CreateTreatmentBarVisualization",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
      )


    },

    WardLineVisualization(){
      this.errors=[]
      if(this.Start_Date==''){
        this.errors['Start_Date']="Start date required."
        this.$bvToast.show('error-toast');
      }
      else(
          this.$store.dispatch("CreateWardLineVisualization",{'start_date':this.Start_Date})
      )


    },







    updateOptions(){
      var geography_data=[]
      if (this.geography.length>0){
        this.geography.forEach(function(geography_obj){
            geography_data.push({'name':geography_obj.name,'language':geography_obj.id})
        })
        this.options = geography_data
      }

    },

    checkbox_optionsupdate(){
      var activities_data=[]
      if (this.activities_obj.length>0){
        this.activities_obj.forEach(function(activity){
            activities_data.push({'text':activity.name,'value':activity.id})
        })
        this.checkbox_options = activities_data
      }

    },



  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
