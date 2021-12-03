import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: null,
    
  },
  mutations: {
    GET_LOGIN_USER: function (state) {
      const token = localStorage.getItem('JWT')
      const config = {
          Authorization: `Bearer ${token}`
      }
      if (token) {
        axios({
          method: 'get',
          url: '/accounts/get/',
          headers: config
        })
        .then(res => {
          state.loginUser = res.data
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    DO_LOGIN: function (state) {
      state.isLogin = true
      // console.log(state.loginUser)
    },
    DO_LOGOUT: function (state) {
      state.isLogin = false
      state.loginUser = null
      // console.log(state.loginUser)
    },
  },
  actions: {
    getLoginUser: function ({commit}) {
      commit('GET_LOGIN_USER')
    },
    doLogin: function ({commit}) {
      // console.log(user)
      commit('DO_LOGIN')
      commit('GET_LOGIN_USER')
    },
    doLogout: function({commit}) {
      commit('DO_LOGOUT')
    },
    refresh: function ({commit}) {
      commit('DO_LOGIN')
      commit('GET_LOGIN_USER')
    }
  },
  modules: {
  }
})
