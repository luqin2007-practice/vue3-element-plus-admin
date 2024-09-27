import Cookies from "js-cookie";

const token_key = "token";
const user_key = "user";

export default {
  getToken: () => Cookies.get(token_key),
  getUsername: () => Cookies.get(user_key),
  setUser(username: string, token: string) {
    Cookies.set(token_key, token);
    Cookies.set(user_key, username);
  },
  clear() {
    Cookies.remove(token_key);
    Cookies.remove(user_key);
  },
};
