import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexPersisted from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  // 持久化储存
  plugins: [
    createVuexPersisted({
      reducer(store) {
        return {
          user: {
            token: store.user.token
          }
        }
      }
    })
  ]
})

export default store
