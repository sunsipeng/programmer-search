import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  results: [],
  keyWords: [],
  count: '',
  searchKey: ''
}

const mutations = {
  GET_TOPICS (state, data) {
    state.results = data.results
    state.keyWords = data.keyWords
    state.count = data.count
    console.log(data.results)
  },
  SAVE_SEARCH_KEY (state, key) {
    state.searchKey = key
  }
}

export default new Vuex.Store({
  state,
  mutations
})
