<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deeppink">
      <template v-slot:item-icon><img src="~assets/img/tabbar/home.svg" alt=""></template>      <!-- src里面使用别名需要加~ -->  <!--vue3需要使用v-slot -->
      <template v-slot:item-icon-active><img src="~assets/img/tabbar/home_active.svg" alt=""></template>
      <template v-slot:item-text><div>首页</div></template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
      <template v-slot:item-icon><img src="~assets/img/tabbar/category.svg" alt=""></template>
      <template v-slot:item-icon-active><img src="~assets/img/tabbar/category_active.svg" alt=""></template>
      <template v-slot:item-text><div>分类</div></template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
      <template v-slot:item-icon><img src="~assets/img/tabbar/shopcart.svg" alt=""></template>
      <template v-slot:item-icon-active><img src="~assets/img/tabbar/shopcart_active.svg" alt=""></template>
      <template v-slot:item-text><div>购物车</div></template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <template v-slot:item-icon><img src="~assets/img/tabbar/profile.svg" alt=""></template>
      <template v-slot:item-icon-active><img src="~assets/img/tabbar/profile_active.svg" alt=""></template>
      <template v-slot:item-text><div>我的</div></template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
// build/webpack.base.conf.js 中定义 alias: {'@': resolve('src')} ，相当于给 src 文件夹起别名@
// 注：修改了配置相关的文件 webpack.base.conf.js，需要kill terminal，重新 npm run dev
// import TabBar from '../components/tabbar/TabBar'
// 等价于
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>