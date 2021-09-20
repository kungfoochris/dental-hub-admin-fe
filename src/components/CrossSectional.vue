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
            <div class="text-center text-primary my-2" v-if="loading">
              <b-spinner
                class="align-middle"
                type="grow"
                style="width: 5rem; height: 5rem"
              ></b-spinner>
            </div>
              <b-table-simple hover responsive v-else>
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
                  <b-th
                    class="text-center"
                    v-for="fields in basicFields"
                    :key="fields"
                    >{{ fields.label }}</b-th
                  >
                </b-thead>

                <b-tbody>
                  <b-tr v-for="items in basic" :key="items">
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
            <!-- <div else>
          <b-spinner label="loading"></b-spinner>
          </div> -->
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
      if (this.$store.state.sectionaltable_obj.length > 0) {
        let formattedRecord1 = [];
        this.$store.state.sectionaltable_obj.forEach(function (rec) {
          let type1 = rec[0].toString().split(",");
          let pv = ("" + rec[4]).toString().split(",");
          let jp = ("" + rec[9]).toString().split(",");
          let tl = ("" + rec[10]).toString().split(",");
          // let type1 = rec[0].toString().split(",");
          // let sixyo1 = rec.split(",");
          formattedRecord1.push({
            type: type1[0],
            sixyo: rec[1] + "",
            twelveyo: rec[2] + "",
            fifteenyo: rec[3] + "",
            whopvalue: pv[0],
            child: rec[5] + "",
            teen: rec[6] + "",
            adult: rec[7] + "",
            olderadult: rec[8] + "",
            jevaiapvalue: jp[0],
            total: tl[0],
          });
        });
        return formattedRecord1;
      } else {
        return [];
      }
    },
  },

  created() {
    this.listReturnDate();
    this.listSectionalTable();
    // this.listActivitie().then(() => {
    //   this.checkbox_optionsupdate();
    // });
    this.listGeography().then(() => {
      this.updateOptions();
    });
  },

  data() {
    return {
      loading: false,
      errors: [],
      Start_Date: "",
      End_Date: "",
      userChart: userChart,
      locationChart: locationChart,
      isActive: true,
      clinic: [],
      location: [],
      options: [{ name: "All Location", language: null }],
      user_location: [],
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
      checkbox_options: [
        { text: "Community Outreach", value: 1 },
        { text: "Health Post", value: 2 },
        { text: "Training", value: 4 },
        { text: "School Seminar", value: 3 },
      ],
      checkbox_selected: [1, 2, 3, 4],
      basicFields: [
        { key: "type", label: "Types", tdClass: "font-weight-bold" },
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
    ...mapActions(["listReturnDate", "listSectionalTable", "listGeography"]),

    CrossSectionalForm() {
      // this.checkbox_selected = [1, 2, 3, 4];
      this.errors = [];
      this.loading = true;
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
      } else
        this.$store
          .dispatch("CreateSectionalTable", {
            start_date: this.returndate_obj.last_30_days,
            end_date: this.returndate_obj.today_date,
            reason_for_visit: this.seminar_obj["name"],
            referral_type: this.outreach_obj["name"],
            activity: this.checkbox_selected,
            location: this.user_location,
          })
          .then(() => {
            if (this.errormessage.length > 0) {
              this.$bvToast.show("error-toast");
            } else if (this.successmessage == "success") {
              this.loading = false;
              (this.message = ""), this.$bvToast.show("success-toast");
              // window.location.reload(100);
            }
          });
    },
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
  },
};
</script>

<style lang="scss" scoped>
@import "../css/index.scss";
// .custom-control{
//   z-index: 0 !important;
// }
</style>
