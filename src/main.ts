import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "./plugins/elementui";
import axios from "./utils/request";

import SvgIcon from "./components/svgIcon/SvgIcon.vue";
import "@/components/svgIcon/svg";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(elementui)
  .component("svg-icon", SvgIcon)
  .mount("#app");
