module.exports = {
  configureWebpack: {      // 对应 webpack.config.js
    resolve: {     // 路径相关
      alias: {     // 内部默认@对应src
        'assets': '@/assets',   // cli3可使用@代替src，cli2使用src
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}