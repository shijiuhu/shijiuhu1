module.exports = {
  transpileDependencies: true,
  devServer: {
    // host: '127.0.0.1',
    // port: 8080,
    open: true,
    // https: false,
    proxy: {
      '/provinceTree': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/provinceTree': ''
        }
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router',
        'view': '@/view'
      }
    }
  }
}
