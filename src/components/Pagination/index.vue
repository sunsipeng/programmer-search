<style src="./index.css" scoped></style>

<template>
  <div class="pagination">
    <ul class="clearfix">
      <li @click="evtFirstTab"><<</li>
      <li v-if="leftEllipse">...</li>
      <li v-for="item of items"
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
export default {
  data () {
    return {
      currentPage: 1,
      lastPage: 100,
      leftEllipse: false,
      rightEllipse: false,
      items: []
    }
  },
  methods: {
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
      if (currentLastPage <= this.lastPage - 4) {
        this.rightEllipse = true
      } else if (currentLastPage > this.lastPage - 4) {
        this.rightEllipse = false
      }
    },
    setPaginationItems (clickPage) {
      let unit = clickPage - this.currentPage
      if (clickPage > this.currentPage && clickPage >= 4) {
        this.items.forEach((item) => {
          item.index = item.index + unit
        })
      } else if (clickPage < this.currentPage && this.items[0].index > 1) {
        this.items.forEach((item) => {
          item.index = item.index + unit
        })
      }

      if (clickPage === 1) {
        this.items.forEach((item, index) => {
          item.index = index + 1
        })
      } else if (clickPage === this.lastPage) {
        this.items.forEach((item, index) => {
          let curIndex = this.lastPage - this.items.length + index + 1
          item.index = curIndex
        })
      }
    }
  },
  ready () {
    this.initData()
  }
}
</script>
