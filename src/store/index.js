import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'

Vue.use(Vuex)

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
        axios.post(data['url'], data['data'])
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
    retrieveAuthData (context, credentials) {
      return new Promise((resolve, reject) => {
        let loginData = JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
        axios.post('http://127.0.0.1:8000/login', loginData)
          .then(response => {
            const apiKey = response.data.api_key
            const companyHashId = response.data.company_hash_id
            localStorage.setItem('apiKey', apiKey)
            localStorage.setItem('companyHashId', companyHashId)
            context.commit('retrieveAuthData', {
              apiKey,
              companyHashId
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
          axios.post('http://127.0.0.1:8000/logout', data)
            .then(response => {
              localStorage.removeItem('apiKey')
              localStorage.removeItem('companyHashId')
              context.commit('destroyAuthData')
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
        let registerData = JSON.stringify(data)
        axios.post('http://127.0.0.1:8000/register', registerData)
          .then(response => {
            const apiKey = response.data.api_key
            const companyHashId = response.data.company_hash_id
            localStorage.setItem('apiKey', apiKey)
            localStorage.setItem('companyHashId', companyHashId)
            context.commit('retrieveAuthData', {
              apiKey,
              companyHashId
            })
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
