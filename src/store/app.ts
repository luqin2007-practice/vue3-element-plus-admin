import account from "@/api/account";
import cookie from "@/utils/cookie";
import { Store } from "element-plus/es/components/table/src/store";
import { sha1 } from "js-sha1";
import { ActionContext } from "vuex";

const state = {
  collapse: JSON.parse(sessionStorage.getItem("collapse") || "false"),
  user: "",
  token: "",
  avatar: "",
};

const getters = {};

const mutations = {
  UPDATE_USER(state: Store<any>, payload: any) {
    state.user = payload.user;
    state.avatar = payload.avatar;
    state.token = payload.token;
  },

  SWITCH_COLLAPSE(state: Store<any>) {
    state.collapse = !state.collapse;
    sessionStorage.setItem("collapse", state.collapse);
  },
};

const actions = {
  loginAction(context: ActionContext<any, any>, payload: any) {
    const { user, password, code } = payload;
    console.log(payload);
    return new Promise<any>((resolve, reject) => {
      const pwd = sha1(password);
      account
        .login(user, pwd, code)
        .then((resp) => {
          const { token } = resp.data.data;
          context.commit("UPDATE_USER", { user, token, avatar: "" });
          cookie.setUser(payload.user, payload.token);
          resolve(resp);
        })
        .catch(reject);
    });
  },

  logoutAction(context: ActionContext<any, any>) {
    context.commit("UPDATE_USER", { user: "", token: "", avatar: "" });
    cookie.clear();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
