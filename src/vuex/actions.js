import api from '../api'

// 查询数据
export const getTopics = ({ dispatch }, opts) => {
  api.getTopics(opts).then((ret) => {
    dispatch('GET_TOPICS', ret.data)
  })
}

export const saveSearchKey = ({ dispatch }, searchKey) => {
  dispatch('SAVE_SEARCH_KEY', searchKey)
}

export const toggleSearch = ({ dispatch }, searchStatus) => {
  dispatch('TOGGLE_SEARCH', searchStatus)
}

// 查询数据库数据
export const queryCount = ({ dispatch }, opts) => {
  api.queryCount(opts).then((ret) => {
    dispatch('QUERY_DATABASE', ret.data)
  })
}

export const startFetchData = ({ dispatch }, opts) => {
  api.removeAll(opts).then(() => {
    api.startReptile(opts)
  })
}

// 显示或隐藏弹框
export const toogleAlert = ({dispatch}, state) => {
  dispatch('TOOGLE_ALERT', state)
}

export const saveSearchType = ({dispatch}, searchType) => {
  dispatch('SAVE_SEARCH_TYPE', searchType)
}

export const showLoading = ({dispatch}, loadingState) => {
  dispatch('SHOW_LOADGIN', loadingState)
}
