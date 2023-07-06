import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:7888/api/hy66',     
      // http://123.207.32.32:8000
      // 上次购买接口：http://152.136.185.210:7878/api/hy66
      timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截
    instance.interceptors.request.use(config => {
      // console.log(config);
      return config;
    }, err => {
      // console.log(err)
    });
    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data;
    }, err => {
      console.log(err);
    })

    // 3.发送真正的网络请求
    // instance()返回的是Promise
    return instance(config)
}

// 本地数据库

// export function requestGood(config) {
//   // 1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://127.0.0.1:8083',
//     timeout: 5000
//   })

//   instance.interceptors.request.use(config => {
//     // console.log(config);
//     return config;
//   }, err => {
//     // console.log(err)
//   });

//   instance.interceptors.response.use(res => {
//     // console.log(res);
//     return res.data;
//   }, err => {
//     console.log(err);
//   })

//   return instance(config)
// }