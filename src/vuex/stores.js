import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  results: [],
  keyWords: [],
  count: 0,
  searchKey: '',
  searchStatus: false
}

const mutations = {
  GET_TOPICS (state, data) {
    state.results = data.results
    state.keyWords = data.keyWords
    state.count = data.count
  },
  SAVE_SEARCH_KEY (state, key) {
    state.searchKey = key
  },
  TOGGLE_SEARCH (state, searchStatus) {
    state.searchStatus = !state.searchStatus
  }
}

export default new Vuex.Store({
  state,
  mutations
})
