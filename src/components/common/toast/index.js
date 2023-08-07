// Vue2.x 插件方式封装toast

import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  // console.log('执行了obj的install函数', Vue)

  // 方法一：无法实现，Toast.$el为undifined，还没挂载
  // console.log(Toast.$el)
  // document.body.appendChild(Toast.$el)
  // Vue.prototype.$toast = Toast;

  // 方法二：使用组件构造器
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  // 2.通过new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()
  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = Toast;
}

export default obj    // default 在 import 时可改 obj 名字