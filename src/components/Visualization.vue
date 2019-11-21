<template>
<div id="app" class="app-content">
  <b-spinner v-show="spinner" variant="primary" type="grow" label="Spinning"></b-spinner>
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
      'loginvisualization','visualizations','settingsvisualization','treatmentvisualizationbarchart','treatmentvisualizationlinechart','treatmentvisualizationlinechart1','treatmentvisualizationlinechart2','wardvisualizationlinechart'
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

    treatmentvisualizationbarchart: function(){
      if(this.treatmentvisualizationbarchart.locationChart){
        this.createTreatmentBarChart(this.tag);
      }
    },


    treatmentvisualizationlinechart: function(){
      this.spinner = true;
      if(this.treatmentvisualizationlinechart.locationChart){
        this.spinner = false;
        this.createTreatmentLineChart(this.tag);
      }
    },

    treatmentvisualizationlinechart1: function(){
      if(this.treatmentvisualizationlinechart1.locationChart){
        this.createTreatmentLineChart1(this.tag);
      }
    },

    treatmentvisualizationlinechart2: function(){
      if(this.treatmentvisualizationlinechart2.locationChart){
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
    this.listTreatmentLineVisualizationChart();
    this.listTreatmentLineVisualizationChart1();
    this.listTreatmentLineVisualizationChart2();
    this.listWardLineVisualizationChart();
      this.listLoginVisualization();
  },
  methods:{
    ...mapActions(['listVisualization','listVisualizationChart','listVisualizationSettings','listTreatmentBarVisualizationChart','listTreatmentLineVisualizationChart','listWardLineVisualizationChart','listTreatmentLineVisualizationChart1','listTreatmentLineVisualizationChart2','listLoginVisualization']),


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

    createTreatmentBarChart() {
      const ctx = document.getElementById('uch1');
      const _ = new Chart(ctx, {
        type: 'bar',
        data: this.treatmentvisualizationbarchart.locationChart.data,
        options: this.treatmentvisualizationbarchart.locationChart.options,
      });
    },

    createTreatmentLineChart() {
      var randomData = function() {
        return Math.round(Math.random() * 100);
      };
      const ctx = document.getElementById('preventiveRatio');
      const _ = new Chart(ctx, {
        type: 'line',
        data: this.treatmentvisualizationlinechart.locationChart.data,
        options: this.treatmentvisualizationlinechart.locationChart.options,
      });




      const ctx1 = document.getElementById('interventionRatio');
      const __ = new Chart(ctx1, {
        type: 'line',
        data: this.treatmentvisualizationlinechart1.locationChart.data,
        options: this.treatmentvisualizationlinechart1.locationChart.options,
      });




      const ctx2 = document.getElementById('perRecall');
      const ___ = new Chart(ctx2, {
        type: 'line',
        data: this.treatmentvisualizationlinechart2.locationChart.data,
        options: this.treatmentvisualizationlinechart2.locationChart.options,
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
      spinner: false
    }
  },



};
</script>

<style lang="scss" scoped>
  @import '../css/style.scss';
</style>
