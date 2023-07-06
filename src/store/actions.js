import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  // actions中除了放异步操作，还可以将mutations中复杂的判断逻辑放在actions中。

  addCart(context, payload) {
    // payload：新添加的商品

    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品
      // 方法一：
      // let oldProduct = null
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      // 方法二：
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)       //返回满足条件的值

      // 2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else {
        payload.count =1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}