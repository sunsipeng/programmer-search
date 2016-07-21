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
      results: []
    }
  },
  methods: {
    search () {
      const data = {
        page: 1,
        title: this.searchVal,
        limit: 10
      }
      this.getTopics(data)
      this.saveSearchKey(this.searchVal)
    },
    evtMoveToTop () {
      const $window = $(window)
      const $search = $('.search')
      let searchPosition = $search.offset().top
      console.log(searchPosition)
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
    this.evtMoveToTop()
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
