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
        .get(`${url}/products/store`)
        .then(response => {
          context.commit('SET_ALL_DATA', response.data.data)
        })
        .catch(err => console.log(err))
        .finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  OnDetail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/products/detail/${payload}`).then((response) => {
        context.commit('GET_DETAIL', response.data.data)
        resolve()
        console.log(response)
      }).catch((err) => reject(err))
    })
  },
  onDelete (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/products/delete/${payload}`).then((response) => {
        resolve(response)
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
