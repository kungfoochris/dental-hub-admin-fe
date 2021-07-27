<template>
  <div id="app">
    <app-header></app-header>
    <div class="contents">
      <div class="row">
        <div class="col-12">
          <h1>Cross-Sectional Measures of Disease</h1>
          <p>Graphical representation of Cross-Sectional Measures.</p>
        </div>
      </div>

      <div class="row mt-4 text-center">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3">3 Filter</h3>
            <div class="row mb-3">
              <div class="col-md-6">
                <h6>Select Start Date:</h6>
                <b-input v-model="returndate_obj.last_30_days" type="date" />
              </div>

              <div class="col-6">
                <h6>Select End Date:</h6>
                <b-input v-model="returndate_obj.today_date" type="date" />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-4 col-sm-12">
                <h6>Select the Reason for Visit:</h6>
                <multiselect
                  v-model="seminar_obj"
                  :options="seminar"
                  :preserve-search="true"
                  placeholder="Reason For Visit"
                  label="name"
                  track-by="name"
                  open-direction="bottom"
                  :preselect-first="true"
                >
                </multiselect>
              </div>

              <div class="col-md-4 col-sm-12">
                <h6>Select Referral Type:</h6>
                <multiselect
                  v-model="outreach_obj"
                  :options="outreach"
                  :preserve-search="true"
                  placeholder="Referral Type"
                  label="name"
                  track-by="name"
                  open-direction="bottom"
                  :preselect-first="true"
                >
                </multiselect>
              </div>

              <div class="col-lg-4 col-sm-4 mb-4">
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
              <div class="col-md-10 col-sm-12">
                <h6>Select Activities:</h6>
                <b-form-group>
                  <b-form-checkbox-group
                    v-model="checkbox_selected"
                    :options="checkbox_options"
                    switches
                    size="lg"
                    style="z-index: 0"
                  ></b-form-checkbox-group>
                </b-form-group>
              </div>

              <div class="col-lg-2 col-sm-12">
                <b-button
                  variant="custom"
                  block
                  class="mb-4"
                  @click="CrossSectionalForm"
                  >Submit</b-button
                >
              </div>
            </div>
          </div>
        </div>

        <b-toast
          id="error-toast"
          variant="warning"
          solid
          append-toast
          toaster="b-toaster-bottom-full"
        >
          <div
            slot="toast-title"
            class="d-flex flex-grow-1 align-items-baseline"
          >
            <strong class="mr-auto">Overview filter required error</strong>
          </div>
          <div v-if="errors.Start_Date">
            <p>{{ errors.Start_Date }}</p>
          </div>
          <div v-if="errors.End_Date">
            <p>{{ errors.End_Date }}</p>
          </div>
          <div v-if="errors.seminar_obj">
            <p>{{ errors.seminar_obj }}</p>
          </div>

          <div v-if="errors.outreach_obj">
            <p>{{ errors.outreach_obj }}</p>
          </div>
          <div v-if="errors.checkbox_selected">
            <p>{{ errors.checkbox_selected }}</p>
          </div>

          <div v-if="errors.location">
            <p>{{ errors.location }}</p>
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
          <div
            slot="toast-title"
            class="d-flex flex-grow-1 align-items-baseline"
          >
            <strong class="mr-auto">Filtered success</strong>
          </div>
          Data is Successfully Filtered
        </b-toast>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3 text-center">3.1 Cross-Sectional Measures</h3>

            <div class="row mb-3 text-center" v-show="tablefilterdata">
              <div class="col-4">
                <p><strong>Start Date: </strong>{{ this.table_start_date }}</p>
                <p><strong>End Date: </strong>{{ this.table_end_date }}</p>
              </div>

              <div class="col-8">
                <p>
                  <strong>Location(s): </strong
                  ><span v-for="location in table_location"
                    >{{ location }},</span
                  >
                </p>
                <p>
                  <strong>Activities: </strong
                  ><span v-for="activity in table_activities"
                    >{{ activity }},</span
                  >
                </p>
              </div>
            </div>

            <b-table-simple hover responsive>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th colspan="2"></b-th>
                  <b-th class="text-left" colspan="4"
                    >WHO indicator age-groups</b-th
                  >
                  <b-th class="text-left" colspan="6"
                    >Jevaia's indicator age-groups</b-th
                  >
                </b-tr>
              </b-thead>
              <b-thead>
                <b-th class="text-center" v-for="fields in basicFields">{{
                  fields.label
                }}</b-th>
              </b-thead>

              <b-tbody>
                <b-tr v-for="items in basic">
                  <!-- <th v-html="items.serial">{{ items.serial }}</th> -->
                  <th v-html="items.type">{{ items.type }}</th>
                  <td class="text-center">{{ items.sixyo }}</td>
                  <td class="text-center">{{ items.twelveyo }}</td>
                  <td class="text-center">{{ items.fifteenyo }}</td>
                  <td class="text-center">{{ items.whopvalue }}</td>
                  <td class="text-center">{{ items.child }}</td>
                  <td class="text-center">{{ items.teen }}</td>
                  <td class="text-center">{{ items.adult }}</td>
                  <td class="text-center">{{ items.olderadult }}</td>
                  <td class="text-center">{{ items.jevaiapvalue }}</td>
                  <td class="text-center">{{ items.total }}</td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <div class="row pr-4">
              <small class="ml-auto"
                ><a href=""
                  ><i class="fas fa-file-download mr-1"></i>Download Reports</a
                ></small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./Header.vue";
import Visualization from "./Visualization";
import userChart from "../js/userchart.js";
import locationChart from "../js/locationchart.js";

// const axios = require('axios');
export default {
  name: "CrossSectional",
  components: {
    // "AuthenticationForm": AuthenticationForm
    "app-header": AppHeader,
    Visualization: Visualization,
  },
  computed: {
    ...mapState([
      "message",
      "errormessage",
      "successmessage",
      "returndate_obj",
      "sectionaltable_obj",
      "activities_obj",
      "geography",
    ]),

    basic: function () {
      var formattedRecord = this.$store.state.sectionaltable_obj;
      let rows = formattedRecord.length;
      for (let i = 0; i < rows; i++) {
        let items = formattedRecord[1].length;
        // console.log(items)
        for (let n = 0; n < items; n++) {
          let list = formattedRecord[i][n];
          let output = list;
          // output.push({
          //   type: list[0],
          //   sixyo: list[1],
          //   sixyo: list[1],
          //   sixyo: list[1],
          //   sixyo: list[1],
          //   sixyo: list[1],
          //   sixyo: list[1],
          // });
          console.log(output);
        }
      }
    },
  },

  created() {
    this.listReturnDate();
    this.listSectionalTable();
    this.listActivitie().then(() => {
      this.checkbox_optionsupdate();
    });
    this.listGeography().then(() => {
      this.updateOptions();
    });
  },

  data() {
    return {
      errors: [],
      Start_Date: "",
      End_Date: "",
      userChart: userChart,
      locationChart: locationChart,
      uch: "uch",
      lch: "lch",
      type1: "bar",
      type2: "pie",
      isActive: true,
      clinic: [],
      location: [],
      options: [{ name: "All Location", language: null }],
      user_location: [],
      table_location: [],
      tablefilterdata: false,
      table_start_date: "",
      table_end_date: "",
      table_activities: [],
      table_location: [],

      outreach: [
        { name: "Refer Hp", value: true },
        { name: "Refer Hyg", value: true },
        { name: "Refer Dent", value: true },
        { name: "Refer Dr", value: true },
        { name: "Refer Other", value: true },
      ],
      outreach_obj: "",
      seminar: [
        { name: "Checkup / Screening" },
        { name: "Relief of pain" },
        { name: "Continuation of treatment plan" },
        { name: "Other Problem" },
      ],
      seminar_obj: "",
      training: [],
      checkbox_options: [],
      checkbox_selected: [],
      basicFields: [
        // { key: "serial", label: "S.N", tdClass: "font-weight-bold" },
        { key: "type", label: "", tdClass: "font-weight-bold" },
        { key: "sixyo", label: "6 yo" },
        { key: "twelveyo", label: "12 yo" },
        { key: "fifteenyo", label: "15 yo" },
        { key: "whopvalue", label: "P-value" },
        { key: "child", label: "Child ≤ 12 Y" },
        { key: "teen", label: "Teen 13-18 Y" },
        { key: "adult", label: "Adult 19-60 Y" },
        { key: "olderadult", label: "Older Adult ≥ 61 Y" },
        { key: "jevaiapvalue", label: "P-value" },
        { key: "total", label: "Totals" },
      ],

      treatmentFields: [
        { key: "type", label: "", tdClass: "font-weight-bold" },
        { key: "exo", label: "EXO" },
        { key: "art", label: "ART" },
        { key: "seal", label: "SEAL" },
        { key: "sdf", label: "SDF" },
        { key: "fv", label: "FV" },
        { key: "contact", label: "Contacts" },
      ],
      treatment: [
        {
          type: "By Ward",
          exo: "30",
          art: "10",
          seal: "15",
          sdf: "15",
          fv: "40",
          contact: "31",
        },
        {
          type: "Clinic",
          exo: "20",
          art: "30",
          seal: "15",
          sdf: "25",
          fv: "70",
          contact: "22",
        },
        {
          type: "Seminar",
          exo: "30",
          art: "10",
          seal: "15",
          sdf: "15",
          fv: "40",
          contact: "34",
        },
        {
          type: "Outreach",
          exo: "30",
          art: "10",
          seal: "15",
          sdf: "15",
          fv: "40",
          contact: "11",
        },
        {
          type: "Training",
          exo: "110",
          art: "60",
          seal: "60",
          sdf: "70",
          fv: "190",
          contact: "98",
        },
      ],
    };
  },

  methods: {
    ...mapActions([
      "listReturnDate",
      "listSectionalTable",
      "listActivitie",
      "listGeography",
    ]),

    // checkbox_optionsupdate() {
    //   var activities_data = [];
    //   if (this.activities_obj.length > 0) {
    //     this.activities_obj.forEach(function (activity) {
    //       activities_data.push({ text: activity.name, value: activity.id });
    //     });
    //     this.checkbox_options = activities_data;
    //   }
    // },

    updateOptions() {
      var geography_data = [{ name: "All Location", language: null }];
      if (this.geography.length > 0) {
        this.geography.forEach(function (geography_obj) {
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
        this.activities_obj.forEach(function (activity) {
          activities_data.push({ text: activity.name, value: activity.id });
          activities_data1.push(activity.id);
        });
        this.checkbox_options = activities_data;
        this.checkbox_selected = activities_data1;
      }
    },

    CrossSectionalForm() {
      var activities_details = this.activities_obj;
      var table_activities = [];
      var l = [0, 0, 0, 0];
      var a = 0;
      var p = [];
      this.checkbox_selected.forEach(function (e) {
        l[a] = e;
        p.push(e);
        a++;
      });
      this.errors = [];
      if (this.location.length > 0) {
        var geography_id = [];
        var geography_name = [];
        if (this.location[0].language == null) {
          this.options.forEach(function (location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        } else {
          this.location.forEach(function (location_id) {
            if (location_id.language != null) {
              geography_id.push(location_id.language);
              geography_name.push(location_id.name);
            }
          });
        }
        this.user_location = geography_id;
        this.table_location = geography_name;
      }
      if (this.seminar_obj == null) {
        this.errors["seminar_obj"] = "Reason For Visit required.";
        this.$bvToast.show("error-toast");
      } else if (this.outreach_obj == null) {
        this.errors["outreach_obj"] = "Referral Type required.";
        this.$bvToast.show("error-toast");
      } else if (this.checkbox_selected == "") {
        this.errors["checkbox_selected"] =
          "Select on of the activities required.";
        this.$bvToast.show("error-toast");
      } else if (this.location == "") {
        this.errors["location"] = "Selection of the location is required.";
        this.$bvToast.show("error-toast");
      } else
        p.forEach(function (activities_id) {
          table_activities.push(
            activities_details.find((evt) => evt.id == activities_id).name
          );
        }),
          (this.table_start_date = this.returndate_obj.last_30_days),
          (this.table_end_date = this.returndate_obj.today_date),
          (this.table_activities = table_activities),
          (this.tablefilterdata = true),
          this.$store
            .dispatch("CreateSectionalTable", {
              start_date: this.returndate_obj.last_30_days,
              end_date: this.returndate_obj.today_date,
              reason_for_visit: this.seminar_obj["name"],
              referral_type: this.outreach_obj["name"],
              location: this.user_location,
              health_post: l[0],
              seminar: l[1],
              outreach: l[2],
              training: l[3],
            })
            .then(() => {
              if (this.errormessage.length > 0) {
                this.$bvToast.show("error-toast");
              } else if (this.successmessage == "success") {
                (this.message = ""), this.$bvToast.show("success-toast");
              }
            });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/index.scss";
// .custom-control{
//   z-index: 0 !important;
// }
</style>
