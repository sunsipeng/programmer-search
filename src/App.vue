<template>
  <div id="app">
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
import Home from './components/Home/home.vue'
import Loading from './components/common/Loading/Loading.vue'
import store from './vuex/stores'

export default {
  components: {
    home: Home,
    loading: Loading
  },
  store
}
</script>
