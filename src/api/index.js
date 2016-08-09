import Vue from 'vue'
import vueResource from 'vue-resource'
import store from '../vuex/stores.js'
import $ from 'jquery'

Vue.use(vueResource)

Vue.http.interceptors.push((request, next) => {
  store.state.loadingState = true
  $('body').addClass('forbid-scroll')
  next((response) => {
    store.state.loadingState = false
    $('body').removeClass('forbid-scroll')
  })
})

const API_ROOT = 'http://127.0.0.1:3001'

const HomeResource = Vue.resource(API_ROOT + '/topics')
const AdminResource = Vue.resource(API_ROOT + '/admin{/id}')

export default {
  getTopics (opts) {
    return HomeResource.get(opts)
  },
  queryCount (opts) {
    return AdminResource.get({id: 'query', ...opts})
  },
  removeAll (opts) {
    return AdminResource.save({id: 'removeAll'}, opts)
  },
  startReptile (opts) {
    return AdminResource.save({id: 'reptile'}, opts)
  }
}
