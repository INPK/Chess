import Vue from 'vue'
import Router from 'vue-router'
import AuthRegister from '@/components/AuthRegister'
import AuthLogin from '@/components/AuthLogin'
import AuthPasswordEmail from '@/components/AuthPasswordEmail'
import AuthPasswordReset from '@/components/AuthPasswordReset'
import AuthLogout from '@/components/AuthLogout'
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
