<style src="./index.css" scoped></style>

<template>
  <div class="home">
    <div class="content">
      <h3 class="search-title">码农搜索</h3>
      <div class="search">
        <input type="text" class="ipt-search" placeholder="关键字" v-model="searchVal" @keyup.enter="search"/>
        <button type="button" class="btn-search" @click="search">搜索一下</button>
      </div>
      <result
        :results="results"
        :key-words="keyWords"
        ></result>
      <pagination></pagination>
    </div>
  </div>
</template>

<script>
import api from '../../api/index'
import Result from '../Result/index'
import Pagination from '../Pagination/index'
import { getTopics, saveSearchKey } from '../../vuex/actions'
var $ = require('jquery')
export default {
  data () {
    return {
      searchVal: '',
      keyWords: [],
      results: [],
      page: 1,
      limit: 10,
      searchData: {}
    }
  },
  methods: {
    initParams () {
      const query = this.$route.query
      // console.log(this.$router, this.$router.query)
      if (query) {
        this.page = query.page
        this.limit = query.limit
        this.searchVal = query.title
      }
    },
    initTopics () {
      this.initParams()
      const data = {
        page: this.page || 1,
        title: this.searchVal,
        limit: this.limit || 10
      }
      this.getTopics(data)
      this.saveSearchKey(this.searchVal)
    },
    search () {
      const data = {
        page: 1,
        title: this.searchVal,
        limit: 10
      }
      this.getTopics(data)
      this.saveSearchKey(this.searchVal)
      this.$router.go({name: 'home', query: data})
    },
    evtMoveToTop () {
      const $window = $(window)
      const $search = $('.search')
      let searchPosition = $search.offset().top
      $window.on('scroll', function () {
        let scrollTop = $window.scrollTop()
        if (scrollTop > searchPosition) {
          $search.addClass('moveTop')
        } else {
          $search.removeClass('moveTop')
        }
      })
    }
  },
  route: {
    data: function () {
    }
  },
  ready () {
    this.evtMoveToTop()
    this.initTopics()
  },
  components: {
    result: Result,
    pagination: Pagination
  },
  vuex: {
    actions: {
      getTopics,
      saveSearchKey
    }
  }
}
</script>
