<style src="./index.css" scoped></style>

<template>
  <div class="home">
    <div class="content">
      <div class="search">
        <input type="text" class="ipt-search" placeholder="关键字" v-model="searchVal"/>
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
        title: this.searchVal
      }
      api.getTopics(data).then((ret) => {
        this.results = ret.data.results
        this.keyWords = ret.data.keyWords
      })
    }
  },
  ready () {
  },
  components: {
    result: Result,
    pagination: Pagination
  }
}
</script>
