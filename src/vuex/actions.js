import api from '../api'

// 查询数据
export const getTopics = ({ dispatch }, data) => {
  api.getTopics(data).then((ret) => {
    let data = ret.data
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
export const queryCount = ({ dispatch }, data) => {
  api.queryCount(data).then((ret) => {
    let data = ret.data
    dispatch('QUERY_DATABASE', data)
  })
}

export const startFetchData = ({ dispatch }) => {
  let removeData = {
    type: 1
  }
  let reptileData = {
    type: 1,
    maxCount: 60000
  }
  api.removeAll(removeData).then(() => {
    api.startReptile(reptileData)
  })
}

// 显示或隐藏弹框
export const toogleAlert = ({dispatch}, state) => {
  dispatch('TOOGLE_ALERT', state)
}
