<style src="./index.css" scoped></style>

<template>
  <div class="pagination">
    <ul class="clearfix">
      <li @click="evtFirstTab"><<</li>
      <li v-if="leftEllipse">...</li>
      <li v-for="item of items"
        class="pagination-item"
        data-id="{{item.index}}"
        :class="{active: this.currentPage === item.index}"
        @click="evtPaginationTab(item.index)">
        {{item.index}}
      </li>
      <li v-if="rightEllipse">...</li>
      <li @click="evtLastTab">>></li>
    </ul>
  </div>
</template>

<script>
import { getTopics } from '../../vuex/actions'
export default {
  data () {
    return {
      currentPage: 1,
      leftEllipse: false,
      rightEllipse: false,
      items: []
    }
  },
  computed: {
    lastPage: function () {
      return Math.floor(this.count / 10)
    }
  },
  methods: {
    searchTopics (index) {
      const data = {
        page: index,
        title: this.searchKey,
        limit: 10
      }
      this.getTopics(data)
    },
    initData () {
      for (let i = 1; i < 6; i++) {
        let item = {
          index: i
        }
        this.items.push(item)
      }
      this.evtFirstTab()
    },
    evtPaginationTab (index) {
      this.evtPagination(index)
      this.searchTopics(index)
    },
    evtFirstTab () {
      this.evtPagination(1)
    },
    evtLastTab () {
      this.evtPagination(this.lastPage)
    },
    evtPagination (clickPage) {
      this.setPaginationItems(clickPage)
      this.addLeftEllipse(clickPage)
      this.addRightEllipse()
      this.currentPage = clickPage
    },
    addLeftEllipse (clickPage) {
      if (clickPage >= 4) {
        this.leftEllipse = true
      } else if (clickPage < 4) {
        this.leftEllipse = false
      }
    },
    addRightEllipse () {
      const len = this.items.length
      const currentLastPage = this.items[len - 1].index
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
          this.items.forEach((item, index) => {
            item.index = currentStartPage + index
          })
        }
      } else if (clickPage < this.currentPage && clickPage <= this.lastPage - 3) {
        if (currentStartPage <= 0) {
          this.resetLeftItmes()
        } else {
          this.items.forEach((item, index) => {
            item.index = currentStartPage + index
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
      this.items.forEach((item, index) => {
        item.index = index + 1
      })
    },
    resetRightItems () {
      this.items.forEach((item, index) => {
        let curIndex = this.lastPage - this.items.length + index + 1
        item.index = curIndex
      })
    }
  },
  ready () {
    this.initData()
  },
  vuex: {
    getters: {
      searchKey: state => state.searchKey,
      count: state => state.count
    },
    actions: {
      getTopics
    }
  }
}
</script>
