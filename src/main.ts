import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementui from "./plugins/elementui";

createApp(App).use(store).use(router).use(elementui).mount("#app");
