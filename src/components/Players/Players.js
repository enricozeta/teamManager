import axios from 'axios';
import Vue from 'vue';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon} from 'mdbvue'

export default {
  name: 'players',
  components: {
    mdbCard,
    mdbIcon,
    mdbCardBody,
    mdbCardText
  },
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      totalRows:0,
      filter: null,
      fields: {
        name: {
          label: 'Nome',
        },
        multeNonPagate: {
          label: 'Da Pagare',
          formatter: value => value + ' €',
        },
        multePagate: {
          label: 'Pagate',
          formatter: value => value + ' €',
        }
      },
      id: null,
      loading: true,
      player: [],
      players: [],
    };
  },

  methods: {

    getPlayers() {
      this.loading = true;
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/player/all`;
      axios.get(url)
        .then((response) => {
          this.players = response.data;
          this.loading = false;
        });
    },

    rowSelected(item) {
      this.$router.push({
        name: 'Player',
        query: {
          id: item[0].id,
        },
      });
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  computed: {
    rows() {
      return this.players.length;
    }
  },
  mounted: function () {
    this.getPlayers();
  }
};
