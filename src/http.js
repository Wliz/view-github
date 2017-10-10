// 设置axios的基本配置
import axios from 'axios'
import store from './store/store'
import router from './router/index'
import * as types from './store/types'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'https://api.github.com'

// 设置拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      // token 存在，执行下面操作，在请求头内部赋值token
      config.headers.Authorization = `token ${store.state.token}`
    }
    return config
  },
  error => {
    // 失败调用Promise的reject处理
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401清除token未授权状态码401
          store.commit(types.LOGOUT)
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)

export default axios
