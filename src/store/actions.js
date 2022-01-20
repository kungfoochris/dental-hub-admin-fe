const axios = require("axios");

export default {
  listReturnDate({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/returndate")
      .then((response) => {
        if (response.status == 200) {
          commit("setReturnDate", response.data);
        }
      });
  },
  updateProfile({ state, commit }, updateprofile) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put("https://app.abhiyantrik.com/api/v1/profile/update", updateprofile)
      .then((response) => {
        commit("setSuccessMessage", "success");
        state.profile.push(response.data);
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
        }
      });
  },

  listUsers({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/users", {})
      .then((response) => {
        commit("setUsers", response.data);
      });
  },

  createUser({ state, commit }, user_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post("https://app.abhiyantrik.com/api/v1/users", user_obj)
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
          state.users.push(response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  updateUser({ state, commit }, user_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put("https://app.abhiyantrik.com/api/v1/users/" + user_obj.id, user_obj)
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
          state.users.push(response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },
  deleteUser({ state, commit }, user_id) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .delete("https://app.abhiyantrik.com/api/v1/users/" + user_id)
      .then((response) => {
        if (response.status == 204) {
          commit("setSuccessMessage", "success");
          state.users.push(response.data);
        }
      });
  },

  updateUserStatus({ state, commit }, user_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/userstatus/" + user_obj.userid,
        user_obj
      )
      .then((response) => {
        if (response.status == 200) {
          var userdetail;
          if (user_obj.status_obj == false || user_obj.status_obj == "false") {
            userdetail = state.users.find((evt) => evt.id == user_obj.userid);
            userdetail.active = "true";
          } else if (
            user_obj.status_obj == true ||
            user_obj.status_obj == "true"
          ) {
            userdetail = state.users.find((evt) => evt.id == user_obj.userid);
            userdetail.active = "false";
          }
        }
        commit("setSuccessMessage", "success");
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  listActivitie({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/events", {})
      .then((response) => {
        commit("setActivities", response.data);
      });
  },

  listGeography({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/geography", {})
      .then((response) => {
        commit("setGeography", response.data);
      });
  },

  createGeography({ state, commit }, geography_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post("https://app.abhiyantrik.com/api/v1/geography", geography_obj)
      .then((response) => {
        commit("setSuccessMessage", "success");
        state.geography.push(response.data);
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  updateGeography({ commit }, geography_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put(
        "https://app.abhiyantrik.com/api/v1/geography/" + geography_obj.id,
        geography_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  deleteGeography({ state, commit }, geography_id) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .delete("https://app.abhiyantrik.com/api/v1/geography/" + geography_id)
      .then((response) => {
        if (response.status == 204) {
          commit("setSuccessMessage", "success");
          state.geography.push(response.data);
        }
      });
  },

  changePassword({ commit }, password_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/users/changepassword",
        password_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  resetPassword({ commit }, resetpassword_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/adminresetpassword",
        resetpassword_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  listRole({ commit }) {
    return axios
      .get("https://app.abhiyantrik.com/api/v1/roles")
      .then((response) => {
        if (response.status == 200) {
          commit("setRole", response.data);
        }
      });
  },

  listLoginVisualization({ commit }) {
    return axios
      .get("https://app.abhiyantrik.com/api/v1/loginvisualization")
      .then((response) => {
        if (response.status == 200) {
          commit("setLoginVisualization", response.data);
        }
      });
  },

  listLoginVisualization1({ commit }) {
    return axios
      .get("https://app.abhiyantrik.com/api/v1/loginvisualization1")
      .then((response) => {
        if (response.status == 200) {
          commit("setLoginVisualization1", response.data);
        }
      });
  },
  // 1.6 Contacts Over Time
  listDashboardLineChartGraph({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/dashboardlinechart")
      .then((response) => {
        if (response.status == 200) {
          commit("setDashboardLineChartGraph", response.data);
        }
      });
  },
  // 1.1 Overview
  listOverviewTable({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/overviewvisualization")
      .then((response) => {
        if (response.status == 200) {
          commit("setOverviewTable", response.data);
        }
      });
  },

  CreateOverViewVisualization({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/overviewvisualization",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setOverviewTable", response.data);
          commit("setBasicVisulizationSuccess", "success");
        }
      });
  },
  // 1.4 Treatment By Activity Table
  listTreatmentbyActivity({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/treatmentactivities")
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentbyActivity", response.data);
        }
      });
  },

  CreateTreatmentbyActivity({ commit }, treatmentactivitie_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentactivities",
        treatmentactivitie_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentbyActivity", response.data);
        }
      });
  },
  // 1.5 Treatment By Ward
  listTreatmentbyWard({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/treatmentwards")
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentbyWard", response.data);
        }
      });
  },

  CreateTreatmentbyWard({ commit }, treatmentward_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentwards",
        treatmentward_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setErrorMessage", "");
          commit("setSuccessMessage", "success");
          commit("setTreatmentbyWard", response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  // 1.2 Treatment Distribution
  listOverviewBarGraph({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/treatmentdistribution")
      .then((response) => {
        if (response.status == 200) {
          commit("setOverviewBarGraph", response.data);
        }
      });
  },

  CreateTreatmentBarGraph({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentdistribution",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setOverviewBarGraphPost", response.data);
          // commit("setOverviewBarGraph",response.data);
        }
      });
  },

  // 1.3 Activity Distribution
  listOverviewPieChartGraph({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/activitydistribution")
      .then((response) => {
        if (response.status == 200) {
          commit("setOverviewPieChartGraph", response.data);
        }
      });
  },
  CreateDashboardPieChart({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/activitydistribution",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setDashboardPieChartPost", response.data);
          // commit("setOverviewPieChartGraph",response.data);
        }
      });
  },

  // 2.1 Preventative Overview
  listTreatmentTableBasicData({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/treatment")
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentTableBasicData", response.data);
        }
      });
  },

  // 2.2 Strategic Data
  listTreatmentStrategicData({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/treatmentstrategicdatas")
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentStrategicData", response.data);
        }
      });
  },

  listWards({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/wards")
      .then((response) => {
        if (response.status == 200) {
          commit("setWards", response.data);
        }
      });
  },

  listUserWards({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/userwards")
      .then((response) => {
        if (response.status == 200) {
          commit("setUserWards", response.data);
        }
      });
  },

  updateWard({ state, commit }, ward_id_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put(
        "https://app.abhiyantrik.com/api/v1/wards/" + ward_id_obj.id,
        ward_id_obj
      )
      .then((response) => {
        state.wards_obj.push(response.data);
        commit("setSuccessMessage", "success");
      });
  },

  // 3.1 Cross-Sectional Measures
  listSectionalTable({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return (
      axios
        // .get("https://app.abhiyantrik.com/api/v1/sectional")
        .get("https://app.abhiyantrik.com/api/v1/crosssectional")
        .then((response) => {
          if (response.status == 200) {
            commit("setSectionalTable", response.data);
          }
        })
    );
  },

  //2.3 Preventive Ratio Over Time
  listTreatmentPreventionRatio({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/preventionratio")
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentPreventionRatio", response.data);
        }
      });
  },

  // 2.4 Early Intervention Ratio
  listEarlyIntervention({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/earlyintervention")
      .then((response) => {
        if (response.status == 200) {
          commit("setEarlyIntervention", response.data);
        }
      });
  },

  // 2.5 Recall Percentage
  listRecallDistribution({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/recalldistribution")
      .then((response) => {
        if (response.status == 200) {
          commit("setRecallDistribution", response.data);
        }
      });
  },

  CreateWardLineVisualization({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/wardlineVisualizationfilter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setWardLineVisualizationChart", response.data);
        }
      });
  },

  CreateTreatmentPageBarVisualization({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentnargraphfilter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentBarVisualizationChart", response.data);
        }
      });
  },

  CreateTreatmentPageGenderVisualization(
    { commit },
    overviewvisualization_obj
  ) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/visualizationsfilter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setVisualization", response.data);
        }
      });
  },

  CreateTreatmentBasicDataTable({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentfilter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTable3", response.data);
        }
      });
  },

  CreateTreatmentPageTreatmentTable({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/table2filter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTable4", response.data);
        }
      });
  },

  CreateTreatmentStrategicData({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/table3filter",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTable5", response.data);
        }
      });
  },

  CreateTableBasicDataVisualization({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatment",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setTreatmentTableBasicData", response.data);
        }
      });
  },

  CreateStrategicDataVisualization({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/treatmentstrategicdatas",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setErrorMessage", "");
          commit("setSuccessMessage", "success");
          commit("setTreatmentStrategicData", response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  listLongitudinalMeasuresOne({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/longitudinalone")
      .then((response) => {
        if (response.status == 200) {
          commit("setLongitudinalMeasuresOne", response.data);
        }
      });
  },

  listLongitudinalMeasuresTwo({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/longitudinaltwo")
      .then((response) => {
        if (response.status == 200) {
          commit("setLongitudinalMeasuresTwo", response.data);
        }
      });
  },

  CreateSectionalTable({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/crosssectional",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setErrorMessage", "");
          commit("setSuccessMessage", "success");
          commit("setSectionalTable", response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  CreateLongitudinalOne({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/longitudinalone",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setErrorMessage", "");
          commit("setSuccessMessage", "success");
          commit("setLongitudinalMeasuresOne", response.data);
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  CreateLongitudinalTwo({ commit }, overviewvisualization_obj) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .post(
        "https://app.abhiyantrik.com/api/v1/longitudinaltwo",
        overviewvisualization_obj
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setLongitudinalMeasuresTwo", response.data);
        }
      });
  },

  listFlags({ commit }) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .get("https://app.abhiyantrik.com/api/v1/modifydelete")
      .then((response) => {
        if (response.status == 200) {
          commit("setFlags", response.data);
        }
      });
  },

  deleteFlag({ commit }, flag_id) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put(
        "https://app.abhiyantrik.com/api/v1/encounterstatus/" + flag_id.id,
        flag_id
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  restoreFlag({ commit }, flag_id) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put(
        "https://app.abhiyantrik.com/api/v1/encounterrestore/" + flag_id.id,
        {}
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },

  editFlag({ commit }, flag_id) {
    axios.defaults.headers.common["authorization"] = "JWT " + this.state.token;
    return axios
      .put(
        "https://app.abhiyantrik.com/api/v1/encounterstatus/" + flag_id.id,
        flag_id
      )
      .then((response) => {
        if (response.status == 200) {
          commit("setSuccessMessage", "success");
        }
      })
      .catch((error) => {
        if (error) {
          commit("setErrorMessage", "errormessage");
          commit("setMessage", error.response.data.message);
        }
      });
  },
};
