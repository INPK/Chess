import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$rootUrl = 'http://172.100.2.15:8000'
const ROOT_URL = Vue.prototype.$rootUrl

const store = new Vuex.Store({
  state: {
    apiKey: localStorage.getItem('apiKey') || null,
    companyHashId: localStorage.getItem('companyHashId') || null,
    buildingInfo: localStorage.getItem('buildingInfo') || null,
    buildingProperties: localStorage.getItem('buildingProperties') || null,
    buildingLayouts: localStorage.getItem('buildingLayouts') || null
  },
  getters: {
    loggedIn (state) {
      return state.apiKey != null
    }
  },
  mutations: {
    set (state, { type, items }) {
      state[type] = items
    },
    storeItem (state, data) {
      let name = data['name']
      state[name] = data
    },
    retrieveAuthData (state, data) {
      state.apiKey = data['apiKey']
      state.companyHashId = data['companyHashId']
    },
    destroyAuthData (state) {
      state.apiKey = null
      state.companyHashId = null
    }
  },
  actions: {
    writeItem (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(ROOT_URL + data['url'], data['data'])
          .then(response => {
            const responseData = JSON.stringify(response.data)
            localStorage.setItem(data['name'], responseData)
            context.commit('storeItem', {
              data: responseData,
              name: data['name']
            })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    retrieveItem (context, credentials) {
      console.log(context, credentials)
    },
    storeLoginData (context, loginData) {
      for (let i in loginData) {
        localStorage.setItem(i, loginData[i])
      }
      context.commit('retrieveAuthData', loginData)
    },
    retrieveAuthData (context, credentials) {
      return new Promise((resolve, reject) => {
        let loginData = JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
        axios.post(ROOT_URL + '/login', loginData)
          .then(response => {
            store.dispatch('storeLoginData', {
              apiKey: response.data.api_key,
              companyHashId: response.data.company_hash_id
            })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyApiKey (context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          let data = JSON.stringify({
            api_key: this.state.apiKey,
            company_hash_id: this.state.companyHashId
          })
          axios.post(ROOT_URL + '/logout', data)
            .then(response => {
              context.commit('destroyAuthData')
              localStorage.clear()
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    registerUser (context, data) {
      return new Promise((resolve, reject) => {
        axios.post(ROOT_URL + '/register', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
})

export default store
