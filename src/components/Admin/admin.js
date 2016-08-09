import Chart from '../common/Chart/chart.vue'
import ModalLayer from '../common/ModalLayer/modalLayer.vue'
import { queryCount, startFetchData, toogleAlert } from '../../vuex/actions'
export default {
  data () {
    return {
      checkType: 'cnode'
    }
  },
  watch: {
    checkType: function (newVal, oldVal) {
      this.queryDate()
    }
  },
  methods: {
    showAlert () {
      this.toogleAlert(true)
    },
    queryDate () {
      const opts = {
        type: this.checkType
      }
      this.queryCount(opts)
    },
    start () {
      const opts = {
        type: this.checkType
      }
      this.startFetchData(opts)
    }
  },
  ready () {
    this.queryDate()
  },
  vuex: {
    getters: {
      count: state => state.count,
      searchType: state => state.searchType
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
