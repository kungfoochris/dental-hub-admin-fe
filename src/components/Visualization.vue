<template>
<div id="app" class="app-content">
  <canvas :id="tag"></canvas>
  <!-- <div class="row pr-4">
    <small class="ml-auto"><a href=""><i class="fas fa-file-export mr-1"></i>Export Now</a></small>
  </div> -->
</div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
export default {
  name: "Visualization",
  props:["tag"],
  components:{
  },
  mounted: function(){
    // write a condition to check visualization has been set in state
    //  no need to pass cleanData

  },
  computed: {
    ...mapState([
      'loginvisualization','visualizations','settingsvisualization','treatmentvisualizationbarchart','preventionrati_obj','treatmentvisualizationlinechart1','treatmentvisualizationlinechart2','wardvisualizationlinechart','earlyintervention_obj','recalldistribution_obj'
    ])
  },
  watch: {
    visualizations: function(){
    if(this.visualizations.locationChart){
          this.createGenderChart(this.tag);
        }
    },

    settingsvisualization: function(){
      if(this.settingsvisualization.locationChart){
        this.createSettingsChart(this.tag);
      }
    },

    // treatmentvisualizationbarchart: function(){
    //   if(this.treatmentvisualizationbarchart.locationChart){
    //     this.createTreatmentBarChart(this.tag);
    //   }
    // },


    preventionrati_obj: function(){
      if(this.preventionrati_obj.locationChart){
        this.createTreatmentLineChart(this.tag);
      }
    },

    earlyintervention_obj: function(){
      if(this.earlyintervention_obj.locationChart){
        this.createTreatmentLineChart1(this.tag);
      }
    },

    recalldistribution_obj: function(){
      if(this.recalldistribution_obj.locationChart){
        this.createTreatmentLineChart2(this.tag);
      }
    },


    wardvisualizationlinechart: function(){
      if(this.wardvisualizationlinechart.locationChart){
        this.createWardLineChart(this.tag);
      }
    },

    loginvisualization: function(){
      if(this.loginvisualization.locationChart){
        this.createLoginPiChart();
      }
    },
  },

  created(){
    this.listVisualizationSettings();
    this.listVisualization();
    this.listVisualizationChart();
    this.listTreatmentBarVisualizationChart();
    this.listTreatmentPreventionRatio();
    this.listWardLineVisualizationChart();
    this.listLoginVisualization();
    this.listEarlyIntervention();
    this.listRecallDistribution();


  },
  methods:{
    ...mapActions(['listEarlyIntervention','listRecallDistribution','listVisualization','listVisualizationChart','listVisualizationSettings','listTreatmentBarVisualizationChart','listTreatmentPreventionRatio','listWardLineVisualizationChart','listTreatmentLineVisualizationChart1','listTreatmentLineVisualizationChart2','listLoginVisualization']),


    createSettingsChart() {
      const ctx = document.getElementById('settingsgraph');
      const _ = new Chart(ctx, {
        type: 'bar',
        data: this.settingsvisualization.locationChart.data,
        options: this.settingsvisualization.locationChart.options,
      });
    },

    createGenderChart() {
      const ctx = document.getElementById('uch');
      const _ = new Chart(ctx, {
        type: 'bar',
        data: this.visualizations.locationChart.data,
        options: this.visualizations.locationChart.options,
      });
    },

    // createTreatmentBarChart() {
    //   const ctx = document.getElementById('uch1');
    //   const _ = new Chart(ctx, {
    //     type: 'bar',
    //     data: this.treatmentvisualizationbarchart.locationChart.data,
    //     options: this.treatmentvisualizationbarchart.locationChart.options,
    //   });
    // },

    createTreatmentLineChart() {
      var randomData = function() {
        return Math.round(Math.random() * 100);
      };
      const ctx = document.getElementById('preventiveRatio');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.preventionrati_obj.locationChart.data,
        options: this.preventionrati_obj.locationChart.options,
      });
    },

    createTreatmentLineChart1() {
      const ctx1 = document.getElementById('interventionRatio');
      const __ = new Chart(ctx1, {
        type: 'line',
        data: this.earlyintervention_obj.locationChart.data,
        options: this.earlyintervention_obj.locationChart.options,
      });
    },


    createTreatmentLineChart2() {
      const ctx2 = document.getElementById('perRecall');
      const ___ = new Chart(ctx2, {
        type: 'line',
        data: this.recalldistribution_obj.locationChart.data,
        options: this.recalldistribution_obj.locationChart.options,
      });
    },


    createWardLineChart() {
      const ctx = document.getElementById('lch6');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.wardvisualizationlinechart.locationChart.data,
        options: this.wardvisualizationlinechart.locationChart.options,

      });
    },

    createLoginPiChart(){
      const ctx = document.getElementById('piechart');
      const _ = new Chart(ctx, {
        type: 'pie',
        data: this.loginvisualization.locationChart.data,
        options: this.loginvisualization.locationChart.options,

      });

    }
  },

  data(){
    return{

    }
  },



};
</script>

<style lang="scss" scoped>
  @import '../css/style.scss';
</style>
