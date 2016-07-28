import api from '../../api/index'
import Result from '../Result/result'
import Pagination from '../Pagination/pagination'
import { getTopics, saveSearchKey, toggleSearch, saveSearchType } from '../../vuex/actions'
const $ = require('jquery')
export default {
  data () {
    return {
      searchVal: '',
      keyWords: [],
      results: [],
      page: 1,
      limit: 10,
      listStatus: false
    }
  },
  methods: {
    initTopics () {
      const query = this.$route.query
      if (query.page) {
        this.searchVal = query.searchKey
        this.saveSearchKey(this.searchVal)
        this.saveSearchType(query.type)
      }
    },
    search () {
      this.toggleSearch()
      this.saveSearchKey(this.searchVal)
    },
    evtToggleList () {
      this.listStatus = !this.listStatus
    },
    evtToggleItem (searchType) {
      this.saveSearchType(searchType)
      this.listStatus = false
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
      query: state => state.query,
      searchType: state => state.searchType
    },
    actions: {
      getTopics,
      saveSearchKey,
      toggleSearch,
      saveSearchType
    }
  }
}
