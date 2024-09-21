import {
  ElButton,
  ElSwitch,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
} from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { App } from "vue";

export default (app: App) => {
  // widgets
  app.use(ElButton);
  app.use(ElSwitch);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElInput);
  app.use(ElMessage);
  app.use(ElContainer);
  app.use(ElAside);
  app.use(ElHeader);
  app.use(ElMain);
  // icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};
