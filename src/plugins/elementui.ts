import { ElButton, ElSwitch, ElForm, ElFormItem, ElInput } from "element-plus";
import { App } from "vue";

export default (app: App) => {
  app.use(ElButton);
  app.use(ElSwitch);
  app.use(ElForm);
  app.use(ElFormItem);
  app.use(ElInput);
};
