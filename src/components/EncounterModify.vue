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
      <!-- <div class="col-sm-12 col-md-12 col-lg-6">
        <b-form class="card shadow">
          <h3 class="pb-3">Add Location</h3>
            <b-form-select v-model="ward_selected" class="mb-3">
              <template slot="first">
                <option value="" disabled>Select Your Municipality</option>
              </template>
              <option v-for="ward in wards_obj" :value="ward.id">{{ ward.location }}</option>
            </b-form-select>

            <b-form-input type="text" class="mb-3" v-model="tole" placeholder="Ward Name"></b-form-input>
            <b-button variant="custom" @click="updateWard">Submit</b-button>
        </b-form>
      </div> -->
       <div class="card shadow data-list">
           <div class="link-header">
               <div class="heading">
                    <h3 class="pb-3">Flag</h3>
               </div>
               <div class="links">
                   <ul>
                       <li><button to="/dashboard">new</button></li>
                       <li><button v-on:click="HideItem =!HideItem" to="/dashboard">modify</button></li>
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
          :items="wards_obj"
          :fields="fields"
          bordered
          :filter="filter"
          @filtered="onFiltered"
          responsive
          hover
          :current-page="currentPage"
          >
            <!-- <template  v-slot:cell(S.N.)="data">
              {{ data.index + 1 + '.' }} 
            </template> -->
          </b-table>
        </div>
      <p v-show="!HideItem"> hello</p>
      <p v-show="HideItem">aswin</p>
    </div>

    <!-- <b-toast id="error-toast" variant="warning" solid append-toast toaster="b-toaster-top-center">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Error!!</strong>
      </div>
      <div v-if="message">
        <p v-if="message.length>0">{{message}}</p>
      </div>
      <div v-if="errors.ward_selected">
        <p>{{ errors.ward_selected }}</p>
      </div>
      <div v-if="errors.district_selected">
        <p>{{ errors.district_selected }}</p>
      </div>
      <div v-if="errors.ward">
        <p>{{ errors.ward }}</p>
      </div>
      <div v-if="errors.tole">
        <p>{{ errors.tole }}</p>
      </div>
    </b-toast>

    <b-toast id="success-toast" variant="custom-success" solid append-toast toaster="b-toaster-bottom-full">
      <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
        <strong class="mr-auto">Location Added</strong>
      </div>
        A new location is added.
    </b-toast> -->
  </div>
</div>
</template>


<script>

import { mapState,mapActions } from 'vuex';
import AppHeader from './Header.vue'
import province from "../js/districts.js"

// const axios = require('axios');
export default {
  name: "encountermodify",
  components:{
    // "AuthenticationForm": AuthenticationForm
    'app-header': AppHeader
  },
  computed: {
    ...mapState(['geography','token','message','successmessage','errormessage','address_obj','wards_obj']),
    districts: function(){
      if(this.province_selected != ""){
        return this.address_obj.find(district => district.name == this.province_selected ).municipalities
      }
    },

    wards: function(){
      if(this.district_selected != ""){
        return this.address_obj.find(municipality => municipality.municipalities.name == this.district_selected ).municipalities
      }
    },

    districts_edit: function(){
      if(this.province_selected_edit != ""){
        return this.provinces.find(province => province.name == this.province_selected_edit ).districts
      }
    }
  },

  created(){
    this.listGeography();
    this.listAddress();
    this.listWards();
  },

  data() {
    return {
      ward_selected:'',
      province_selected: '',
      district_selected: '',
      province_selected_edit: '',
      district_selected_edit: '',
      provinces: province,
      tole:'',
      filter: null,
      currentPage: 1,
      street_address:'',
      errors:[],
      geography_obj:'',
      ward_obj:'',
      ward:'',
      HideItem: true,
      fields: [
        'S.N.',
        { key: 'username', label: 'Username',sortable: true},
        { key: 'patient name', label: 'Name of Patient', sortable: true},
        { key: 'encounter', label: 'Encounter' },
        { key: 'modify', label: 'Modify'},
        { key: 'Delete', label: 'Delete'},
        { key: 'status', label: 'Status'},
        { key: 'Action', label: 'Action'},
      ],
    }
  },

  methods:{
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    ...mapActions(['listGeography','listAddress','listWards']),
    updateWard(){
      this.errors=[]
      if(this.ward_selected==''){
        this.errors['ward_selected']="Ward required."
        this.$bvToast.show('error-toast');
      }else if(this.tole==''){
        this.errors['tole']="Ward Name required."
        this.$bvToast.show('error-toast');
      }else(
        this.$store.dispatch("updateWard", {
          'id': this.ward_selected,
          'name':this.tole,
        }).then(() => {
          if(this.successmessage=='success'){
            this.ward_selected = '';
            this.tole = '';
            this.$bvToast.show('success-toast');
          }else if(this.errormessage=='errormessage'){
            this.$bvToast.show('error-toast');

          }
        })
        )

    },

  //   updateGeographyForm(){
  //     this.errors=[]
  //     if(this.province_selected_edit==''){
  //       this.errors['province_selected_edit']="Province required."
  //       this.$bvToast.show('error-toast');
  //     }else if(this.province_selected_edit == ''){
  //       this.errors['district_selected_edit']="District required."
  //       this.$bvToast.show('error-toast');
  //     }else if(this.geography_obj.street_address == ''){
  //       this.errors['street_address'] = "Street Address required."
  //       this.$bvToast.show('error-toast');
  //     }
  //     else{
  //       this.$store.dispatch("updateGeography", {
  //         'state': this.province_selected_edit,
  //         'city':this.district_selected_edit ,
  //         'street_address':this.geography_obj.street_address,
  //         'country':'Nepal',
  //         'id': this.geography_obj.id,
  //       }).then(() => {
  //         if(this.successmessage=='success'){
  //           location.reload()
  //         }else if(this.errormessage=='errormessage'){
  //           this.$bvToast.show('error-toast');

  //         }
  //       })
  //     }
  // },

  deleteGeography(){
    this.$store.dispatch("deleteGeography",this.geography_obj.id)
    .then(() => {
      if(this.successmessage=='success'){
        location.reload()
      }
    })
  },

  getgeographydetail(geography_id){
    this.geography_obj = this.geography.find(evt => evt.id == geography_id)
  },


  }
};
</script>

<style lang="scss" scoped>
  @import "../css/encounter.scss";

</style>
