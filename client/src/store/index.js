import Vue from 'vue'
import Vuex from 'vuex'

import { users } from './user.module';
import { alert } from './alert.module';
import { todos } from './todo.module';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alert,
    users,
    todos
  }
})
