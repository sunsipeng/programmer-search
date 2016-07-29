import { showLoading } from '../../../vuex/actions.js'

export default {
  vuex: {
    getters: {
      loadingState: state => state.loadingState
    }
  }
}
