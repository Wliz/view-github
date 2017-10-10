<template>
  <div id="home">
    <ul>
      <router-link :to="{path: '/repository'}">
        <md-button href="#/repository" class="md-raised md-primary">View My Repositories</md-button>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>