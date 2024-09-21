const context = require.context("./icons", false, /\.svg$/);

// 导入结果
for (const name of context.keys()) {
  console.log("Icon", name, context(name));
}
