import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

const API_ROOT = 'http://216.189.158.161:3001'
// const API_ROOT = 'http://127.0.0.1:3001'

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
