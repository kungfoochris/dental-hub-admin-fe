<template>
  <div id="app">
    <app-header></app-header>
    <div class="contents">
      <div class="row">
        <div class="col-12">
          <h1>Dashboard</h1>
          <p>Dashboard of Dental Hub.</p>
        </div>
      </div>

      <div class="row mt-4 text-center">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-4">1 Filter</h3>

            <div class="row">
              <div class="col-lg-4 col-sm-12 mb-4">
                <h6>Select Start Date:</h6>
                <b-input v-model="overview_start_date" type="date" />
              </div>

              <div class="col-lg-4 col-sm-12 mb-4">
                <h6>Select End Date:</h6>
                <b-input v-model="overview_end_date" type="date" />
              </div>

              <div class="col-lg-4 col-sm-12 mb-4">
                <h6>Location:</h6>
                <multiselect
                  v-model="location"
                  :options="options"
                  :multiple="true"
                  :preserve-search="true"
                  placeholder="Select Location"
                  label="name"
                  track-by="name"
                  open-direction="bottom"
                  :preselect-first="true"
                >
                </multiselect>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-10 col-sm-12">
                <h6>Select Activities:</h6>
                <b-form-group>
                  <b-form-checkbox-group
                    v-model="checkbox_selected"
                    :options="checkbox_options"
                    checked="true"
                    switches
                    size="lg"
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>

              <div class="col-lg-2 col-sm-12">
                <!-- <h6>Click Here:</h6> -->
                <b-button
                  variant="custom"
                  block
                  class="mb-4"
                  @click="OverviewTable"
                  >Submit</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card shadow">
            <!-- {{ this.overview_obj }} -->
            <h3 class="mb-3 text-center">1.1 Overview</h3>

            <div class="row mb-3 text-center" v-show="tablefilterdata">
              <div class="col-6">
                <p>
                  <strong>Start Date: </strong>{{ this.overview_start_date }}
                </p>
                <p><strong>End Date: </strong>{{ this.overview_end_date }}</p>
              </div>

              <div class="col-6">
                <p>
                  <strong>Location(s): </strong
                  ><span
                    v-for="(location, index) in table_location"
                    :key="index"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Activities: </strong
                  ><span
                    v-for="(activity, index) in table_activities"
                    :key="index"
                    >{{ activity }},</span
                  >
                </p>
              </div>
            </div>
            <b-table
              id="user-table"
              :items="basic"
              :fields="basicFields"
              responsive
              hover
              :busy="isBusy"
              class="text-center"
              show-empty
            >
              <!-- <template v-slot:cell(type)="row">
                <span v-html="row.item.type">{{ row.item.type }}</span>
              </template> -->

              <template v-slot:table-busy>
                <div class="text-center text-primary my-2">
                  <b-spinner
                    class="align-middle"
                    type="grow"
                    style="width: 5rem; height: 5rem"
                  ></b-spinner>
                </div>
              </template>

              <!-- <template v-slot:cell(basic)="row">
                {{ row.item.full_name }}
              </template> -->
            </b-table>

            <div class="row pr-4">
              <small class="ml-auto">
                <vue-excel-xlsx
                  :data="basic"
                  :columns="basicFields"
                  :filename="'Overview'"
                  :sheetname="'Overview Data'"
                  class="download-btn"
                >
                  <i class="fas fa-file-export mr-1"></i>Export Now
                </vue-excel-xlsx>
              </small>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-lg-6 col-sm-12">
          <div class="card shadow">
            <h3 class="mb-3">1.2 Treatment Distribution</h3>
            <div class="row mt-3">
              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Select Start Date:</h6>
                <b-input
                  v-model="treatment_distribution_start_date"
                  type="date"
                />
              </div>

              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Select End Date:</h6>
                <b-input
                  v-model="treatment_distribution_end_date"
                  type="date"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Location:</h6>
                <multiselect
                  v-model="bar_location"
                  :options="options"
                  :multiple="true"
                  :preserve-search="true"
                  placeholder="Select Location"
                  label="name"
                  open-direction="bottom"
                  track-by="name"
                  :preselect-first="true"
                >
                </multiselect>
              </div>

              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Age Group/Activity:</h6>
                <multiselect
                  v-model="age_group"
                  :options="options1"
                  :preserve-search="true"
                  placeholder="Select Age Group/Activity"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                >
                </multiselect>
                <!-- <b-form-select
                  v-model="age_group"
                  :options="options1"
                  value-field="name"
                  text-field="name"
                >
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled
                      >Select Age Group</b-form-select-option
                    >
                  </template>
                </b-form-select> -->
              </div>
            </div>

            <div class="row">
              <div class="col-12 text-center justify-content-center">
                <!-- <h6>Click Here:</h6> -->
                <b-button
                  variant="custom"
                  class="mb-4"
                  @click="Bargraphtreatment"
                  >Submit</b-button
                >
              </div>
            </div>
            <div class="row mb-3 text-center" v-show="treatmentfilterdata">
              <div class="col-6">
                <p>
                  <strong>Start Date: </strong
                  >{{ this.treatment_distribution_start_date }}
                </p>
                <p>
                  <strong>End Date: </strong
                  >{{ this.treatment_distribution_end_date }}
                </p>
              </div>

              <div class="col-6">
                <p>
                  <strong>Location(s): </strong
                  ><span
                    v-for="(location, index) in this
                      .treatment_distribution_location"
                    :key="index"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Age Group/Activity:</strong
                  ><span
                    v-for="(age_group, index) in this.age_group"
                    :key="index"
                    >{{ age_group }}</span
                  >
                </p>
              </div>
            </div>
            <div v-if="spinner" class="text-center mt-5">
              <b-spinner
                variant="primary"
                type="grow"
                label="Loading Visualization"
                style="width: 5rem; height: 5rem;"
              ></b-spinner>
            </div>
            <Visualization
              :tag="settingsgraph"
              v-show="showdataget1"
            ></Visualization>
            <Visualization
              :tag="settingsgraphpost"
              v-show="showdatapost1"
            ></Visualization>
          </div>
        </div>
        <!-- 1.3 Activity Distribution section -->
        <div class="col-lg-6 col-sm-12">
          <div class="card shadow">
            <h3 class="mb-3">1.3 Activity Distribution</h3>

            <div class="row mt-3">
              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Select Start Date:</h6>
                <b-input
                  v-model="activity_distribution_start_date"
                  type="date"
                />
              </div>
              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Select End Date:</h6>
                <b-input v-model="activity_distribution_end_date" type="date" />
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6 col-sm-12 mb-3">
                <h6>Location:</h6>
                <multiselect
                  v-model="pie_location"
                  :options="options"
                  :multiple="true"
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
                  v-model="treatment_type"
                  :options="options2"
                  :preserve-search="true"
                  placeholder="Select Activity"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                >
                </multiselect>
              </div>
            </div>

            <div class="row">
              <div class="col-12 text-center">
                <!-- <h6>Click Here:</h6> -->
                <b-button variant="custom" class="mb-4" @click="PieChartForm"
                  >Submit</b-button
                >
              </div>
            </div>

            <div class="row mb-3 text-center" v-show="activityfilterdata">
              <div class="col-6">
                <p>
                  <strong>Start Date: </strong
                  >{{ this.activity_distribution_start_date }}
                </p>
                <p>
                  <strong>End Date: </strong
                  >{{ this.activity_distribution_end_date }}
                </p>
              </div>

              <div class="col-6">
                <p>
                  <strong>Location(s): </strong
                  ><span
                    v-for="(location, index) in this
                      .activity_distribution_location"
                    :key="index"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Treatment Type:</strong
                  ><span>{{ this.treatment_type.name }}</span>
                </p>
              </div>
            </div>

            <div v-if="PieSpinner" class="text-center mt-5">
              <b-spinner
                variant="primary"
                type="grow"
                label="Loading Visualization"
                style="width: 5rem; height: 5rem;"
              ></b-spinner>
            </div>
            <Visualization :tag="piechart" v-show="showdataget"></Visualization>
            <Visualization
              :tag="piechartpost"
              v-show="showdatapost"
            ></Visualization>
          </div>
        </div>
      </div>

      <div class="row mt-4 text-center table-area">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3">1.4 Treatment By Activity Table</h3>

            <div class="row mb-3 text-center" v-show="tablefilterdata">
              <div class="col-6">
                <p>
                  <strong>Start Date: </strong>{{ this.overview_start_date }}
                </p>
                <p><strong>End Date: </strong>{{ this.overview_end_date }}</p>
              </div>

              <div class="col-6">
                <p>
                  <strong>Location(s): </strong
                  ><span
                    v-for="(location, index) in table_location"
                    :key="index"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Activities: </strong
                  ><span
                    v-for="(activity, index) in table_activities"
                    :key="index"
                    >{{ activity }},</span
                  >
                </p>
              </div>
            </div>

            <b-table
              id="treatments-table"
              show-empty
              :items="treatmentTableItemsActivity"
              :fields="basicFields"
              responsive
              hover
              :busy="isBusy"
            >
              <template v-slot:table-busy>
                <div class="text-center text-primary my-2">
                  <b-spinner
                    class="align-middle"
                    type="grow"
                    style="width: 5rem; height: 5rem"
                  ></b-spinner>
                </div>
              </template>
            </b-table>
          </div>
        </div>
      </div>

      <div class="row mt-4 text-center table-area">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3">1.5 Treatment By Ward</h3>

            <div class="row mb-3 text-center" v-show="tablefilterdata">
              <div class="col-6">
                <p>
                  <strong>Start Date: </strong>{{ this.overview_start_date }}
                </p>
                <p><strong>End Date: </strong>{{ this.overview_end_date }}</p>
              </div>

              <div class="col-6">
                <p>
                  <strong>Location(s): </strong
                  ><span
                    v-for="(location, index) in table_location"
                    :key="index"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Activities: </strong
                  ><span
                    v-for="(activity, index) in table_activities"
                    :key="index"
                    >{{ activity }},</span
                  >
                </p>
              </div>
            </div>

            <b-table
              id="treatment-table"
              show-empty
              :items="treatmentTableItemsWard"
              :fields="basicFields"
              responsive
              hover
              :busy="isBusy"
            >
              <template v-slot:table-busy>
                <div class="text-center text-primary my-2">
                  <b-spinner
                    class="align-middle"
                    type="grow"
                    style="width: 5rem; height: 5rem"
                  ></b-spinner>
                </div>
              </template>
            </b-table>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3">1.6 Contacts Over Time</h3>
            <Visualization :tag="lch6"></Visualization>
          </div>
        </div>
      </div>
    </div>
    <b-toast
      id="error-toast"
      variant="warning"
      solid
      append-toast
      toaster="b-toaster-top-center"
    >
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Filter Required Error !!!</strong>
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

      <div v-if="errors.age_group">
        <p>{{ errors.age_group }}</p>
      </div>

      <div v-if="errors.bar_location">
        <p>{{ errors.bar_location }}</p>
      </div>

      <div v-if="errors.pie_location">
        <p>{{ errors.pie_location }}</p>
      </div>

      <div v-if="errors.treatment_type">
        <p>{{ errors.treatment_type }}</p>
      </div>

      <div v-if="errors.checkbox_selected">
        <p>{{ errors.checkbox_selected }}</p>
      </div>

      <div v-if="message.length > 0">
        <p>{{ this.message }}</p>
      </div>
    </b-toast>
    <b-toast
      id="success-toast"
      variant="custom-success"
      solid
      append-toast
      toaster="b-toaster-bottom-full"
    >
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Filtered success</strong>
      </div>
      Data is Successfully filtered
    </b-toast>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./Header.vue";
import Visualization from "./Visualization";
import userChart from "../js/userchart.js";
import locationChart from "../js/locationchart.js";
import years from "../js/year_array.js";
import axios from "axios";

// const axios = require('axios');
export default {
  name: "IndexPage",

  components: {
    // "AuthenticationForm": AuthenticationForm
    "app-header": AppHeader,
    Visualization: Visualization,
  },

  computed: {
    ...mapState([
      "errormessage",
      "successmessage",
      // "visulaizationsuccessmessage",
      "message",
      "overviewbargraphpost_obj",
      "dashboard_piechartpost",
      "returndate_obj",
      // "overviewtable_obj",
      // "treatment_by_activity_obj",
      // "treatment_by_ward_obj",
      "geography",
      "activities_obj",
    ]),

    basic: function() {
      // this.isBusy = true;
      if (this.overview_obj.length > 0) {
        var formattedRecord = [];
        this.overview_obj.forEach(function(rec) {
          formattedRecord.push({
            type: rec[0],
            CHECK: rec[1],
            FV: rec[2],
            "F-SDF": rec[3],
            SDF: rec[4],
            SEAL: rec[5],
            ART: rec[6],
            EXO: rec[7],
            "REFER HP": rec[8],
            "REFER HYG": rec[9],
            "REFER DENT": rec[10],
            "REFER DR": rec[11],
            "REFER OTHER": rec[12],
          });
        });
        // this.isBusy = false;
        return formattedRecord;
      }
    },

    treatmentTableItemsActivity: function() {
      if (this.$store.state.treatment_by_activity_obj.length > 0) {
        var formattedRecord1 = [];
        this.$store.state.treatment_by_activity_obj.forEach(function(rec) {
          formattedRecord1.push({
            type: rec[0],
            CHECK: rec[1],
            FV: rec[2],
            "F-SDF": rec[3],
            SDF: rec[4],
            SEAL: rec[5],
            ART: rec[6],
            EXO: rec[7],
            "REFER HP": rec[8],
            "REFER HYG": rec[9],
            "REFER DENT": rec[10],
            "REFER DR": rec[11],
            "REFER OTHER": rec[12],
          });
        });
        return formattedRecord1;
      }
    },

    treatmentTableItemsWard: function() {
      if (this.$store.state.treatment_by_ward_obj.length > 0) {
        var formattedRecord2 = [];
        this.$store.state.treatment_by_ward_obj.forEach(function(rec) {
          formattedRecord2.push({
            type: rec[0],
            CHECK: rec[1],
            FV: rec[2],
            "F-SDF": rec[3],
            SDF: rec[4],
            SEAL: rec[5],
            ART: rec[6],
            EXO: rec[7],
            "REFER HP": rec[8],
            "REFER HYG": rec[9],
            "REFER DENT": rec[10],
            "REFER DR": rec[11],
            "REFER OTHER": rec[12],
          });
        });
        return formattedRecord2;
      }
    },
  },

  created() {
    this.listGeography().then(() => {
      this.updateOptions();
    });
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();
    });
    this.getOverviewTable();
    this.listTreatmentbyActivity();
    this.listTreatmentbyWard();
  },

  data() {
    return {
      spinner: false,
      PieSpinner: false,
      Start_Date: "",
      overview_obj: [],
      overview_start_date: "",
      overview_end_date: "",
      activity_distribution_start_date: "",
      activity_distribution_end_date: "",
      treatment_distribution_start_date: "",
      treatment_distribution_end_date: "",
      treatment_distribution_location: [],
      activity_distribution_location: [],
      activity_distribution_age_activity: [],
      age_group: "",
      treatment_type: "",
      End_Date: "",
      userChart: userChart,
      locationChart: locationChart,
      uch: "uch",
      settingsgraph: "settingsgraph",
      lch: "lch",
      piechart: "piechart",
      lch6: "lch6",
      errors: [],
      isActive: true,
      location: [],
      pie_location: [],
      bar_location: [],
      options: [{ name: "All Location", language: null }],
      options1: [{ name: "Age Group" }, { name: "Activity" }],
      options2: [
        { name: "All Treatment Type", value: "alltreatment" },
        { name: "CONTACTS", value: "contacts" },
        { name: "EXO", value: "exo" },
        { name: "ART", value: "art" },
        { name: "SEAL", value: "seal" },
        { name: "SDF", value: "sdf" },
        { name: "F-SDF", value: "f-sdf" },
        { name: "FV", value: "fv" },
      ],
      years_array: years(100).reverse(),
      selected_year: "",
      isBusy: false,
      busy11: false,
      tablefilterdata: false,
      treatmentfilterdata: false,
      activityfilterdata: false,
      ward_selected: [
        "Test ward",
        "Lakeside",
        "Sarangkot",
        "Kaskikot",
        "Salyan",
        "Thumki",
        "Deurali",
        "Rupakot",
        "Hansapur",
        "Tilahar",
        "Katuwachaupari",
      ],
      checkbox_selected: [],
      checkbox_options: [],
      date_error: "",
      showdataget: true,
      showdatapost: false,
      showdataget1: true,
      showdatapost1: false,
      piechartpost: "piechartpost",
      settingsgraphpost: "settingsgraphpost",
      user_location: [],
      table_start_date: "",
      table_end_date: "",
      table_location: [],
      table_activities: [],
      basicFields: [
        { field: "type", label: "Type", tdClass: "font-weight-bold" },
        { field: "CHECK", label: "Check" },
        { field: "FV", label: "FV" },
        { field: "F-SDF", label: "F-SDF" },
        { field: "SDF", label: "SDF" },
        { field: "SEAL", label: "SEAL" },
        { field: "ART", label: "ART" },
        { field: "EXO", label: "EXO" },
        // { key: 'fullmouthsdf', label: 'F-SDF'},
        // { key: 'fv', label: 'FV (ppl)'},
        { field: "REFER HP", label: "Refer HP" },
        { field: "REFER HYG", label: "Refer Hyg" },
        { field: "REFER DENT", label: "Refer Dent" },
        { field: "REFER DR", label: "Refer Dr" },
        { field: "REFER OTHER", label: "Refer Other" },
      ],
    };
  },

  mounted: function() {
    let currentDate = new Date().toISOString().substring(0, 10);
    this.activity_distribution_end_date = currentDate;
    this.treatment_distribution_end_date = currentDate;
    this.overview_end_date = currentDate;
    let startDate = new Date(Date.now() - 86400000 * 30)
      .toISOString()
      .substring(0, 10);
    this.activity_distribution_start_date = startDate;
    this.treatment_distribution_start_date = startDate;
    this.overview_start_date = startDate;
  },

  // watch: {
  //   overview_obj: function() {
  //     if (this.overview_obj.length > 0) {
  //       this.isBusy = true;
  //     } else {
  //       this.isBusy = false;
  //     }
  //   },
  // },

  methods: {
    ...mapActions([
      "listReturnDate",
      "listOverviewTable",
      "listTreatmentbyActivity",
      "listTreatmentbyWard",
      "listGeography",
      "listActivitie",
    ]),

    OverviewTable() {
      var activities_details = this.activities_obj;
      var table_activities1 = [];
      this.errors = [];
      // this.overviewtable_obj = [];
      // this.basic = [];
      if (this.location.length > 0) {
        var geography_id = [];
        var geography_name = [];
        if (this.location[0].language == null) {
          this.options.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        } else {
          this.location.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        }

        this.user_location = geography_id;
        this.table_location = geography_name;
      }
      if (this.location == "") {
        this.errors["location"] = "Location is required.";
        this.$bvToast.show("error-toast");
      } else if (this.checkbox_selected == "") {
        this.errors["checkbox_selected"] =
          "Please Select one of the Activities.";
        this.$bvToast.show("error-toast");
      } else {
        this.isBusy = true;
        this.checkbox_selected.forEach(function(activities_id) {
          table_activities1.push(
            activities_details.find((evt) => evt.id == activities_id).name
          );
        }),
          // (this.overvi_start_date = this.overview_start_date),
          // (this.table_end_date = this.overview_end_date),
          (this.table_activities = table_activities1);
        this.tablefilterdata = true;
        let formData = {
          start_date: this.overview_start_date,
          end_date: this.overview_end_date,
          location: this.user_location,
          activities: this.checkbox_selected,
        };
        axios
          .post(
            "https://app.abhiyantrik.com/api/v1/overviewvisualization",
            formData
          )
          .then((response) => {
            if (response.status == 200) {
              // console.log(response.data);
              this.overview_obj = response.data;
              this.isBusy = false;
              this.$store.dispatch("CreateTreatmentbyActivity", {
                start_date: this.overview_start_date,
                end_date: this.overview_end_date,
                location: this.user_location,
                activities: this.checkbox_selected,
              });
              this.$store
                .dispatch("CreateTreatmentbyWard", {
                  start_date: this.overview_start_date,
                  end_date: this.overview_end_date,
                  location: this.user_location,
                  activities: this.checkbox_selected,
                })
                .then(() => {
                  if (this.errormessage.length > 0) {
                    this.$bvToast.show("error-toast");
                  } else if (this.successmessage == "success") {
                  }
                });
            } else {
              this.$bvToast.show("error-toast");
            }
          });
      }
    },

    getOverviewTable() {
      // this.overview_obj = [];
      this.isBusy = true;
      axios
        .get("https://app.abhiyantrik.com/api/v1/overviewvisualization")
        .then((response) => {
          if (response.status == 200) {
            this.overview_obj = response.data;
            this.isBusy = false;
          } else {
            this.$bvToast.show("error-toast");
          }
        });
    },

    Bargraphtreatment() {
      this.showdatapost1 = false;
      // this.showdataget1 = false;
      this.errors = [];
      var geography_id = [];
      var geography_name = [];

      if (this.bar_location && this.bar_location.length) {
        if (this.bar_location[0].language == null) {
          this.options.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        } else {
          this.bar_location.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        }
        this.treatment_distribution_location = geography_name;
      }

      if (this.age_group == "" || this.age_group == null) {
        this.errors["age_group"] = "Age Group required.";
        this.$bvToast.show("error-toast");
      } else if (this.bar_location == "") {
        this.errors["bar_location"] = "Location is required.";
        this.$bvToast.show("error-toast");
      }
      // this.options1.forEach(function(activities_id) {
      //   activity_distribution_age_activity1.push(
      //     this.age_group.find((evt) => evt.id == activities_id).name
      //   );
      // }),
      // (this.activity_distribution_age_activity = activity_distribution_age_activity1),
      else
        (this.showdataget1 = false),
          (this.spinner = true),
          (this.overviewbargraphpost_obj = []),
          (this.treatmentfilterdata = true),
          this.$store
            .dispatch("CreateTreatmentBarGraph", {
              start_date: this.treatment_distribution_start_date,
              end_date: this.treatment_distribution_end_date,
              location: geography_id,
              age_group_activity: this.age_group.name,
            })
            .then(() => {
              if (this.errormessage.length > 0) {
                this.$bvToast.show("error-toast");
              } else {
                this.spinner = false;
                this.showdatapost1 = true;
                (this.message = ""), this.$bvToast.show("success-toast");
              }
            });
    },

    PieChartForm() {
      this.showdatapost = false;
      this.errors = [];
      var geography_id = [];
      var geography_name = [];
      if (this.pie_location && this.pie_location.length) {
        if (this.pie_location[0].language == null) {
          this.options.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        } else {
          this.pie_location.forEach(function(location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        }
        this.activity_distribution_location = geography_name;
      }
      if (this.treatment_type == "" || this.treatment_type == null) {
        this.errors["treatment_type"] = "Treatment Type is required.";
        this.showdataget = true;
        this.$bvToast.show("error-toast");
      } else if (this.pie_location == "") {
        this.errors["pie_location"] = "Location is required.";
        this.showdataget = true;
        this.$bvToast.show("error-toast");
      }
      // (this.showdatapost = true),
      else
        (this.showdataget = false),
          (this.dashboard_piechartpost = []),
          (this.PieSpinner = true),
          (this.activityfilterdata = true),
          this.$store
            .dispatch("CreateDashboardPieChart", {
              start_date: this.activity_distribution_start_date,
              end_date: this.activity_distribution_end_date,
              location: geography_id,
              treatment_type: this.treatment_type["value"],
            })
            .then(() => {
              if (this.errormessage.length > 0) {
                this.$bvToast.show("error-toast");
              } else {
                this.PieSpinner = false;
                this.showdatapost = true;
                (this.message = ""), this.$bvToast.show("success-toast");
              }
            });
    },

    WardLineVisualization() {
      this.errors = [];
      if (this.Start_Date == "") {
        this.errors["Start_Date"] = "Start date required.";
        this.$bvToast.show("error-toast");
      } else
        this.$store.dispatch("CreateWardLineVisualization", {
          start_date: this.Start_Date,
        });
    },

    updateOptions() {
      var geography_data = [{ name: "All Location", language: null }];
      if (this.geography.length > 0) {
        this.geography.forEach(function(geography_obj) {
          geography_data.push({
            name: geography_obj.name,
            language: geography_obj.id,
          });
        });
        this.options = geography_data;
      }
    },

    checkbox_optionsupdate() {
      var activities_data = [];
      var activities_data1 = [];
      if (this.activities_obj.length > 0) {
        this.activities_obj.forEach(function(activity) {
          activities_data.push({ text: activity.name, value: activity.id });
          activities_data1.push(activity.id);
        });
        this.checkbox_options = activities_data;
        this.checkbox_selected = activities_data1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/index.scss";
.pk {
  color: red;
}
.download-btn {
  background: none;
  border: none;
  color: blue;
}
</style>
