const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  lintOnSave: false,
  devServer: {
    // 设置为0.0.0.0则所有的地址均能访问
    host: "0.0.0.0",
    // port: 8080,
    https: false,
    // 跨域问题解决 代理（关键部分）
    proxy: {
      "/api1": {
        target: "http://8.149.133.7:7999", // 第一个后端提供的真实接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 如果接口中是没有api1的，那就直接置空，'^/api1': ''，
          // 如果接口中有api1，那就得写成{'^/api1':'/api1'}
          "^/api1": "",
        },
      },
    },
  },
});
