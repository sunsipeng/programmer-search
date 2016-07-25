import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

const API_ROOT = 'http://localhost:3001'

const HomeResource = Vue.resource(API_ROOT + '/topics')
const AdminResource = Vue.resource(API_ROOT + '/admin{/id}')

export default {
  getTopics (options) {
    return HomeResource.get(options)
  },
  queryCount (options) {
    return AdminResource.get({id: 'query', ...options})
  },
  removeAll (options) {
    return AdminResource.save({id: 'removeAll'}, options)
  },
  startReptile (options) {
    return AdminResource.save({id: 'reptile'}, options)
  }
}
