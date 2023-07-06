// vuex4.x 写法
import { createStore } from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = () => {
  return {
      cartList: []              // cartList: [{商品1}, {商品2}, {商品3}]
    }
}

const store = createStore({
  state,
  mutations,
  actions,
  getters
});

// 3.挂载到Vue实例上
export default store



// vuex3.x 写法

// import Vue from 'vue'
// import Vuex from 'vuex'

// // 1.安装插件
// Vue.use(Vuex)

// // 2.创建Store对象
// const store = new Vuex.Store({
//     state: {
//       cartList: []
//     },
//     mutations: {
//       addCart(state, payload) {
//         state.cartList.push(payload)
//       }
//     }
// })