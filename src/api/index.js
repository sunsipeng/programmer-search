import Vue from 'vue'
import vueResource from 'vue-resource'

Vue.use(vueResource)

// HTTP相关
Vue.http.options.crossOrigin = true

const API_ROOT = 'http://10.31.30.97:3001'

const HomeResource = Vue.resource(API_ROOT + '/topics')

export default {
  getTopics (data) {
    return HomeResource.save(data)
  }
}
