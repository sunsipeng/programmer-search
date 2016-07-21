<style src="./index.css" scoped></style>

<template>
  <div class="search-result">
    <div class="search-item" v-for="item in results" track-by="$index">
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
  data () {
    return {
    }
  },
  props: {
    results: {
      type: Array
    },
    keyWords: {
      type: Array
    }
  },
  watch: {
    results: function (newVal, oldVal) {
      this.highlight()
    }
  },
  methods: {
    highlight () {
      console.log($('.search-result').highlight)
      this.keyWords.forEach((key) => {
        $('.search-result').highlight(key)
      })
    }
  },
  ready () {
  }
}
</script>
