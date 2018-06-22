import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Buildings from '@/components/Buildings'
import BuildingsCreate from '@/components/BuildingsCreate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/buildings',
      name: 'Buildings',
      component: Buildings
    },
    {
      path: '/buildings/create',
      name: 'BuildingsCreate',
      component: BuildingsCreate
    }
  ]
})
