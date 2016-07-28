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