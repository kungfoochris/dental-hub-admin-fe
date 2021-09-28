<template>
  <div id="app">
    <app-header></app-header>
    <div class="contents">
      <div class="row">
        <div class="col-12">
          <h1>Longitudinal Measures of Disease</h1>
          <p>Graphical representation of Longitudinal Measures.</p>
        </div>
      </div>

      <div class="row mt-4 text-center">
        <div class="col-12">
          <div class="card shadow">
            <h3 class="mb-3">4 Filter</h3>
            <div class="row mb-3">
              <div class="col-md-6 col-sm-12">
                <h5>Time Frame 1</h5>

                <div class="row">
                  <div class="col-6">
                    <h6>Select Start Date:</h6>
                    <b-input
                      v-model="returndate_obj.last_30_days"
                      type="date"
                    />
                  </div>

                  <div class="col-6">
                    <h6>Select End Date:</h6>
                    <b-input v-model="returndate_obj.today_date" type="date" />
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12">
                <h5>Time Frame 2</h5>

                <div class="row">
                  <div class="col-6">
                    <h6>Select Start Date:</h6>
                    <b-input
                      v-model="returndate_obj.last_30_days"
                      type="date"
                    />
                  </div>

                  <div class="col-6">
                    <h6>Select End Date:</h6>
                    <b-input v-model="returndate_obj.today_date" type="date" />
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-4 col-sm-12">
                <h6>Select the Reason for Visit:</h6>

                <multiselect
                  v-model="seminar_obj"
                  :options="seminar"
                  :preserve-search="true"
                  placeholder="Reason for Visit"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  open-direction="bottom"
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
                  :preselect-first="true"
                  open-direction="bottom"
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
              <div class="col-lg-4 col-md-4 col-sm-12">
                <h6>Select Age Group:</h6>
                <multiselect
                  v-model="age_group"
                  :options="agegroup_options"
                  :preserve-search="true"
                  placeholder="Referral Type"
                  label="name"
                  track-by="name"
                  :preselect-first="true"
                  open-direction="bottom"
                >
                </multiselect>
              </div>
              <div class="col-md-8 col-md-8 col-sm-12">
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
            </div>
            <div class="row mt-5 justify-content-between align-items-center">
              <div class="col-lg-4 col-md-8 col-sm-12">
                <!-- <h6>Select Follow-up</h6>
                <b-form-group>
                  <b-form-checkbox-group
                    v-model="checkbox_selected_follow_up"
                    :options="checkbox_followup_options"
                    @change="checked"
                    switches
                    size="lg"
                  ></b-form-checkbox-group>
                </b-form-group> -->
              </div>
              <div class="col-lg-2 col-sm-12">
                <b-button
                  variant="custom"
                  block
                  class="mb-4"
                  @click="LongitudinalForm()"
                  >Submit</b-button
                >
              </div>
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
        <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Overview filter required error</strong>
        </div>
        <div v-if="errors.frame1_start_date">
          <p>{{ errors.frame1_start_date }}</p>
        </div>
        <div v-if="errors.frame1_end_date">
          <p>{{ errors.frame1_end_date }}</p>
        </div>

        <div v-if="errors.frame2_start_date">
          <p>{{ errors.frame2_start_date }}</p>
        </div>
        <div v-if="errors.frame2_end_date">
          <p>{{ errors.frame2_end_date }}</p>
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

        <div v-if="message">
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
        Data is Successfully Filtered
      </b-toast>

      <b-tabs class="mt-4" pills>
        <b-tab :title="sample_frame[0]" v-if="checkbox_selected_follow_up == true">
          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">
                  4.1 Longitudinal Measures - Comparison of two different
                  cross-sections at two different points of time
                </h3>
                <b-table-simple hover bordered responsive>
                  <b-thead head-variant="dark">
                    <b-th colspan="1" class="text-center"> Types </b-th>
                    <b-th colspan="1" class="text-center"> Time Point 1 </b-th>
                    <b-th colspan="1" class="text-center"> Time Point 2 </b-th>
                    <b-th colspan="1" class="text-center">
                      Real Difference
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      Effect size value
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      Effect size descriptor
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      P-value for related samples
                    </b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr
                      v-for="(items, index) in longitudinalItems"
                      :key="index"
                    >
                      <th v-html="items.type">
                        {{ items.type }}
                      </th>
                      <th class="text-center">
                        <div v-for="(tP, index) in items.tp1" :key="index">
                          {{ tP }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(tP2, index) in items.tp2" :key="index">
                          {{ tP2 }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div
                          v-for="(tP2, index) in items.realDifference"
                          :key="index"
                        >
                          {{ tP2 }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(eSV, index) in items.esv" :key="index">
                          {{ eSV }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(eSD, index) in items.esd" :key="index">
                          {{ eSD }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(pV, index) in items.pValue" :key="index">
                          {{ pV }}
                        </div>
                      </th>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
                <div class="row pr-4">
                  <small class="ml-auto"
                    ><a href=""
                      ><!--<i class="fas fa-file-export mr-1"></i>-->Download
                      Report</a
                    ></small
                  >
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab :title="sample_frame[1]" else >
          <div class="row mt-4">
            <div class="col-12">
              <div class="card shadow">
                <h3 class="mb-3 text-center">
                  4.2 Longitudinal Measures - Comparison of same individuals at
                  different points of time
                </h3>
                <b-table-simple hover bordered responsive>
                  <b-thead head-variant="dark">
                    <b-th colspan="1" class="text-center"> Types </b-th>
                    <b-th colspan="1" class="text-center"> Time Point 1 </b-th>
                    <b-th colspan="1" class="text-center"> Time Point 2 </b-th>
                    <b-th colspan="1" class="text-center">
                      Real Difference
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      Effect size value
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      Effect size descriptor
                    </b-th>
                    <b-th colspan="1" class="text-center">
                      P-value for related samples
                    </b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr
                      v-for="(items, index) in longitudinalItems1"
                      :key="index"
                    >
                      <th v-html="items.type">
                        {{ items.type }}
                      </th>
                      <th class="text-center">
                        <div v-for="(tP, index) in items.tp1" :key="index">
                          {{ tP }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(tP2, index) in items.tp2" :key="index">
                          {{ tP2 }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div
                          v-for="(tP2, index) in items.realDifference"
                          :key="index"
                        >
                          {{ tP2 }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(eSV, index) in items.esv" :key="index">
                          {{ eSV }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(eSD, index) in items.esd" :key="index">
                          {{ eSD }}
                        </div>
                      </th>
                      <th class="text-center">
                        <div v-for="(pV, index) in items.pValue" :key="index">
                          {{ pV }}
                        </div>
                      </th>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>

                <div class="row pr-4">
                  <small class="ml-auto"><a href="">Download Report</a></small>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./Header.vue";
import locationChart from "../js/locationchart.js";

export default {
  name: "Longitudinal",
  components: {
    "app-header": AppHeader,
  },
  computed: {
    ...mapState([
      "successmessage",
      "returndate_obj",
      "sectionaltable_obj",
      "longitudinalmeasures_obj_one",
      "longitudinalmeasures_obj_two",
      "errormessage",
      "message",
      "geography",
    ]),

    longitudinalItems: function () {
      if (this.$store.state.longitudinalmeasures_obj_one.length > 0) {
        var formattedRecord1 = [];
        this.$store.state.longitudinalmeasures_obj_one.forEach(function (rec) {
          var type1 = rec[0].toString().split(",");
          formattedRecord1.push({
            type: type1[0],
            tp1: rec[1],
            tp2: rec[2],
            realDifference: rec[3],
            esv: rec[4],
            esd: rec[5],
            pValue: rec[6],
          });
        });
        return formattedRecord1;
      } else {
        return [];
      }
    },
    
    longitudinalItems1: function () {
      if (this.$store.state.longitudinalmeasures_obj_two.length > 0) {
        var formattedRecord2 = [];
        this.$store.state.longitudinalmeasures_obj_two.forEach(function (rec) {
          let type1 = rec[0].toString().split(",");
          formattedRecord2.push({
            type: type1[0],
            tp1: rec[1],
            tp2: rec[2],
            realDifference: rec[3],
            esv: rec[3],
            esd: rec[4],
            pValue: rec[5],
          });
        });
        return formattedRecord2;
      } else {
        return [];
      }
    },
  },

  created() {
    this.listReturnDate();
    this.listLongitudinalMeasuresOne();
    this.listLongitudinalMeasuresTwo();
    this.listGeography().then(() => {
      this.updateOptions();
    });
  },

  data() {
    return {
      frame1_start_date: "",
      frame1_end_date: "",
      frame2_start_date: "",
      frame2_end_date: "",
      locationChart: locationChart,
      uch: "uch",
      lch: "lch",
      type1: "bar",
      type2: "pie",
      isActive: true,
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
      age_group: "",
      agegroup_options: [
        { name: "Child ≤ 12 Y", value: 1 },
        { name: "Teen 13-18 Y", value: 2 },
        { name: "Adult 19-60 Y", value: 3 },
        { name: "Older Adult ≥ 61 Y", value: 4 },
        { name: "6 Y", value: 5 },
        { name: "12 Y", value: 6 },
        { name: "15 Y", value: 7 },
      ],
      training: [],
      sample_frame: ["Select follow up", "Unselect follow up"],
      checkbox_selected: [1, 2, 3, 4],
      checkbox_options: [
        { text: "Community Outreach", value: 1 },
        { text: "Health Post", value: 2 },
        { text: "Training", value: 4 },
        { text: "School Seminar", value: 3 },
      ],
      checkbox_selected_follow_up: true,
      checkbox_followup_options: [{ text: "Follow up" ,value: 1 }],
      errors: [],
      location: [],
      options: [{ name: "All Location", language: null }],
      user_location: [],
      longitudinalFields: [
        { key: "type", label: "" },
        { key: "tp1", label: "Time Point 1" },
        { key: "tp2", label: "Time Point 2" },
        { key: "realDifference", label: "Real Difference" },
        { key: "esv", label: "Effect size value" },
        { key: "esd", label: "Effect size descriptor" },
        { key: "pValue", label: "P-value for related samples" },
      ],
    };
  },

  methods: {
    ...mapActions([
      "listReturnDate",
      "listLongitudinalMeasuresOne",
      "listLongitudinalMeasuresTwo",
      "listGeography",
    ]),
    checked(){
      if (this.checkbox_selected_follow_up == true){
        this.checkbox_selected_follow_up = true
      }else{
        this.checkbox_selected_follow_up = false
      }
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
    LongitudinalForm() {
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
          .dispatch("CreateLongitudinalOne", {
            frame1_start_date: this.returndate_obj.last_30_days,
            frame1_end_date: this.returndate_obj.today_date,
            frame2_start_date: this.returndate_obj.last_30_days,
            frame2_end_date: this.returndate_obj.today_date,
            reason_for_visit: this.seminar_obj["name"],
            referral_type: this.outreach_obj["name"],
            age_group: this.age_group["name"],
            location: this.user_location,
            activity: this.checkbox_selected,
          })
          .then(() => {
            if (this.errormessage == "errormessage") {
              this.$bvToast.show("error-toast");
            } else if (this.successmessage == "success") {
              this.$bvToast.show("success-toast");
            }
          }),
          this.$store.dispatch("CreateLongitudinalTwo", {
            frame1_start_date: this.returndate_obj.last_30_days,
            frame1_end_date: this.returndate_obj.today_date,
            frame2_start_date: this.returndate_obj.last_30_days,
            frame2_end_date: this.returndate_obj.today_date,
            reason_for_visit: this.seminar_obj["name"],
            referral_type: this.outreach_obj["name"],
            Age_group: this.age_group["name"],
            location: this.user_location,
            activity: this.checkbox_selected,
          });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/index.scss";
</style>
