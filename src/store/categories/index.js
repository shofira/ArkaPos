import axios from 'axios'
import { url } from '../../helper/env'

const state = () => {
  return {
    all: {
      data: [],
      isLoading: false
    }
  }
}

const getters = {
  getAll: (state) => state.all
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  }
}

const actions = {
  onAll (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/categories/store`).then((response) => {
        context.commit('SET_ALL_DATA', response.data.data)
      }).catch((err) => console.log(err)).finally(() => { context.commit('SET_ALL_LOADING', false) })
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
