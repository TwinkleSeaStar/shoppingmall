import {request, requestGood} from './request';

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',       // /mallGoods/getGoodData
    params: {
      type,
      page
    }
  })
}

// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)

// function test() {
//   const names = ['why', 'aaa']
// }

// test()

// test()

// 往数组里push数组
// let totalNums = []
// const nums1 = [20, 11, 222]
// const nums2 = [111, 22, 333]

// // for(n of nums1) {
// //   totalNums.push(n)
// // }

// //totalNums.push([10, 30, 40, 500, 1111])  // totalNums = [[10, 30, 40, 500, 1111]]

// totalNums.push(...nums1)




