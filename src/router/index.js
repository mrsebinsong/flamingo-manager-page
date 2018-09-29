import Vue from 'vue'
import Router from 'vue-router'
import Maincover from '@/components/Maincover'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Maincover',
      component: Maincover
    }
  ]
})
