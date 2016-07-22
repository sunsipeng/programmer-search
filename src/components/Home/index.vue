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
    initTopics () {
      const query = this.$route.query
      if (query.page) {
        this.searchVal = query.title
        this.getTopics(query)
        this.saveSearchKey(this.searchVal)
      }
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
  ready () {
    this.initTopics()
    this.evtMoveToTop()
  },
  components: {
    result: Result,
    pagination: Pagination
  },
  vuex: {
    getters: {
      paginationPage: state => state.paginationPage,
      query: state => state.query
    },
    actions: {
      getTopics,
      saveSearchKey
    }
  }
}
</script>
