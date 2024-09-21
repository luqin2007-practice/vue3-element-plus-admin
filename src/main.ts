import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "./plugins/elementui";
import axios from "./utils/request";

import "@/components/svgIcon/svg";
import SvgIcon from "./components/svgIcon/SvgIcon.vue";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app
  .use(store)
  .use(router)
  .use(elementui)
  .component("svg-icon", SvgIcon)
  .mount("#app");
