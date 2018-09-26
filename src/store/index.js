import Vue from 'vue'
import Vuex from 'vuex'
import * as axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$rootUrl = 'http://172.100.2.15:8000'
// Vue.prototype.$rootUrl = 'http://127.0.0.1:8000'
const ROOT_URL = Vue.prototype.$rootUrl

const store = new Vuex.Store({
  state: {
    apiKey: localStorage.getItem('apiKey') || null,
    companyHashId: localStorage.getItem('companyHashId') || null,
    buildings: localStorage.getItem('buildings') || null,
    currentHouseId: localStorage.getItem('currentHouseId') || null,
    houseFloors: localStorage.getItem('houseFloors') || null,
    properties: localStorage.getItem('properties') || null,
    flatsSchemas: localStorage.getItem('flatsSchemas') || null,
    currentBuildingStoreIndex: localStorage.getItem('currentBuildingStoreIndex') || null,
    currentHouseStoreIndex: localStorage.getItem('currentHouseStoreIndex') || null
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
      let name = data.name
      state[name] = data.fields
    },
    destroyItem (state, name) {
      state[name] = null
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
    setItemToStore (context, data) {
      // const responseJson = JSON.stringify(data.response)
      localStorage.setItem(data.storageName, data.fields)
      context.commit('storeItem', {
        name: data.storageName,
        fields: data.fields
      })
    },
    destroyItemFromStore (context, name) {
      localStorage.removeItem(name)
      context.commit('destroyItem', name)
    },
    sendToServer (context, data) {
      return new Promise((resolve, reject) => {
        // console.info('URL', ROOT_URL + data.url, 'METHODS', data.method, 'DATA', data.fields)
        axios({
          url: ROOT_URL + data.url,
          method: data.method,
          data: data.fields,
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
          .then(response => {
            /* context.dispatch('setItemToStore', {
              storageName: data.storageName,
              fields: response.data
            }) */
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    writeItem (context, data) {
      data.method = 'POST'
      return context.dispatch('sendToServer', data)
    },
    updateItem (context, data) {
      data.method = 'PUT'
      return context.dispatch('sendToServer', data)
    },
    removeItem (context, data) {
      data.method = 'DELETE'
      return context.dispatch('sendToServer', data)
    },
    retrieveItem (context, data) {
      data.method = 'GET'
      return context.dispatch('sendToServer', data)
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
