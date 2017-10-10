# view-github

> 使用Vue全家桶+axios实现拦截，登录和退出功能，利用axios的http拦截请求和响应

# 前言
项目是在学习Vue过程中参考[别人作品练习](https://chenhuichao.com/2017/02/17/vue/vue-axios-login/)，自己参考实现；利用GitHub的token授权查看仓库列表。

# 项目结构（github目录）
```
├── README.md
├── dist  // 打包构建后的文件夹
    ├── static
    │    ├──css/*
    │    └──js/*
    ├── index.html
├── package.json
├── src
    ├── App.vue
    ├── assets
    │   ├── css.css
    │   ├── icon.css
    │   └── logo.png
    ├── components
    │   ├── home
    │   │   └── home.vue
    │   ├── login
    │   │   └── login.vue
    │   └── repository
    │       └── repository.vue
    ├── constant
    │   └── api.js
    ├── http.js
    ├── main.js
    ├── router
    │   └── index.js
    └── store
        ├── store.js
        └── types.js
└── webpack.config.js
```


# 技术栈
- Vue 2.0
- Vue-router  // vue2.0推荐替换Vue-reource
- Vuex
- axios

# 登录逻辑
## 第一步：路由
文件：src/router/index.js
```
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
      requireAuth: true // 自定义字段，指示访问该路由需要授权验证
    },
    component: Repository
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
```
定义路由后，使用vue-router的钩子函数对需要授权的路由进行确认(如有不懂，查看[文档](https://router.vuejs.org/zh-cn/))
```
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

```

## 第二步：配置axios替代vue-rousece，基础配置和拦截
文件：src/http.js
```
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
```
以上两步可以实现登录拦截，而退出登录状态只需要清除token即可

## 第三步：创建相关组件（App，Home，Login，Repository）
文件：src/components/*


# 关于axios，重点掌握这几方面基本可以在项目中使用axios
* 发起http请求方法
* http请求成功时返回的数据处理
* http请求失败时处理
* 拦截器使用
* http配置

# 运行以及构建

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
# Tomcat发布问题
webpack打包后生成dist文件夹，index.html文件和static静态文件夹，直接复制到Tomcat应用webapps目录下打开页面空白，需要在打包时修改一处位置即可：

文件：config/index.js
```
assetsPublicPath: '/'
```
=》
```
assetsPublicPath: './'
```