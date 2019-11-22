<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Longitudinal Measures of Disease</h1>
        <p>
          Graphical representation of Longitudinal Measures.
        </p>
      </div>
    </div>

    <b-tabs class="mt-4" pills>
      <b-tab :title="sample_frame[0]" active>
        <!-- <b-card-text> -->
          <div class="row mt-4 text-center">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3">Filter Data of {{ this.sample_frame [0] }}</h3>
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
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">Longitudinal Measures for {{ this.sample_frame [0] }}</h3>

                <!-- <b-table
                id="user-table"
                show-empty
                :items="longitudinalItems"
                :fields="longitudinalFields"
                bordered
                responsive
                hover
                >
                  <template slot="[type]" slot-scope="data">
                    <b>{{ data.item.type }}</b>
                  </template>
                </b-table> -->
                <b-table-simple hover responsive>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col/>
                    <col />
                    <col />
                  </colgroup>
                  <b-thead head-variant="dark">
                    <b-th class="text-center" v-for="fields in longitudinalFields">{{ fields.label }}</b-th>
                  </b-thead>

                  <b-tbody>
                    <b-tr v-for="items in longitudinalItems">
                      <th v-html="items.type"> {{ items.type }} </th>
                      <td class="text-center"> {{ items.tw1 }} </td>
                      <td class="text-center"> {{ items.tw2 }} </td>
                      <td class="text-center"> {{ items.realDifference }} </td>
                      <!-- <td class="text-center align-middle" rowspan="4" v-if="items.realDifference"> {{ items.realDifference }} </td> -->
                      <!-- <td class="text-center align-middle" v-else></td> -->
                      <td class="text-center"> {{ items.propDifference }} </td>
                      <td class="text-center"> {{ items.pValue }} </td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="row pr-4">
                  <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
                </div>
              </div>
            </div>
          </div>
        <!-- </b-card-text> -->
      </b-tab>


      <b-tab :title="sample_frame[1]">
        <!-- <b-card-text> -->
          <div class="row mt-4 text-center">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3">Filter Data of {{ this.sample_frame [1] }}</h3>
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
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">Longitudinal Measures for {{ this.sample_frame [1] }}</h3>

                <!-- <b-table
                id="user-table"
                show-empty
                :items="longitudinalItems"
                :fields="longitudinalFields"
                bordered
                responsive
                hover
                >
                  <template slot="[type]" slot-scope="data">
                    <b>{{ data.item.type }}</b>
                  </template>
                </b-table> -->
                <b-table-simple hover responsive>
                  <colgroup>
                    <col />
                    <col />
                    <col />
                    <col/>
                    <col />
                    <col />
                  </colgroup>
                  <b-thead head-variant="dark">
                    <b-th class="text-center" v-for="fields in longitudinalFields">{{ fields.label }}</b-th>
                  </b-thead>

                  <b-tbody>
                    <b-tr v-for="items in longitudinalItems">
                      <th v-html="items.type"> {{ items.type }} </th>
                      <td class="text-center"> {{ items.tw1 }} </td>
                      <td class="text-center"> {{ items.tw2 }} </td>
                      <td class="text-center"> {{ items.realDifference }} </td>
                      <!-- <td class="text-center align-middle" rowspan="4" v-if="items.realDifference"> {{ items.realDifference }} </td> -->
                      <!-- <td class="text-center align-middle" v-else></td> -->
                      <td class="text-center"> {{ items.propDifference }} </td>
                      <td class="text-center"> {{ items.pValue }} </td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="row pr-4">
                  <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
                </div>
              </div>
            </div>
          </div>
        <!-- </b-card-text> -->
      </b-tab>
    </b-tabs>
  </div>
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue';
// import Visualization from './Visualization';
import userChart from '../js/userchart.js';
import locationChart from '../js/locationchart.js';

// const axios = require('axios');
export default {
  name: "Longitudinal",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader,
    // 'Visualization': Visualization
  },
  computed: {
    ...mapState(['sectionaltable_obj'
  ]),

  basic: function(){
    if(this.$store.state.sectionaltable_obj.length > 0){
      var formattedRecord = []
      this.$store.state.sectionaltable_obj.forEach(function(rec){
        formattedRecord.push({
         type: rec[0],tw1: rec[1],tw2: rec[2],realDifference: rec[3],propDifference: rec[4],pValue: rec[5], older: rec[6]
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
      sample_frame: ['Sample Frame #1', 'Sample Frame #2'],

      longitudinalFields: [
        { key: 'type', label: '' },
        { key: 'tw1', label: 'Time Window 1' },
        { key: 'tw2', label: 'Time Window 2' },
        { key: 'realDifference', label: 'Real Difference' },
        { key: 'propDifference', label: 'Proportional Difference' },
        { key: 'pValue', label: 'P-value' },
      ],
      longitudinalItems:[
        { type: 'Carries Risk'},
        { type: '<span class="ml-4">Low</span>', tw1: '10', tw2: '30', realDifference: '10', propDifference: '15', pValue: '40' },
        { type: '<span class="ml-4">Medium</span>', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
        { type: '<span class="ml-4">High</span>', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
        { type: 'Any untreated caries present', tw1: '50', tw2: '20', propDifference: '15', pValue: '70' },
        { type: 'Number of decayed primary teeth', tw1: '10', tw2: '30', realDifference: '10', propDifference: '15', pValue: '40' },
        { type: 'Number of decayed permanent teeth', tw1: '10', tw2: '30', propDifference: '15', pValue: '40' },
        { type: 'Cavity permanent molar or premolar', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
        { type: 'Cavity permanent anterior', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
        { type: 'Active infection', tw1: '80', tw2: '110', realDifference: '60', propDifference: '60', pValue: '190' },
        { type: 'Mouth pain due to reversible pulpitis', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
        { type: 'Need ART filling', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
        { type: 'Need SDF', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },
        { type: 'Need Extraction', tw1: '80', tw2: '110', propDifference: '60', pValue: '190' },

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
