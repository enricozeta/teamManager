import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon } from 'mdbvue'


export default {
  name: 'player',
  components: {
    mdbCard,
    mdbIcon,
    mdbCardBody,
    mdbCardText
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: {
        descrizione: {
          label: 'Multa',
        },
        valore: {
          label: 'Valore',
          formatter: value => value + ' €',
        },
        data: {
          label: 'Data',
          formatter: value => moment(String(value)).format('DD/MM/YYYY'),
        },
        pagata: {
          label: 'Pagata',
        }
      },
      id: null,
      loading: true,
      player: [],
      multe: [],
    };
  },

  methods: {

    getPlayer() {
      this.loading = true;
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/player?id=` + this.$route.query.id;
      axios.get(url)
        .then((response) => {
          this.player = response.data;
          this.multe = this.player.multe;
          this.loading = false;
        });
    },

    rowSelected(item) {
      this.$router.push({
        name: 'NewMulta',
        query: {
          id: item[0].id,
        },
      });
    },

    isPagata(item) {
      console.log("multa:" + item);
      item.pagata = !item.pagata;
      const url = `${Vue.config.ApiUrl}/admin/multa`;
      axios.post(url, item)
        .then((response) => {
          this.getPlayer()
        }).catch((error) => {
          console.log(error);
        });
    },

    newMulta() {
      this.$router.push({
        name: 'NewMulta',
        query: {
          playerId: this.player.id,
        },
      });
    },

    remove() {
      const url = `${Vue.config.ApiUrl}/admin/player?id=` + this.$route.query.id;
      axios.delete(url)
        .then(() => {
          this.$router.push({
            name: 'Players',
          });
        });
    },

    disable() {
      const url = `${Vue.config.ApiUrl}/admin/player/disabled?id=` + this.$route.query.id;
      axios.post(url)
        .then(() => {
          const url = `${Vue.config.ApiUrl}/admin/player/deleteMulte?id=` + this.$route.query.id;
          axios.post(url, this.player.multe).then(() => {
            this.$router.push({
              name: 'Players',
            });
          })
        });
    },

  },

  computed: {
    rows() {
      return this.multe.length
    },
    paid() {
      return (this.player.multePagate * 100) / (this.player.multeNonPagate + this.player.multePagate);
    }
  },
  mounted: function () {
    this.getPlayer();
  }
};
