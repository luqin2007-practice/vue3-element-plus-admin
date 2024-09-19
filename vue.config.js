const { defineConfig } = require("@vue/cli-service");
// element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        // sass-loader 10 以下使用 prependData
        additionalData: `@import "~@/styles/main.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({ resolvers: [ElementPlusResolver()] }),
      Components({ resolvers: [ElementPlusResolver()] })
    ]
  }
});
