import 'normalize.css'
import './assets/style/base.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routerMap from './router.js'

Vue.use(VueRouter)
const router = new VueRouter()

routerMap(router)
router.start(App, 'app')
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
