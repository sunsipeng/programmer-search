import api from '../api'

// 查询数据
export const getTopics = ({ dispatch }, options) => {
  api.getTopics(options).then((ret) => {
    const data = ret.data
    dispatch('GET_TOPICS', data)
  })
}

export const saveSearchKey = ({ dispatch }, searchKey) => {
  dispatch('SAVE_SEARCH_KEY', searchKey)
}

export const toggleSearch = ({ dispatch }, searchStatus) => {
  dispatch('TOGGLE_SEARCH', searchStatus)
}

// 查询数据库数据
export const queryCount = ({ dispatch }) => {
  api.queryCount().then((ret) => {
    const data = ret.data
    dispatch('QUERY_DATABASE', data)
  })
}

export const startFetchData = ({ dispatch }, options) => {
  api.removeAll().then(() => {
    api.startReptile({
      maxCount: 60000
    })
  })
}

// 显示或隐藏弹框
export const toogleAlert = ({dispatch}, state) => {
  dispatch('TOOGLE_ALERT', state)
}
