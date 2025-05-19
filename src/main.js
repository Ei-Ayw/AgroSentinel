import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/styles/variables.scss";
import "./assets/styles/mixins.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import * as echarts from "echarts";

import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons-vue";

// 引入路由实例
import router from "./router/index";

const app = createApp(App);
const pinia = createPinia();
// vue3 给原型上挂载属性
app.config.globalProperties.$echarts = echarts;

for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}
app.use(pinia);
app.use(router);
app.use(ArcoVue);
app.use(ElementPlus);
app.mount("#app");
