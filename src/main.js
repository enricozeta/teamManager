// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'mdbvue/build/css/mdb.css'
import { store } from './_store/index'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

import Vuelidate from 'vuelidate';

import moment from 'moment'

Vue.config.ApiUrl = process.env.VUE_APP_API;
Vue.config.env = process.env.NODE_ENV;
Vue.config.productionTip = false;

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(Vuelidate);

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})

axios.interceptors.request.use((config) => {
  if (sessionStorage.getItem('token')) {
    console.log("eccolo");
    const tokenData = sessionStorage.getItem('token')
    config.headers['Authorization'] = 'Bearer ' + tokenData
  }
  return config
}, (error) => {
  console.log('request failed')
  return Promise.reject(error)
})


