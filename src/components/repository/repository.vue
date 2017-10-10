<template>
  <div id="repository" class="container">
    <md-layout md-gutter v-for="repo in list" :key="repo.name">
      <md-card md-with-hover class="repos-card">
        <md-card-header md-with-hover="true">
          <md-card-content style="text-align: left">
            <div class="md-title">{{repo.name}}</div>
            <div class="md-subhead">{{repo.description}}</div>
          </md-card-content>
          <md-card-media>
            <img :src="repo.owner.avatar_url" alt="people">
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <div class="repo-mark">
            <span class="md-subhead" v-if="repo.language">
              <md-icon>location_on</md-icon>
              <span>{{repo.language}}</span>
            </span>
            <span class="md-subhead" v-if="repo.stargazers_count">
              <md-icon>stars</md-icon>
              <span>{{repo.stargazers_count}}</span>
            </span>
            <span class="md-subhead" v-if="repo.forks_count">
              <md-icon>forks</md-icon>
              <span>{{repo.forks_count}}</span>
            </span>
            <span class="md-subhead">
              <md-icon>update</md-icon>
              <span>{{repo.updated_at}}</span>
            </span>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button>View Details</md-button>
        </md-card-actions>
      </md-card>
    </md-layout>
  </div>
</template>

<script>
  import api from '@/constant/api'
  import * as types from '@/store/types'

  export default {
    name: 'repository',
    // 避免使用箭头函数，因为箭头函数绑定的是父上下文，this获取非当前vue实例
    data () {
      return {
        msg: '',
        list: []
      }
    },
    // 生命周期钩子，挂载到实例后调用钩子
    mounted () {
      this.$store.commit(types.TITLE, 'Your Repositories')
      this.getRepository()
    },
    methods: {
      getRepository () {
        let params = { sort: 'updated' }
        this.axios.get(api.repo_list, params)
          .then(response => {
            this.list = response.data
          })
      }
    }
  }
</script>

<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
  .repos-card {
    width: 600px;
    margin: 10px auto;
    .repo-mark {
      text-align: left;
      position: absolute;
      bottom: 15px;
    }
  }
</style>
