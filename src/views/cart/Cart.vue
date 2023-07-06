<template>
<div class="cart">
  <nav-bar>
    <template v-slot:center>
      <div class="nav-bar">购物车({{length}})</div>
    </template>
  </nav-bar>

  <cart-list/>

  <cart-bottom-bar/>
</div>
 

  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from 'views/cart/childComps/CartList'
import CartBottomBar from 'views/cart/childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // mapGetters：辅助函数，仅仅是将store中的getter映射到局部计算属性。
    // 两种语法
    // 1.数组形式
    // ...mapGetters(['cartLength', 'cartList'])
    // 2.对象形式
    ...mapGetters({
      length: 'cartLength'
    })
  },
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  
</style>