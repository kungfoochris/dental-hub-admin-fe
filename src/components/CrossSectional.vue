<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Cross-Sectional Measures of Disease</h1>
        <p>
          Graphical representation of Cross-Sectional Measures.
        </p>
      </div>
    </div>

    <div class="row mt-4 text-center">
      <div class="col-12">
        <div class="card shadow">
          <h3 class="mb-3">Cross-Sectional Measures</h3>
          <div class="col-12">
          </div>

          <div class="row mb-3">
            <div class="col-6">
              <h6>Select Start Date:</h6>
              <b-input type="date"/>
            </div>

            <div class="col-6">
              <h6>Select End Date:</h6>
              <b-input type="date"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 col-sm-12 mb-3">
              <!-- <h6>Select Clinic:</h6> -->
              <multiselect
              :options="clinic"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select Clinic"
              label="clinic"
              track-by="clinic"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-md-3 col-sm-12 mb-3">
              <!-- <h6>Select Seminar:</h6> -->
              <multiselect
              :options="seminar"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select Seminar"
              label="seminar"
              track-by="seminar"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-md-3 col-sm-12 mb-3">
              <!-- <h6>Select Outreach:</h6> -->
              <multiselect
              :options="outreach"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select Outreach"
              label="outreach"
              track-by="outreach"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-md-3 col-sm-12 mb-3">
              <!-- <h6>Select Training:</h6> -->
              <multiselect
              :options="training"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Select Training"
              label="training"
              track-by="training"
              :preselect-first="true"
              >
              </multiselect>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 col-sm-12 mb-3">
              <!-- <h6>Select Clinic:</h6> -->
              <multiselect
              :options="clinic"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Indicator Age"
              label="clinic"
              track-by="clinic"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-md-4 col-sm-12 mb-3">
              <!-- <h6>Select Seminar:</h6> -->
              <multiselect
              :options="seminar"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Reason For Visit"
              label="seminar"
              track-by="seminar"
              :preselect-first="true"
              >
              </multiselect>
            </div>

            <div class="col-md-4 col-sm-12 mb-3">
              <!-- <h6>Select Outreach:</h6> -->
              <multiselect
              :options="outreach"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Referral Type"
              label="outreach"
              track-by="outreach"
              :preselect-first="true"
              >
              </multiselect>
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

            <template slot="[type]" slot-scope="data">
              <b>{{ data.item.type }}</b>
            </template>
          </b-table>
          <div class="row pr-4">
            <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
          </div>
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
  name: "CrossSectional",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    'Visualization': Visualization
  },
  computed: {
    ...mapState(['sectionaltable_obj'
  ]),

  basic: function(){
    if(this.$store.state.sectionaltable_obj.length > 0){
      var formattedRecord = []
      this.$store.state.sectionaltable_obj.forEach(function(rec){
        formattedRecord.push({
         type: rec[0],sixyo: rec[1],twelveyo: rec[2],fifteenyo: rec[3],child: rec[4],adult: rec[5], older: rec[6]
       })
      })
      return formattedRecord;

    }else{
      return []
    }

  }

  },

  created(){
    this.listSectionalTable();
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
      type1: "bar",
      type2: "pie",
      isActive: true,
      clinic: [],
      outreach: [],
      seminar: [],
      training: [],

      basicFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'sixyo', label: '6 yo'},
        { key: 'twelveyo', label: '12 yo'},
        { key: 'fifteenyo', label: '15 yo'},
        { key: 'child', label: 'Child'},
        // { key: 'adolescent', label: 'Adolescent'},
        { key: 'adult', label: 'Adult'},
        { key: 'older', label: 'Older Adults'},
      ],
      // basic:[
      //   {type: 'Career Risk', sixyo: '10', twelveyo: '30', fifteenyo: '10', child: '15', adolescent: '15', adult: '40', older: '31'},
      //   // {type: 'M', check: '10', ext: '30', art: '10', seal: '15', sdf: '15', fv: '40', referhp: '31', referhyg: '13', referdent: '12', referdr: '5', referother:'12'},
      //   // {type: 'F', check: '10', ext: '30', art: '10', seal: '15', sdf: '15', fv: '40', referhp: '31', referhyg: '13', referdent: '12', referdr: '5', referother:'12'},
      //   {type: 'Any untreated caries present', sixyo: '50', twelveyo: '20', fifteenyo: '30', child: '15', adolescent: '25', adult: '70', older: '22'},
      //   {type: 'Number of decayed primary teeth', sixyo: '10', twelveyo: '30', fifteenyo: '10', child: '15', adolescent: '15', adult: '40', older: '34'},
      //   {type: 'Number of decayed permanent teeth', sixyo: '10', twelveyo: '30', fifteenyo: '10', child: '15', adolescent: '15', adult: '40', older: '11'},
      //   {type: 'Cavity permanent molar or premolar', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Cavity permanent anterior', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Active infection', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Mouth pain due to reversible pulpitis', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Need ART filling', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Need SDF', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //   {type: 'Need Extraction', sixyo: '80', twelveyo: '110', fifteenyo: '60', child: '60', adolescent: '70', adult: '190', older: '98'},
      //
      // ],

      treatmentFields: [
        { key: 'type', label: '', tdClass: 'font-weight-bold'},
        { key: 'exo', label: 'EXO'},
        { key: 'art', label: 'ART'},
        { key: 'seal', label: 'SEAL'},
        { key: 'sdf', label: 'SDF'},
        { key: 'fv', label: 'FV'},
        { key: 'contact', label: 'Contacts'},
      ],
      treatment:[
        {type: 'By Ward', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '31'},
        {type: 'Clinic', exo: '20', art: '30', seal: '15', sdf: '25', fv: '70', contact: '22'},
        {type: 'Seminar', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '34'},
        {type: 'Outreach', exo: '30', art: '10', seal: '15', sdf: '15', fv: '40', contact: '11'},
        {type: 'Training', exo: '110', art: '60', seal: '60', sdf: '70', fv: '190', contact: '98'},

      ],
    }
  },

  methods:{
    ...mapActions(['listSectionalTable']),


  }
};
</script>

<style lang="scss" scoped>
  @import "../css/index.scss";

</style>
