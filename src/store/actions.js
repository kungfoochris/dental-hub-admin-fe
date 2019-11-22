const axios = require('axios');

export default {
    // listProfile({commit}){
    //     axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
    //     return axios
    //       .get('http://localhost:6061/api/v1/profile', {})
    //       .then(response => {
    //           commit('setProfile',response.data)
    //       })
    //       .catch(error=>{
    //         if (error.response.status==401){
    //           window.localhost.replace("/logout");
    //         }
    //       })
    //   },

      updateProfile({state,commit}, updateprofile){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('http://localhost:6061/api/v1/profile/update', updateprofile)
        .then(response => {
          commit("setSuccessMessage",'success');
          state.profile.push(response.data)
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage');
            // commit("setMessage", error.response.data.message);
          }
        })
      },

      listUsers({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
          .get('http://localhost:6061/api/v1/users', {})
          .then(response => {
              commit('setUsers',response.data);
          })
      },

      listActivitie({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
          .get('http://localhost:6061/api/v1/events', {})
          .then(response => {
              commit('setActivities',response.data);
          })
      },

      createUser({state,commit}, user_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('http://localhost:6061/api/v1/users', user_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success')
            // commit("setUserobjet",response.data);
            state.users.push(response.data);
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      updateUser({state,commit}, user_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('http://localhost:6061/api/v1/users/'+user_obj.id, user_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success')
            state.users.push(response.data);
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      deleteUser({state,commit},user_id){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .delete('http://localhost:6061/api/v1/users/'+user_id)
        .then(response => {
          if(response.status==204){
            commit("setSuccessMessage",'success')
            state.users.push(response.data);
          }
        })
      },

      listGeography({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
        .get('http://localhost:6061/api/v1/geography', {})
        .then(response => {
          commit('setGeography',response.data);
        })
      },

      createGeography({state,commit}, geography_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('http://localhost:6061/api/v1/geography', geography_obj)
        .then(response => {
          commit("setSuccessMessage",'success')
          state.geography.push(response.data);
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      updateGeography({commit}, geography_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('http://localhost:6061/api/v1/geography/'+ geography_obj.id, geography_obj)
        .then(response => {
          commit("setSuccessMessage",'success')
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      deleteGeography({state,commit},geography_id){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .delete('http://localhost:6061/api/v1/geography/'+geography_id)
        .then(response => {
          if(response.status==204){
            commit("setSuccessMessage",'success')
            state.geography.push(response.data);
          }
        })
      },

      listActivity({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
        .get('http://localhost:6061/api/v1/activities', {})
        .then(response => {
          commit('setActivity',response.data);
        })
      },

      createActivity({state,commit}, activity_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('http://localhost:6061/api/v1/activities', activity_obj)
        .then(response => {
          commit("setSuccessMessage",'success')
          state.activities.push(response.data);
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      UpdateActivity({state,commit}, activity_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('http://localhost:6061/api/v1/activities/'+activity_obj.id, activity_obj)
        .then(response => {
          commit("setSuccessMessage",'success')
          state.activities.push(response.data);
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      deleteActivity({state,commit},activity_id){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .delete('http://localhost:6061/api/v1/activities/'+activity_id)
        .then(response => {
          if(response.status==204){
            commit("setSuccessMessage",'success')
            state.geography.push(response.data);
          }
        })
      },

      changePassword({commit}, password_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('http://localhost:6061/api/v1/users/changepassword', password_obj)
        .then(response => {
          if(response.status==200){
          commit("setSuccessMessage",'success');
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },


      listVisualization({commit}){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .get('http://localhost:6061/api/v1/visualizations',)
        .then(response => {
          if(response.status==200){
          commit("setVisualization",response.data);
          }
      })
    },

    listVisualizationChart({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/visualizations',)
      .then(response => {
        if(response.status==200){
          commit("setVisualization1",response.data);
        }
      })
    },

    listAddress({commit}){
      return axios
      .get('http://localhost:6061/api/v1/addresses',)
      .then(response => {
        if(response.status==200){
          commit("setAddresses",response.data);
        }
      })
    },

    listRole({commit}){
      return axios
      .get('http://localhost:6061/api/v1/roles',)
      .then(response => {
        if(response.status==200){
          commit("setRole",response.data);
        }
      })
    },

    listLoginVisualization({commit}){
      return axios
      .get('http://localhost:6061/api/v1/loginvisualization',)
      .then(response => {
        if(response.status==200){
          commit("setLoginVisualization",response.data);
        }
      })
    },

    listLoginVisualization1({commit}){
      return axios
      .get('http://localhost:6061/api/v1/loginvisualization1',)
      .then(response => {
        if(response.status==200){
          commit("setLoginVisualization1",response.data);
        }
      })
    },

    updateUserStatus({state,commit}, user_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/userstatus/'+user_obj.userid,user_obj)
      .then(response => {
        if(response.status==200){
          var userdetail
          if(user_obj.status_obj== false || user_obj.status_obj== "false"){
            userdetail = state.users.find(evt => evt.id == user_obj.userid)
            userdetail.active="true"
          }else if(user_obj.status_obj== true || user_obj.status_obj== "true") {
            userdetail = state.users.find(evt => evt.id == user_obj.userid)
            userdetail.active="false"
            }
          }
          commit("setSuccessMessage",'success')
        })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },


    resetPassword({commit}, resetpassword_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/adminresetpassword', resetpassword_obj)
      .then(response => {
        if(response.status==200){
          commit("setSuccessMessage",'success');
        }
      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },

    listOverview({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/overviewvisualization1',)
      .then(response => {
        if(response.status==200){
          commit("setOverview",response.data);
        }
      })
    },

    listTreatmentbyActivity({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/treatmentactivities',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentbyActivity",response.data);
        }
      })
    },

    listTreatmentbyWard({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/overviewwardtreatmenttable',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentbyWard",response.data);
        }
      })
    },


    listTreatmentTableBasicData({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/treatment',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentTableBasicData",response.data);
        }
      })
    },


    listTreatmentTable({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/treatmenttable',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentTable",response.data);
        }
      })
    },


    listTreatmentStrategicData({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/treatmentstrategicdatas',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentStrategicData",response.data);
        }
      })
    },

    listVisualizationSettings({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/settingsgraph',)
      .then(response => {
        if(response.status==200){
          commit("setVisualizationSettings",response.data);
        }
      })
    },

    listWards({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/wards',)
      .then(response => {
        if(response.status==200){
          commit("setWards",response.data);
        }
      })
    },


    listUserWards({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/userwards',)
      .then(response => {
        if(response.status==200){
          commit("setUserWards",response.data);
        }
      })
    },




    updateWard({state,commit}, ward_id_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .put('http://localhost:6061/api/v1/wards/'+ward_id_obj.id, ward_id_obj)
      .then(response => {
        state.wards_obj.push(response.data)
        commit("setSuccessMessage",'success')
      })
    },

    listSectionalTable({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/sectional',)
      .then(response => {
        if(response.status==200){
          commit("setSectionalTable",response.data);
        }
      })
    },


    listTreatmentBarVisualizationChart({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/treatmentnargraph',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentBarVisualizationChart",response.data);
        }
      })
    },


    listTreatmentPreventionRatio({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/preventionratio',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentPreventionRatio",response.data);
        }
      })
    },

    listEarlyIntervention({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/earlyintervention',)
      .then(response => {
        if(response.status==200){
          commit("setEarlyIntervention",response.data);
        }
      })
    },

    listRecallDistribution({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/recalldistribution',)
      .then(response => {
        if(response.status==200){
          commit("setRecallDistribution",response.data);
        }
      })
    },







    listWardLineVisualizationChart({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('http://localhost:6061/api/v1/wardlineVisualization',)
      .then(response => {
        if(response.status==200){
          commit("setWardLineVisualizationChart",response.data);
        }
      })
    },


    CreateOverViewVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/overviewvisualization1', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setOverview",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },

    CreateTreatmentBarVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/settingsgraphfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setVisualizationSettings",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },


    CreateWardLineVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/wardlineVisualizationfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setWardLineVisualizationChart",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },


    CreateTreatmentPageBarVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/treatmentnargraphfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentBarVisualizationChart",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },


    CreateTreatmentPageGenderVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/visualizationsfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setVisualization",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },


    CreateTreatmentBasicDataTable({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/treatmentfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable3",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },


    CreateTreatmentPageTreatmentTable({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/table2filter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable4",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },

    CreateTreatmentStrategicData({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/table3filter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable5",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },

    CreateTableBasicDataVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/treatment', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentTableBasicData",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },

    CreateStrategicDataVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('http://localhost:6061/api/v1/treatmentstrategicdatas', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentStrategicData",response.data);
          // state.table1_obj.update(response.data);
        }

      })
    },







}
