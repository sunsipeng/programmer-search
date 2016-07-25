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
