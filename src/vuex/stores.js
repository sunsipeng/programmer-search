import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  results: [],
  keyWords: [],
  resultsLength: 0,
  count: '',
  searchKey: '',
  searchStatus: false,
  alertStatus: false
}

const mutations = {
  GET_TOPICS (state, data) {
    state.results = data.results
    state.keyWords = data.keyWords
    state.resultsLength = data.resultsLength
  },
  SAVE_SEARCH_KEY (state, key) {
    state.searchKey = key
  },
  TOGGLE_SEARCH (state, searchStatus) {
    state.searchStatus = !state.searchStatus
  },
  QUERY_DATABASE (state, data) {
    state.count = data.count
  },
  TOOGLE_ALERT (state, alertStatus) {
    state.alertStatus = alertStatus
  }
}

export default new Vuex.Store({
  state,
  mutations
})
