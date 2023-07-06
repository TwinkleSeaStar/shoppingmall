import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每个方法尽可能完成的事情比较单一一点,不要在一个方法中做多个操作，跟踪不到具体执行了哪个操作
  // 操作可调试跟踪
  [ADD_COUNTER](state, payload) {         // 商品数量加1
    payload.count++
  },
  [ADD_TO_CART](state, payload) {         // 添加新的商品
    payload.checked = true
    state.cartList.push(payload)
  }
}