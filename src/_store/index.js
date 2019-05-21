import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from'./alert.module';
import { account } from'./account.module';
 
import createPersistedState from 'vuex-persistedstate'

import routes from '../router/index'

Vue.use(Vuex);
 
export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    alert,
    account,
    routes
  }
});
