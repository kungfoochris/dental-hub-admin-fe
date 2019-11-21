<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Treatment Data</h1>
        <p>
          Graphical representation of treatment data.
        </p>
      </div>
    </div>

    <!-- <div class="row mt-4">
      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Bar graph of basic data</h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Month:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-sm-12 mb-3">
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

            <div class="col-lg-4 col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="GenderVisualization">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="uch" :type="type1" :clean-data="userChart"></Visualization>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Bar graph of treatment data</h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Month:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-sm-12 mb-3">
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

            <div class="col-lg-4 col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="Bargraphtreatment">Submit</b-button>
            </div>
          </div>

          <Visualization :tag="uch1" :type="type1" :clean-data="userChart"></Visualization>
        </div>
      </div>
    </div> -->

    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Prevention Ratio</h3>
          <div class="row mt-3">
            <div class="col-lg-10 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-2 col-sm-12 mb-3 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="">Submit</b-button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="preventiveRatio" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Early Intervention Ratio</h3>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="interventionRatio" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12">
        <div class="card shadow">
          <h3 class="mb-3">Line Chart of Recall Percentage</h3>
          <div class="row">
            <div class="col-12">
              <Visualization :tag="perRecall" :type="type1" :clean-data="userChart"></Visualization>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Basic Data</h3>

          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Month:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-sm-12 mb-3">
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

            <div class="col-lg-4 col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="TreatmentBasicDataTable">Submit</b-button>
            </div>
          </div>

          <b-table
          id="user-table"
          show-empty
          :items="basic"
          :fields="basicFields"
          bordered
          responsive
          hover
          >
            <!-- <template slot="S.N." slot-scope="data">
              {{ data.index + 1 + '.' }}
            </template> -->
          </b-table>
          <!-- <div class="row pr-4">
            <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
          </div> -->
        </div>
      </div>
    </div>


    <!-- <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Treatments</h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Month:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-sm-12 mb-3">
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

            <div class="col-lg-4 col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="TreatmentPageTreatmenttable">Submit</b-button>
            </div>
          </div>
          <b-table
          id="user-table"
          show-empty
          :items="treatment"
          :fields="treatmentFields"
          bordered
          responsive
          hover
          >
          </b-table>
        </div>
      </div>
    </div> -->

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Strategic Data</h3>
          <div class="row mt-3">
            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Year:</h6>
              <b-input v-model="Start_Date" type="date"/>
            </div>

            <div class="col-lg-6 col-sm-12 mb-3">
              <h6>Select Month:</h6>
              <b-input v-model="End_Date" type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8 col-sm-12 mb-3">
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

            <div class="col-lg-4 col-12 text-center">
              <h6>Click Here:</h6>
              <b-button variant="custom" block class="mb-4" @click="TreatmentStrategicData">Submit</b-button>
            </div>
          </div>
          <b-table
          id="user-table"
          show-empty
          :items="strategic"
          :fields="strategicFields"
          bordered
          responsive
          hover
          >
            <!-- <template slot="S.N." slot-scope="data">
              {{ data.index + 1 + '.' }}
            </template> -->
          </b-table>
          <!-- <div class="row pr-4">
            <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
          </div> -->
        </div>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Download Reports</h3>
          <div class="row text-center">
            <!-- <div class="col-md-4 col-12">
              <b-dropdown text="Monthly Report" variant="outline-info" class="m-2" dropup>
                <b-dropdown-item href="#">August, 2019</b-dropdown-item>
                <b-dropdown-item href="#">July, 2019</b-dropdown-item>
                <b-dropdown-item href="#">June, 2019</b-dropdown-item>
              </b-dropdown>
            </div> -->

            <div class="col-md-6 col-12">
              <b-dropdown text="Quaterly Report" variant="outline-info" class="m-2" dropup>
                <b-dropdown-item href="#">December, 2018</b-dropdown-item>
                <b-dropdown-item href="#">April, 2019</b-dropdown-item>
                <b-dropdown-item href="#">August, 2019</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="col-md-6 col-12">
              <b-dropdown text="Yearly Report" variant="outline-info" class="m-2" dropup>
                <b-dropdown-item href="#">2019</b-dropdown-item>
                <b-dropdown-item href="#">2018</b-dropdown-item>
                <b-dropdown-item href="#">2017</b-dropdown-item>
              </b-dropdown>
            </div>
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
  name: "Treatment",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['table3_obj','treatment_table_obj','treatmentstrategicdata_obj','geography'
    ]),

    basic: function(){
      if(this.$store.state.table3_obj.length > 0){
        var formattedRecord3 = []
        this.$store.state.table3_obj.forEach(function(rec){
          formattedRecord3.push({
           type: rec[0], male: rec[1], female: rec[2], child: rec[3], adult: rec[4], senior: rec[5], total: rec[6]
         })
        })
        return formattedRecord3;

      }else{
        return []
      }

    },

    treatment: function(){
      if(this.$store.state.treatment_table_obj.length > 0){
        var formattedRecord4 = []
        this.$store.state.treatment_table_obj.forEach(function(rec){
          formattedRecord4.push({
           type: rec[0], male: rec[1], female: rec[2], child: rec[3], adult: rec[4], senior: rec[5], total: rec[6]
         })
        })
        return formattedRecord4;

      }else{
        return []
      }

    },

    strategic: function(){
      if(this.$store.state.treatmentstrategicdata_obj.length > 0){
        var formattedRecord5 = []
        this.$store.state.treatmentstrategicdata_obj.forEach(function(rec){
          formattedRecord5.push({
           type: rec[0], male: rec[1], female: rec[2], child: rec[3], adult: rec[4], senior: rec[5], total: rec[6]
         })
        })
        return formattedRecord5;

      }else{
        return []
      }

    }

  },

  created(){
    this.listTable3();
    this.listTreatmentTable();
    this.listTreatmentStrategicData();
    this.listGeography().then(() => {
      this.updateOptions();})
  },

  data() {
    return {
      // username: '',
      // password: '',
      // text: "Login Form",
      // available: false,
      // show: false,
      // errors: {'auth':''},
      // disabledLogin: true
      userChart: userChart,
      locationChart: locationChart,
      uch:"uch",
      lch:"lch",
      uch1:"uch1",
      preventiveRatio:"preventiveRatio",
      interventionRatio: "interventionRatio",
      perRecall: "perRecall",
      type1: "bar",
      type2: "pie",
      isActive: true,
      errors:[],
      Start_Date:"",
      End_Date:"",
      location:"",
      options: [],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'male', label: 'Male'},
        { key: 'female', label: 'Female'},
        { key: 'child', label: 'Child (< 18Y)'},
        { key: 'adult', label: 'Adult (19Y - 60Y)'},
        { key: 'senior', label: 'Other Adult (>60Y)'},
        { key: 'total', label: 'Total'},
      ],
      // basic:[
      //   {type: 'Number of Cavities Prevented', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},
      //   {type: 'Contacts', male: '10', female: '30', child: '10', adult: '15', senior: '15', total: '40'},

      // ],

      treatmentFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'male', label: 'Male'},
        { key: 'female', label: 'Female'},
        { key: 'child', label: 'Child (< 18Y)'},
        { key: 'adult', label: 'Adult (19Y - 60Y)'},
        { key: 'senior', label: 'Other Adult (>60Y)'},
        { key: 'total', label: 'Total'},
      ],
      // treatment:[
      //   {type: 'EXO', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},
      //   {type: 'ART', male: '10', female: '30', child: '10', adult: '15', senior: '15', total: '40'},
      //   {type: 'SEAL', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},
      //   {type: 'SDF', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},
      //   {type: 'FV', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},

      // ],

      strategicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'male', label: 'Male'},
        { key: 'female', label: 'Female'},
        { key: 'child', label: 'Child (< 18Y)'},
        { key: 'adult', label: 'Adult (19Y - 60Y)'},
        { key: 'senior', label: 'Other Adult (>60Y)'},
        { key: 'total', label: 'Total'},
      ],
      // strategic:[
      //   {type: 'Preventive Ratio', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},
      //   {type: 'Early Intervention Ratio', male: '10', female: '30', child: '10', adult: '15', senior: '15', total: '40'},
      //   {type: '% Recall', male: '50', female: '20', child: '30', adult: '15', senior: '25', total: '70'},

      // ]
    }
  },

  methods:{
    ...mapActions(['listTable3','listTreatmentTable','listTreatmentStrategicData','listGeography']),

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
          this.$store.dispatch("CreateTreatmentPageBarVisualization",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
      )
    },

    GenderVisualization(){
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
          this.$store.dispatch("CreateTreatmentPageGenderVisualization",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
      )
    },

    TreatmentBasicDataTable(){
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
          this.$store.dispatch("CreateTreatmentBasicDataTable",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
      )
    },

    TreatmentPageTreatmenttable(){
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
          this.$store.dispatch("CreateTreatmentPageTreatmentTable",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
      )
    },

    TreatmentStrategicData(){
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
          this.$store.dispatch("CreateTreatmentStrategicData",{'start_date':this.Start_Date,'end_date':this.End_Date,"location":this.location.language})
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


  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
