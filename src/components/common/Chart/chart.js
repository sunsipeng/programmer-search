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
      const dom = document.getElementById('main')
      const myChart = echarts.init(dom)
      const xData = this.initXdata()
      const yData = this.initYdata()
      const option = {
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
        const nowData = (new Date()).toLocaleTimeString().replace(/^\D*/, '')
        const count = this.count ? this.count : 0
        option.series[0].data.shift()
        option.series[0].data.push(count)
        option.xAxis[0].data.shift()
        option.xAxis[0].data.push(nowData)
        myChart.setOption(option)
        this.updateCount()
      }, 5000)
    },
    initXdata () {
      const res = []
      let now = new Date()
      let len = 10
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
        now = new Date(now - 2000)
      }
      return res
    },
    initYdata () {
      const res = []
      const count = this.count ? this.count : 0
      let len = 0
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