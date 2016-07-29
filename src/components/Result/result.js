import $ from 'jquery'
import 'jquery-highlight'
export default {
  watch: {
    keyWords: function (newVal, oldVal) {
      this.highlight()
    }
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
      resultsLength: state => state.resultsLength,
      keyWords: state => state.keyWords
    }
  }
}
