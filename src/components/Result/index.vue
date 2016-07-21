<style src="./index.css" scoped></style>

<template>
  <div class="search-result">
    <div class="search-title">
      找到约<strong>{{count}}</strong>个结果
    </div>
    <div class="search-item" v-for="item in results">
      <a class="result-title" :href="item.sourcePath" target=_blank>
        {{item.sourceTitle}}
      </a>
      <p class="result-content">
        {{item.sourceContent}}
      </p>
      <p class="result-link">
        {{item.sourcePath}}
      </p>
    </div>
  </div>
</template>

<script>
var $ = require('jquery')
import 'jquery-highlight'
export default {
  watch: {
    keyWords: function (newVal, oldVal) {
      this.highlight()
    }
    // results: function(newVal, oldVal) {
    //   // this.results.forEach()
    // }
  },
  methods: {
    highlight () {
      $('.search-result').unhighlight()
      this.keyWords.forEach((key) => {
        $('.search-result').highlight(key)
      })
    }
  },
  vuex: {
    getters: {
      results: state => state.results,
      count: state => state.count,
      keyWords: state => state.keyWords
    }
  }
}
</script>
