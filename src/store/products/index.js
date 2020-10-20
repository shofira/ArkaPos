import axios from 'axios'
import { url } from '../../helper/env'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    },
    detail: []
  }
}

const getters = {
  getAll: state => state.all,
  getDetail: (state) => state.detail
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_DETAIL (state, payload) {
    state.detail = payload
  }
}

const actions = {
  onAll (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}/products/store?page=${payload}&limit=3`)
        .then(response => {
          context.commit('SET_ALL_DATA', response.data.data)
          resolve(response.data.totalRows)
        }).catch(err => reject(err))
        .finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  onDetail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/detail/${payload}`).then((response) => {
        context.commit('SET_DETAIL', response.data.data[0])
        resolve()
      }).catch((err) => reject(err))
    })
  },
  onInsert (context, payload) {
    return new Promise((resolve, reject) => {
      const data = new FormData()
      data.append('id_category', payload.id_category)
      data.append('name_product', payload.name)
      data.append('price', payload.price)
      data.append('image', payload.image)
      axios.post(`${url}/products/insert`, data).then((response) => {
        resolve(response)
      }).catch((err) => reject(err))
    })
  },
  onUpdate (context, payload) {
    return new Promise((resolve, reject) => {
      const data = new FormData()
      data.append('id_category', payload.id_category)
      data.append('name_product', payload.name_product)
      data.append('price', payload.price)
      data.append('image', payload.image)
      axios.patch(`${url}/products/update/${payload.id}`, data)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  },
  onDelete (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/products/delete/${payload}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  },
  onSearch (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/store?search=${payload}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
  },
  onSortProductAsc (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/store?sort=${payload}&typeSort=asc`)
        .then((result) => {
          context.commit('SET_ALL_DATA', result.data.data)
          resolve()
        }).catch((err) => reject(err))
    })
  },
  onSortProductDesc (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/store?sort=${payload}&typeSort=desc`)
        .then((result) => {
          context.commit('SET_ALL_DATA', result.data.data)
          resolve()
        }).catch((err) => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
