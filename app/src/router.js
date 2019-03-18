import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router =  new Router({
  routes: [
    { 
      path: '/',
      redirect: '/index'
    },
    { 
      path: '/index',
      name: 'index', 
      component: () => import('./paths/index.vue')
    },
    { 
      path: '/seller',
      name: 'seller', 
      component: () => import('./paths/seller.vue')
    },
    { 
      path: '/userLogin',
      name: 'userLogin', 
      component: () => import('./paths/userLogin.vue')
    },
    { 
      path: '/manager',
      name: 'manager', 
      component: () => import('./paths/manager.vue')
    },
    { 
      path: '/personal',
      name: 'personal', 
      component: () => import('./paths/personal.vue')
    },
    { 
      path: '/cart',
      name: 'cart', 
      component: () => import('./paths/cart.vue')
    },
    { 
      path: '/test1',
      name: 'test1', 
      component: () => import('./paths/test1.vue')
    },
    { 
      path: '/test2',
      name: 'test2', 
      component: () => import('./paths/test2.vue')
    }
  ]
})

 /* router.beforeEach((to, from, next) => {
  if (to.name === 'pathTest') {
    if (from.name === 'index') {
      if (!router.app.$cookies.get('name')) {         // 注意这里的写法，router.app.$cookies
        router.push({ path: '/err' })
      }
    }
  }
  next()
}) */

export default router