import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "./plugins/elementui";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(store).use(router).use(elementui).mount("#app");
