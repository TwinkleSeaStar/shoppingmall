<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <keep-alive include='Home, Cart'>
        <component :is="Component"/>
      </keep-alive>
    </router-view>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'

  export default {
    name: "App",
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";
</style>
