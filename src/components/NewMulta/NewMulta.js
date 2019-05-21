import axios from 'axios';
import Vue from 'vue';
import { required } from 'vuelidate/lib/validators';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon } from 'mdbvue'
import moment from 'moment';


export default {
  name: 'newMulta',
  components: {
    mdbCard,
    mdbIcon,
    mdbCardBody,
    mdbCardText
  },
  data() {
    return {
      title: 'NUOVA MULTA',
      save: 'Nuova multa aggiunta',
      loading: true,
      players: [],
      multeTypes: [],
      multaType: [],
      multa: [],
      multaTypeIsDisable: false,
      multaTypeDisable: [],
      isSubmitted: false,
      isError: false,
      errorHeader: 'error.invalidFields',
      errors: [],
      submitting: false,
      updating: false,
      form: {
        playerId: '',
        multeType: '',
        multeTypeId: '',
        descrizione: '',
        valore: 0,
        data: '',
        pagata: false,
      },
    };
  },

  methods: {

    getMulta() {
      var multaId = this.$route.query.id;
      if (multaId != undefined && multaId != '') {
        console.log(multaId);
        this.loading = true;
        const url = `${Vue.config.ApiUrl}/multa?id=` + multaId;
        axios.get(url)
          .then((response) => {
            this.form = response.data;
            this.multa = response.data;
            this.form.data = moment(response.data.data).format('YYYY-MM-DD');
            this.title = 'MODIFICA MULTA';
            this.save = 'Multa aggiornata';
            this.getMultaType(response.data.multeTypeId).then(() => {
              this.updating = true;
              this.loading = false;
            });
          });
      } else {
        this.form.data = new Date().toISOString().slice(0,10);
        this.loading = false;
      }
    },

    setPlayer(){
      var playerId = this.$route.query.playerId;
      if(playerId != undefined && playerId != ''){
        this.form.playerId = playerId;
      }
    },

    remove() {
      const url = `${Vue.config.ApiUrl}/admin/multa?id=` + this.$route.query.id;
      axios.delete(url)
        .then(() => {
          this.$router.push({
            name: 'Player',
            query: {
              id: this.form.playerId
            },
          });
        });
    },

    getMultaType(id) {
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/multaType?id=` + id;
      return axios.get(url)
        .then((response) => {
          this.form.multeType = response.data;
          if (!response.data.enabled) {
            this.multaTypeIsDisable = true;
            this.multaTypeDisable = response.data;
          }
        });
    },

    getPlayers() {
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/player/all`;
      return axios.get(url)
        .then((response) => {
          this.players = response.data;
        });
    },

    getMulteTypes() {
      this.selected = true;
      const url = `${Vue.config.ApiUrl}/multaType/enabled/all`;
      return axios.get(url)
        .then((response) => {
          this.multeTypes = response.data;
        });
    },

    goTo() {
      this.$router.push({
        name: 'Player',
        query: {
          id: this.form.playerId,
        },
      });
    },

    setValue() {
      this.form.valore = this.form.multeType.valore;
    },

    disableSubmitLoader() {
      this.submitting = false;
    },

    enableSubmitLoader() {
      this.submitting = true;
    },

    getErrors() {
      const errors = [];

      Object.keys(this.form).forEach((field) => {
        try {
          if (this.getValidationField(field).$error) {
            errors.push({
              field,
              message: null,
            });
          }
        } catch (error) {
          return error;
        }
      });

      return errors;
    },

    getFieldClasses(field) {
      return {
        'is-invalid': this.isErrorField(field),
      };
    },

    getValidationField(field) {
      if (this.$v.form[field]) {
        return this.$v.form[field];
      }
      throw Error(`No validation for field ${field}`);
    },

    isErrorField(field) {
      try {
        if (this.getValidationField(field).$error) {
          return true;
        }
      } catch (error) {
        return error;
      }

      return this.errors.some(el => el.field === field);
    },

    onFieldBlur(field) {
      try {
        this.getValidationField(field).$touch();
        if (this.getValidationField(field).$error) {
          if (!this.errors.some(el => el.field === field)) {
            this.errors.push({
              field,
              message: null,
            });
          }
        } else {
          this.errors = this.errors.filter(el => el.field !== field);
        }
      } catch (error) {
        return error;
      }
    },

    reload() {
    },

    sendFormData() {
      this.enableSubmitLoader();
      this.form.multeTypeId = this.form.multeType.id;
      this.form.descrizione = this.form.multeType.descrizione;
      axios.post(`${Vue.config.ApiUrl}/admin/multa`, this.form)
        .then((response) => {
          this.submitSuccess(response);
          this.disableSubmitLoader();
        }).catch((error) => {
          this.submitError(error);
          this.disableSubmitLoader();
        });
    },

    submit() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.sendFormData();
      } else {
        this.validationError();
      }
    },

    submitError(error) {
      this.errorHeader = 'error.general';
      this.errors = [{
        field: null,
        message: error,
      }];
      this.isError = true;
    },

    submitSuccess(response) {
      if (response.status === 200) {
        this.isSubmitted = true;
        this.isError = false;
      } else {
        this.errorHeader = 'Unexpected Error';
        this.errors = response.data.errors;
        this.isError = true;
      }
    },

    validationError() {
      this.errorHeader = 'error.invalidFields';
      this.errors = [];
      this.isError = true;
      this.submitting = false
    }
  },

  mounted: function () {
    Promise.all([this.getPlayers(),this.getMulteTypes(), this.setPlayer()]).then(()=>{
      this.getMulta();
    });
  },

  validations: {
    form: {
      playerId: {
        required,
      },
      multeType: {
        required,
      },
      valore: {
        required,
      },
      data: {
        required,
      },
      pagata: {
      },
    },
  },

  watch: {
    errors() {
      this.isError = this.errors.length > 0;
    },
  },
};
