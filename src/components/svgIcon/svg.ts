const context = require.context("./icons", false, /\.svg$/);

// 导入结果
// for (const name of context.keys()) {
//   console.log("Icon", name, context(name));
// }

const requireAll = (requireContext: any) => {
  const keys = requireContext.keys();
  const output = keys.map(requireContext);
  for (let i = 0; i < keys.length; i++) {
    console.log(`icon: ${keys[i]} => ${output[i]}`);
  }
};

requireAll(context);
