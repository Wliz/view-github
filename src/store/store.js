import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

// 中大型项目可以使用vuex来全局管理状态，但如果是小型项目，可以直接使用父子组件沟通来解决状态管理
Vue.use(Vuex)

// 使用module划分store
const moduleAll = new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ''
  },
  mutations: {
    // 使用常量代替mutations事件类型
    // 使用es6的箭头函数
    [types.LOGIN]: (state, data) => {
      // 使用h5本地缓存保存token数据（上次的）
      localStorage.token = data
      state.token = data
    },
    // 未使用载荷Payload
    // 退出时删除token缓存
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    }
  }
})

export default moduleAll
