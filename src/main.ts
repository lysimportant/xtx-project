import { createApp } from "vue";
import router from "@/router";
// 初始化 css
import("./assets/css/index.less");

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#app");
