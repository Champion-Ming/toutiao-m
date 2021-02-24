import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage.js'

Vue.use(Vuex)

const TokenKey = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    user: getItem(TokenKey)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(data))
      setItem(TokenKey, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
