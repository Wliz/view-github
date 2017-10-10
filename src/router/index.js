import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Repository from '@/components/repository/repository'
import Login from '@/components/login/login'
import store from '@/store/store'
import * as types from '@/store/types'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/repository',
    name: 'repository',
    meta: {
      requireAuth: true
    },
    component: Repository
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  // 触发登陆操作
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new Router({
  routes
})

// beforeEach，路由调整from -》 to时触发
router.beforeEach((to, from, next) => {
  // 如果token未授权或者token未填写，则跳转到登陆页面
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
