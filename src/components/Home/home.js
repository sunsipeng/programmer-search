import api from '../../api/index'
import Result from '../Result/result'
import Pagination from '../Pagination/pagination'
import { getTopics, saveSearchKey, toggleSearch } from '../../vuex/actions'
const $ = require('jquery')
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
        this.searchVal = query.searchKey
        this.getTopics(query)
        this.saveSearchKey(this.searchVal)
      }
    },
    search () {
      const data = {
        page: 1,
        searchKey: this.searchVal,
        limit: 10,
        type: 'cnode'
      }
      this.toggleSearch()
      this.saveSearchKey(this.searchVal)
      this.$router.go({ name: 'home', query: data })
    },
    evtMoveToTop () {
      const $window = $(window)
      const $search = $('.search')
      let searchPosition = $search.offset().top
      $window.on('scroll', function () {
        let scrollTop = $window.scrollTop()
          // if (scrollTop > searchPosition) {
          //   $search.addClass('moveTop')
          // } else {
          //   $search.removeClass('moveTop')
          // }
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
      saveSearchKey,
      toggleSearch
    }
  }
}