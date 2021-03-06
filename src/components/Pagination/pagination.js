import { getTopics } from '../../vuex/actions'
import $ from 'jquery'
export default {
  data () {
    return {
      currentPage: 1,
      leftEllipse: false,
      rightEllipse: false,
      paginationState: false,
      items: [],
      lastPage: 5
    }
  },
  watch: {
    searchType: function (newVal, oldVal) {
      this.evtFirstTab()
    },
    searchStatus: function () {
      this.evtFirstTab()
    },
    resultsLength: function (newVal, oldVal) {
      let lastPage = Math.ceil(newVal / 10) || 5
      if (lastPage <= 5) {
        this.items = []
        for (var i = 0; i < lastPage; i++) {
          this.items.push(i + 1)
        }
      } else {
        this.items = [1, 2, 3, 4, 5]
      }
      this.lastPage = lastPage
      this.evtPagination(1)
    }
  },
  methods: {
    setItems (currentPage) {
      let currentStartPage = currentPage - Math.floor(this.items.length / 2)
      this.items = this.items.map((item, index) => {
        return currentStartPage + index
      })
    },
    getTopic (index) {
      const data = {
        page: index,
        searchKey: this.searchKey,
        limit: 10,
        type: this.searchType
      }

      this.getTopics(data)
      this.$router.go({name: 'home', query: data})
    },
    init () {
      const page = this.$route.query && +this.$route.query.page
      if (page) {
        this.currentPage = page
        this.setItems(page)
      }
      this.evtPagination(this.currentPage)
    },
    evtPaginationTab (index) {
      this.evtPagination(index)
      this.getTopic(index)
      $(window).scrollTop(0)
    },
    evtFirstTab () {
      if (this.searchKey) {
        this.evtPagination(1)
        this.getTopic(1)
      }
    },
    evtLastTab () {
      this.evtPagination(this.lastPage)
      this.getTopic(this.lastPage)
    },
    evtPagination (clickPage) {
      this.setPaginationItems(clickPage)
      this.addLeftEllipse(clickPage)
      this.addRightEllipse()
      this.currentPage = clickPage
    },
    addLeftEllipse (clickPage) {
      const len = this.items.length
      const currentLastPage = this.items[len - 1]
      if (clickPage >= 4 && currentLastPage < this.lastPage) {
        this.leftEllipse = true
      } else if (clickPage < 4) {
        this.leftEllipse = false
      }
    },
    addRightEllipse () {
      const len = this.items.length
      const currentLastPage = this.items[len - 1]
      // console.log(currentLastPage, this.lastPage)
      if (currentLastPage < this.lastPage) {
        this.rightEllipse = true
      } else if (currentLastPage === this.lastPage) {
        this.rightEllipse = false
      }
    },
    setPaginationItems (clickPage) {
      let len = this.items.length
      let currentStartPage = clickPage - Math.floor(len / 2)
      let currentLastPage = clickPage + Math.floor(len / 2)

      if (clickPage > this.currentPage && clickPage >= 4) {
        if (currentLastPage >= this.lastPage) {
          this.resetRightItems()
        } else {
          this.items = this.items.map((item, index) => {
            return currentStartPage + index
          })
        }
      } else if (clickPage < this.currentPage && clickPage <= this.lastPage - 3) {
        if (currentStartPage <= 0) {
          this.resetLeftItmes()
        } else {
          this.items = this.items.map((item, index) => {
            return currentStartPage + index
          })
        }
      }

      if (clickPage === 1) {
        this.resetLeftItmes()
      } else if (clickPage === this.lastPage) {
        this.resetRightItems()
      }
    },
    resetLeftItmes () {
      this.items = this.items.map((item, index) => {
        return index + 1
      })
    },
    resetRightItems () {
      this.items = this.items.map((item, index) => {
        let curIndex = this.lastPage - this.items.length + index + 1
        return curIndex
      })
    }
  },
  ready () {
    this.init()
  },
  vuex: {
    getters: {
      searchKey: state => state.searchKey,
      resultsLength: state => state.resultsLength,
      searchStatus: state => state.searchStatus,
      searchType: state => state.searchType
    },
    actions: {
      getTopics
    }
  }
}
