const state = {
  count: 100,
  text: "学习 Vue.js 3 管理后台开发",
};

const getters = {
  getCount: (state: any) => state.count + 10,
  getText: (state: any) => `我正在努力${state.text}`,
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
