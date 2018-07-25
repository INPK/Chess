import Vue from 'vue'
import Router from 'vue-router'
import AuthRegister from '@/components/AuthRegister'
import AuthLogin from '@/components/AuthLogin'
import AuthPasswordEmail from '@/components/AuthPasswordEmail'
import AuthPasswordReset from '@/components/AuthPasswordReset'
import AuthLogout from '@/components/AuthLogout'
import Buildings from '@/components/Buildings'
import BuildingsInfo from '@/components/BuildingsInfo'
import BuildingsFloors from '@/components/BuildingsFloors'
import BuildingsFloorsMarkup from '@/components/BuildingsFloorsMarkup'
import BuildingsProperties from '@/components/BuildingsProperties'
import BuildingsFlatsSchemas from '@/components/BuildingsFlatsSchemas'
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
  // mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: AuthRegister
    },
    {
      path: '/login',
      name: 'Login',
      component: AuthLogin
    },
    {
      path: '/password/email',
      name: 'PasswordEmail',
      component: AuthPasswordEmail
    },
    {
      path: '/password/reset/:password_code',
      name: 'PasswordReset',
      component: AuthPasswordReset
    },
    {
      path: '/logout',
      name: 'Logout',
      component: AuthLogout
    },
    {
      path: '/',
      name: 'Buildings',
      component: Buildings,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/info',
      name: 'BuildingsInfo',
      component: BuildingsInfo,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/properties',
      name: 'BuildingsProperties',
      component: BuildingsProperties,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/flats-schemas',
      name: 'BuildingsFlatsSchemas',
      component: BuildingsFlatsSchemas,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/floors',
      name: 'BuildingsFloors',
      component: BuildingsFloors,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/buildings/floors/markup',
      name: 'BuildingsFloorsMarkup',
      component: BuildingsFloorsMarkup,
      beforeEnter: ifNotAuthenticated
    }
  ]
})
