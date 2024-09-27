const { defineConfig } = require("@vue/cli-service");
// element-plus
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')

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
  },
  chainWebpack: (config) => {
    // 配置 svg 默认规则
    // const svgRule = config.module.rule('svg');
    // svgRule.uses.clear().end();       // 清除已有规则
    // svgRule
    //   .use('svg-sprite-loader')       // 注册规则
    //     .loader('svg-sprite-loader')  // 载入规则
    //     .options({
    //       symbolId: "icon-[name]",    // symbol 元素 id
    //       include: [path.resolve("./src/components/svgIcon/icons")],
    //     })
    //     .end();
    const iconPath = path.resolve("./src/components/svgIcon/icons");
    config.module
      .rule("svg")
      .exclude.add(iconPath)
      .end();
    config.module
      .rule("svg-icons")
      .test(/\.svg$/)
      .include.add(iconPath)
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" })
      .end();
  },
  devServer: {
    // 允许服务器被外界访问
    // host: "0.0.0.0",
    proxy: {
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_API_TARGET,
        // 允许跨域
        changeOrigin: true,
        secure: false,    
        // 匹配替换字符串
        pathRewrite: {
          [`^${process.env.VUE_APP_API}`]: "",
        },  
      },
    },
  },
});
