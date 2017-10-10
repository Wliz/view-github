<template>
  <div id="login" class="container">
    <!-- 表单提交阻止冒泡行为@submit.stop.prevent -->
    <form class="login-form" novalidate @submit.stop.prevent="login">
      <md-input-container md-has-password>
        <label for="password">GitHub Personal Token(Press Enter)</label>
        <!-- 使用vue的v-model绑定表单提交 -->
        <md-input type="password" id="password" v-model="token"></md-input>
      </md-input-container>
      <md-button type="submit" class="md-raised md-primary">Submit</md-button>
    </form>
    <md-button href="https://github.com/settings/tokens/new" target="_blank" class="md-raised md-primary">Generate Your GitHub Token</md-button>
  </div>
</template>

<script>
import * as types from '@/store/types'

export default {
  name: 'login',
  // 使用函数（避免使用箭头函数，因为箭头函数绑定父上下文，使用this不代表当前vue实例）
  data () {
    return {
      msg: '',
      token: ''
    }
  },
  // 当组件挂载到实例后，回调钩子
  mounted () {
    this.$store.commit(types.TITLE, 'Login')
  },
  methods: {
    login () {
      if (this.token) {
        this.$store.commit(types.LOGIN, this.token)
        // 设置login重定向到当前路由
        let redirect = decodeURIComponent(this.$route.query.redirect || '/')
        // 将该重定向路由交由路由管理
        this.$router.push({
          path: redirect
        })
      }
    }
  }
}
</script>

<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
  .login-form{
    width: 400px;
    margin: 50px auto;
  }
</style>
