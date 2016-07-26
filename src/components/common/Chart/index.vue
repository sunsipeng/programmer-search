<style src='./index.css' scoped></style>

<template>
  <div class='charts' id='main'>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      initStatus: false
    }
  },
  watch: {
    count: function () {
      if (!this.initStatus) {
        this.initCharts()
        this.initStatus = true
      }
    }
  },
  methods: {
    updateCount () {
      this.$parent.queryDate()
    },
    initCharts () {
      var dom = document.getElementById('main')
      var myChart = echarts.init(dom)
      var xData = this.initXdata()
      var yData = this.initYdata()
      var option = {
        title: {
          text: '爬取数据详情'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '数据量',
            data: yData
          }
        ],
        series: [
          {
            name: '最新抓取数据',
            type: 'line',
            data: yData
          }
        ]
      }
      this.dynamicChart(option, myChart)
      myChart.setOption(option)
    },
    dynamicChart (option, myChart) {
      let app = {}
      clearInterval(app.timeTicket)
      app.timeTicket = setInterval(() => {
        var nowData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
        var count = this.count ? this.count : 0
        option.series[0].data.shift()
        option.series[0].data.push(count)
        option.xAxis[0].data.shift()
        option.xAxis[0].data.push(nowData)
        myChart.setOption(option)
        this.updateCount()
      }, 5000)
    },
    initXdata () {
      var now = new Date()
      var res = []
      var len = 10
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        now = new Date(now - 2000)
      }
      return res
    },
    initYdata () {
      var res = []
      var len = 0
      var count = this.count ? this.count : 0
      while (len <= 10) {
        res.push(count)
        len++
      }
      return res
    }
  },
  vuex: {
    getters: {
      count: state => state.count
    }
  }
}
</script>
