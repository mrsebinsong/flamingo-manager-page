import { getCookie } from '@/../static/js/helperFunctions.js'

import Vue from 'vue'
import Router from 'vue-router'

import Maincover from '@/components/Maincover'
import Inapp from '@/components/inapp/Inapp'

import ClientList from '@/components/inapp/clientlist/ClientList'
import ManageClient from '@/components/inapp/manageclient/ManageClient'

// client children
import Customer from '@/components/inapp/manageclient/children/Customer'
import Social from '@/components/inapp/manageclient/children/social/Social'
import Competitor from '@/components/inapp/manageclient/children/competitor/Competitor'
import Eventpage from '@/components/inapp/manageclient/children/Event'
import CSVpage from '@/components/inapp/manageclient/children/CSV'
import APIpage from '@/components/inapp/manageclient/children/API'

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
      meta: {
        requiresAuth: true
      },
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
            },
            {
              path: 'event',
              name: 'Event',
              component: Eventpage
            },
            {
              path: 'csv',
              name: 'CSV',
              component: CSVpage
            },
            {
              path: 'api',
              name: 'API',
              component: APIpage
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
  else if( to.matched.some( record => record.meta.requiresAuth ) ){
    if( getCookie('flamingoAdminToken') ) next();
    else {
      alert("you have to sign in first to get an access to the requested page.");
      next(false);
    }
  }
  else next();
});
