import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Buildings from '@/components/Buildings'
import BuildingsCreateInfo from '@/components/BuildingsCreateInfo'
import BuildingsCreateProperties from '@/components/BuildingsCreateProperties'
import BuildingsCreateFlatsSchemas from '@/components/BuildingsCreateFlatsSchemas'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  console.info(store.getters.loggedIn)
  if (store.getters.loggedIn) {
    next()
    return
  }
  next('Login')
}

export default new Router({

  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/',
      name: 'Buildings',
      component: Buildings,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/create/info',
      name: 'BuildingsCreateInfo',
      component: BuildingsCreateInfo,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/create/properties',
      name: 'BuildingsCreateProperties',
      component: BuildingsCreateProperties,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/create/flats-schemas',
      name: 'BuildingsCreateFlatsSchemas',
      component: BuildingsCreateFlatsSchemas,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
