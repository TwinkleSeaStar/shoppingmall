import { createApp } from 'vue'
import App from './App.vue'
import router from './router'              // 导入router
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload-next' 

// 在Vue2.x中可以通过事件总线EventBus的方法来实现组件通信。
// 在Vue3.x中移除了on,off等方法,而是推荐使用mitt代替。
// Vue2.x：Vue实例可以作为事件总线
// Vue.prototype.$bus = new Vue()  



// Vue2.x 插件方式封装toast
// 1.导入index.js文件
// import toast from 'components/common/toast'
// 2.安装toast插件
// Vue.use(toast)   // 只要调用Vue.use(obj)，就会执行obj.install函数(src/components/common/toast/index.js)



// 解决移动端点击300ms延迟
FastClick.attach(document.body)

const app = createApp(App)
app.use(router).use(store)

// 使用懒加载的插件
app.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png'),   // 占位图
})

app.mount('#app')

// createApp(App).use(router).use(store).mount('#app')     // 挂载router






// setTimeout()会被放到下一次事件循环再执行，本身内部有延迟时间
// console.log('aaaa');

// setTimeout(() => {
//   console.log('bbbb');
// })

// console.log('cccc');

// aaaa -> cccc -> bbbb



// 1.类的继承
// class Animal {
//   run() {

//   }
// }

// class Person extends Animal {
//   run() {

//   }
// }

// class Dog extends Animal {
//   run() {

//   }
// }





