<template>
  <div id="app">
    <app-header></app-header>
    <div class="contents">
      <div class="row">
        <div class="col-12">
          <h1>Flag</h1>
          <p>Flags for encounters modify and deletion</p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="card shadow data-list">
          <div class="link-header">
            <div class="heading">
              <h3 class="pb-3">Flag</h3>
            </div>
            <div class="links">
              <ul>
                <!-- <li><button to="/dashboard">new</button></li>
                      <li><button to="/dashboard">modify</button></li>
                      <li><button to="/dashboard">deleted</button></li>
                      <li><button to="/dashboard">accepted</button></li>
                      <li><button to="/dashboard">rejected</button></li>
                <li><button to="/dashboard">all</button></li>-->
                <li>
                  <button
                    v-for="(flagButton, index) in flagTabs"
                    :key="index"
                    @click="buttonIndex = index"
                  >{{ flagButton.type }}</button>
                </li>
              </ul>
            </div>
          </div>
    <!-- <div class="row mt-4">
       <div class="card shadow data-list">
           <div class="link-header">
               <div class="heading">
                    <h3 class="pb-3">Flag</h3>
               </div>
               <div class="links">
                <b-col lg="6" class="my-1">
                 <b-button-group
                  label="Filter On"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  description="Leave all unchecked to filter on all data"
                  class="mb-0">
                    <b-button-group v-model="filterOn" class="mt-1">
                    <b-button value="new">New</b-button>
                    <b-button value="modify">Modify</b-button>
                    <b-button value="delete">Delete</b-button>
                    <b-button value="accepted">Accepted</b-button>
                    <b-button value="rejected">Rejected</b-button>
                    <b-button value="isActive">All</b-button>
                  </b-button-group>
                  </b-button-group>
                </b-col>

               </div>
           </div> -->
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled variant="success" class="search-button">
                  <i class="fas fa-search"></i>
                </b-button>
              </b-input-group-prepend>
              <b-form-input v-model="filter" placeholder="Search for Address"></b-form-input>
              <b-input-group-append>
                <b-button
                  variant="danger"
                  :disabled="!filter"
                  @click="filter = ''"
                  class="search-button"
                >Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
            id="user-table"
            show-empty
            :items="userFilter"
            :fields="fields"
            bordered
            :filter="filter"
            @filtered="onFiltered"
            responsive
            hover
            :current-page="currentPage"
          >
            <template v-slot:cell(S.N.)="data">{{ data.index + 1 + '.' }}</template>

            <template v-slot:cell(reason_for_modification)="row">
              <div v-if="row.item.flag == 'modify'">{{row.item.reason_for_modification}}</div>
              <div v-else>{{row.item.other_reason_for_deletion}}</div>
            </template>

            <template v-slot:cell(modify_status)="row">
              <div v-if="row.item.flag == 'modify'">{{row.item.modify_status}}</div>
              <div v-else>{{row.item.delete_status}}</div>
            </template>
            <template v-slot:cell(actions)="row">
              <!-- <b-nav-item-dropdown>
                <template slot="button-content">Edit</template>
                <b-dropdown-item to>
                  <b-button variant="outline-primary">Accept Request</b-button>
                </b-dropdown-item>
                <b-dropdown-item to>
                  <b-button variant="outline-primary">Reject Request</b-button>
                </b-dropdown-item>
              </b-nav-item-dropdown> -->
              <b-dropdown right split text="Edit">
                  <b-dropdown-item to=""><b-button variant="outline-primary">Accept Request</b-button></b-dropdown-item>
                  <b-dropdown-item to=""><b-button variant="outline-primary">Reject Request</b-button></b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import AppHeader from "./Header.vue";

// const axios = require('axios');
export default {
  name: "encountermodify",
  components: {
    // "AuthenticationForm": AuthenticationForm
    "app-header": AppHeader,
  },
  computed: {
    ...mapState([
      "flag_obj",
      "token",
      "message",
      "successmessage",
      "errormessage",
    ]),
    userFilter() {
      let all_data = this.flag_obj;

      if (this.buttonIndex == 1) {
        all_data = all_data.filter((row) => {
          return row.modify_status == "pending";
        });
      }
      if (this.buttonIndex == 2) {
        all_data = all_data.filter((row) => {
          return row.flag == "modify";
        });
      }
      if (this.buttonIndex == 3) {
        all_data = all_data.filter((row) => {
          return row.flag == "delete";
        });
      }
      if (this.buttonIndex == 4) {
        all_data = all_data.filter((row) => {
          return row.modify_status == "accepted";
        });
      }
      if (this.buttonIndex == 5) {
        all_data = all_data.filter((row) => {
          return row.modify_status == "rejected";
        });
      }
      return all_data;
    },
  },

  created() {
    this.listFlags();
  },

  data() {
    return {
      filter: null,
      currentPage: 1,
      errors: [],
      userFilterKey: "modify",
      buttonIndex: 0,
      flagTabs: [
        {
          type: "all",
          isActive: false,
        },
        {
          type: "new",
          isActive: false,
        },
        {
          type: "modify",
          isActive: false,
        },
        {
          type: "deleted",
          isActive: false,
        },
        {
          type: "accepted",
          isActive: false,
        },
        {
          type: "rejected",
          isActive: false,
        },
      ],

      fields: [
        "S.N.",
        { key: "author.username", label: "Username", sortable: true },
        {
          key: "encounter.patient.full_name",
          label: "Name of Patient",
          sortable: true,
        },
        { key: "reason_for_deletion", label: "Reason" },
        { key: "encounter.encounter_type", label: "Encounter" },
        { key: "reason_for_modification", label: "Modification/Deletion" },
        // { key: 'other_reason_for_deletion', label: 'Deletion Reason'},
        { key: "flag", label: "Flag" },
        { key: "modify_status", label: "Status" },
        { key: "actions", label: "Action" },
      ],
    };
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    ...mapActions(["listFlags"]),

    deleteFlag(flag_id) {
      this.$store
        .dispatch("deleteFlag", {
          id: flag_id,
          modify_status: "pending",
          delete_status: "deleted",
        })
        .then(() => {
          if (this.successmessage == "success") {
            alert("Flag Data is Deleted successfully");
            location.reload();
          } else if (this.errormessage == "errormessage") {
            alert(this.message);
            location.reload();
          }
        });
    },

    editFlag(flag_id) {
      this.$store
        .dispatch("deleteFlag", {
          id: flag_id,
          modify_status: "approved",
          delete_status: "pending",
        })
        .then(() => {
          if (this.successmessage == "success") {
            alert("Flag Data is Approved successfully for edit");
            location.reload();
          } else if (this.errormessage == "errormessage") {
            alert(this.message);
            location.reload();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/encounter.scss";
</style>
