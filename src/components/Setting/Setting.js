import axios from 'axios';
import Vue from 'vue';
import TeamSetting from './TeamSetting';
import { required } from 'vuelidate/lib/validators';
import { mdbCard, mdbCardBody, mdbCardText, mdbIcon } from 'mdbvue'


export default {
  name: 'setting',
  components: {
    mdbCard,
    mdbIcon,
    mdbCardBody,
    mdbCardText,
    TeamSetting
  },
  data() {
    return {
      loading: true,
      user: [],
      form: {
        name: '',
        surname: '',
      },
      isSubmitted: false,
      isError: false,
      errorHeader: 'error.invalidFields',
      errors: [],
      submitting: false,
    };
  },

  methods: {

    getUser() {
      this.loading = true;
      const url = `${Vue.config.ApiUrl}/user`;
      axios.get(url)
        .then((response) => {
          this.user = response.data;
          this.form = this.user;
          this.loading = false;
        });
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

    sendFormData() {
      this.enableSubmitLoader();
      const url = `${Vue.config.ApiUrl}/admin/user`;
      axios.put(url, this.form)
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
    },

    saved(){
      this.isSubmitted = false;
      this.getUser();
    }
  },

  mounted: function () {
    this.getUser();
  },

  validations: {
    form: {
      name: {
        required
      },
      surname: {
        required
      }
    },
  },

  watch: {
    errors() {
      this.isError = this.errors.length > 0;
    },
  },
};
