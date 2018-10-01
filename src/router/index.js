import Vue from 'vue'
import Router from 'vue-router'

import Maincover from '@/components/Maincover'
import Inapp from '@/components/inapp/Inapp'

import ClientList from '@/components/inapp/clientlist/ClientList'
import ManageClient from '@/components/inapp/manageclient/ManageClient'

// client children
import Customer from '@/components/inapp/manageclient/children/Customer'
import Social from '@/components/inapp/manageclient/children/Social'
import Competitor from '@/components/inapp/manageclient/children/Competitor'

Vue.use(Router)

export let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Maincover',
      component: Maincover
    },
    {
      path: '/inapp',
      redirect: '/inapp/clientlist',
      name: 'Inapp',
      component: Inapp,
      children: [
        {
          path: 'clientlist',
          name: 'ClientList',
          component: ClientList
        },
        {
          path: 'client',
          redirect: 'client/customer',
          name: 'ManageClient',
          component: ManageClient,
          children: [
            {
              path: 'customer',
              name: 'Customer',
              component: Customer
            },
            {
              path: 'social',
              name: 'Social',
              component: Social
            },
            {
              path: 'competitor',
              name: 'Competitor',
              component: Competitor
            }
          ]
        }
      ]
    }

  ]
});


// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if(to.matched.length === 0) next(false);
  else next();
});
