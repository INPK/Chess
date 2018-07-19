import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import PasswordEmail from '@/components/PasswordEmail'
import PasswordReset from '@/components/PasswordReset'
import Logout from '@/components/Logout'
import Buildings from '@/components/Buildings'
import BuildingsCreateInfo from '@/components/BuildingsCreateInfo'
import BuildingsCreateProperties from '@/components/BuildingsCreateProperties'
import BuildingsCreateFlatsSchemas from '@/components/BuildingsCreateFlatsSchemas'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.loggedIn) {
    next()
    return
  }
  next('login')
}

export default new Router({
  mode: 'history',
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
      path: '/password/email',
      name: 'PasswordEmail',
      component: PasswordEmail
    },
    {
      path: '/password/reset/:password_code',
      name: 'PasswordReset',
      component: PasswordReset
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
