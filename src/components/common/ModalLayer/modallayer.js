import {toogleAlert, startFetchData} from '../../../vuex/actions'

export default {
  methods: {
    hideAlert () {
      this.toogleAlert(false)
    },
    confirm () {
      this.$parent.start()
      this.toogleAlert(false)
    }
  },
  vuex: {
    getters: {
      alertStatus: state => state.alertStatus
    },
    actions: {
      toogleAlert,
      startFetchData
    }
  }
}
