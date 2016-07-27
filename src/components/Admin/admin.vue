<style src="./admin.css" scoped></style>

<template>
  <div class="admin">
    <div class="admin-sidebar clearfix">
      <h3 class="title">
        segmentfault文章采集
      </h3>
      <button type="button" name="button" class="btn-start" @click="showAlert">重新开始</button>
      <!-- <button type="button" name="button" class="btn-start" @click="queryDate">查询数量</button> -->
      <div class="sidebar-tips">
        注意：重新开始会清除之前数据库的所有数据
      </div>
    </div>
    <div class="admin-content">
      <div class="data-count">
        当前服务器数据条数为：
        <span class="count">{{count}}</span>
        条
      </div>
      <div class="chart">
        <chart v-ref:chart></chart>
      </div>
    </div>
    <modal-layer></modal-layer>
  </div>
</template>

<script>
import Chart from '../common/Chart/chart.vue'
import ModalLayer from '../common/ModalLayer/modalLayer.vue'
import { queryCount, startFetchData, toogleAlert } from '../../vuex/actions'
export default {
  methods: {
    showAlert () {
      this.toogleAlert(true)
    },
    queryDate () {
      this.queryCount()
    },
    start () {
      const options = {
        type: 'cnode',
        maxCount: 60000
      }
      this.startFetchData(options)
    }
  },
  ready () {
    this.queryDate()
  },
  vuex: {
    getters: {
      count: state => state.count
    },
    actions: {
      queryCount,
      startFetchData,
      toogleAlert
    }
  },
  components: {
    'chart': Chart,
    'modal-layer': ModalLayer
  }
}
</script>
