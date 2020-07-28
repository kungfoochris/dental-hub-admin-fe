<template>
<div id="app">

  <app-header></app-header>
  <div class="contents">
    <div class="row">
      <div class="col-12">
        <h1>Flag</h1>
        <p>
          Flags for encounters modify and deletion
        </p>
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
                       <li><button to="/dashboard">new</button></li>
                       <li><button to="/dashboard">modify</button></li>
                       <li><button to="/dashboard">deleted</button></li>
                       <li><button to="/dashboard">accepted</button></li>
                       <li><button to="/dashboard">rejected</button></li>
                       <li><button to="/dashboard">all</button></li>
                   </ul>
               </div>
           </div>
          <b-form-group>
            <b-input-group>
              <b-input-group-prepend>
                <b-button disabled variant="success" class="search-button"><i class="fas fa-search"></i></b-button>
              </b-input-group-prepend>
              <b-form-input v-model="filter" placeholder="Search for Address"></b-form-input>
              <b-input-group-append>
                <b-button variant="danger" :disabled="!filter" @click="filter = ''" class="search-button">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-table
          id="user-table"
          show-empty
          :items="flag_obj"
          :fields="fields"
          bordered
          :filter="filter"
          @filtered="onFiltered"
          responsive
          hover
          :current-page="currentPage"
          >
            <template v-slot:cell(S.N.)="data">
              {{ data.index + 1 + '.' }}
            </template>

            <template v-slot:cell(reason_for_modification)="row">
              <div v-if="row.item.flag == 'modify'">
              {{row.item.reason_for_modification}}
              </div>
              <div v-else>
                {{row.item.other_reason_for_deletion}}
              </div>
            </template>

            <template v-slot:cell(modify_status)="row">
              <div v-if="row.item.flag == 'modify'">
              {{row.item.modify_status}}
              </div>
              <div v-else>
                {{row.item.delete_status}}
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <b-nav-item-dropdown>
                <template slot="button-content">Edit</template>
                  <b-dropdown-item to=""><b-button variant="outline-primary">Accept Request</b-button></b-dropdown-item>
                  <b-dropdown-item to=""><b-button variant="outline-primary">Reject Request</b-button></b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
          </b-table>
        </div>

    </div>

  </div>
</div>
</template>


<script>

import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue'

// const axios = require('axios');
export default {
  name: "encountermodify",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader
  },
  computed: {
    ...mapState(['flag_obj','token','message','successmessage','errormessage']),
  },

  created(){
    this.listFlags();
  },

  data() {
    return {
      filter: null,
      currentPage: 1,
      errors:[],

      fields: [
        'S.N.',
        { key: 'author.username', label: 'Username',sortable: true},
        { key: 'encounter.patient.full_name', label: 'Name of Patient', sortable: true},
        { key: 'reason_for_deletion', label: 'Reason' },
        { key: 'encounter.encounter_type', label: 'Encounter'},
        { key: 'reason_for_modification', label: 'Modification/Deletion'},
        // { key: 'other_reason_for_deletion', label: 'Deletion Reason'},
        { key: 'flag', label: 'Flag'},
        { key: 'modify_status', label: 'Status'},
        { key: 'actions', label: 'Action' },
      ],
    }
  },

  methods:{
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    ...mapActions(['listFlags']),

    deleteFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'pending','delete_status':'deleted'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Deleted successfully");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },

    editFlag(flag_id){
      this.$store.dispatch("deleteFlag",{'id':flag_id,'modify_status':'approved','delete_status':'pending'} ).then(() => {
        if(this.successmessage=='success'){
          alert("Flag Data is Approved successfully for edit");
          location.reload()
        }else if(this.errormessage=='errormessage'){
          alert(this.message);
          location.reload();

        }
      })
    },


  }
};
</script>

<style lang="scss" scoped>
  @import "../css/encounter.scss";

</style>
