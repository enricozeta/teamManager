import axios from 'axios';
import Vue from 'vue';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon, mdbLineChart } from 'mdbvue'

export default {
  name: 'home',
  components: {
    mdbCard,
    mdbIcon,
    mdbCardBody,
    mdbCardText,
    mdbLineChart
  },
  data() {
    return {
      loading: true,
      team: [],
      chartData: [],
      currentPageWorst: 1,
      currentPageBest: 1,
      bests: [],
      worst: [],
      fields: {
        name: {
          label: '',
        },
        multePagate: {
          label: 'Pagato',
          formatter: value => value + ' €',
        },
        multeNonPagate: {
          label: 'Da pagare',
          formatter: value => value + ' €',
        }
      },
      lineChartData: {
        labels: [],
        datasets: [
          {
            label: 'Multe pagate €',
            backgroundColor: 'rgba(90, 173, 246, 0.5)',
            data: []
          },
          {
            backgroundColor: '#f05b51',
            data: []
          }
        ]
      },
      lineChartOptions: {
        responsive: true,
        legend: false,
        maintainAspectRatio: true,
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 5,
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
            },
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          ]
        }
      }
    };
  },

  methods: {

    getTeam() {
      this.loading = true;
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/team`;
      axios.get(url)
        .then((response) => {
          this.team = response.data;
        });
    },

    getChartData() {
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/team/chartData`;
      axios.get(url)
        .then((response) => {
          var label = [];
          var data = [];
          response.data.forEach(element => {
            if (element.day != undefined && element.day != '') {
              label.push(element.day + "/" + element.month + "/" + element.year);
            }else{
              label.push(element.month + "/" + element.year);
            }
            data.push(element.value);
          });
          this.lineChartData.labels = label;
          this.lineChartData.datasets[0].data = data;
          console.log(this.lineChartData);
          this.loading = false;
        });
    },

    getBestWorst() {
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/team/best`;
      axios.get(url)
        .then((response) => {
          this.bests = response.data;
          const url = `${Vue.config.ApiUrl}/team/worst`;
          axios.get(url).then((response) => {
            this.worst = response.data;
          });
        });
    },



    rowSelected(item) {
      this.$router.push({
        name: 'Player',
        query: {
          id: item[0].id,
        },
      });
    }

  },
  computed: {
    rows() {
      return this.worst.length
    }
  },
  mounted: function () {
    Promise.all([this.getTeam(), this.getBestWorst()]).then(() => {
      this.getChartData();
    });
  }
};
