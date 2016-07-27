<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home/home'
import store from './vuex/stores'

export default {
  components: {
    home: Home
  },
  store
}
</script>
