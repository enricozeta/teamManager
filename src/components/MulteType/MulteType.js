import axios from 'axios';
import Vue from 'vue';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon} from 'mdbvue'

export default {
  name: 'multeType',
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
      fields: {
        descrizione: {
          label: 'Descrizione',
        },
        valore: {
          label: 'Valore',
          formatter: value => value + ' €',
        }
      },
      id: null,
      loading: true,
      multeTypes: [],
    };
  },

  methods: {

    getMulteTypes() {
      this.loading = true;
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/multaType/enabled/all`;
      axios.get(url)
        .then((response) => {
          this.multeTypes = response.data;
          this.loading = false;
        });
    },

    rowSelected(item) {
      this.$router.push({
        name: 'NewMultaType',
        query: {
          id: item[0].id,
        },
      });
    },
  },
  computed: {
    rows() {
      return this.multeTypes.length
    }
  },
  mounted: function () {
    this.getMulteTypes();
  }
};
