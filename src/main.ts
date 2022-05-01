import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import registerGlobalComponents from './plugins';
// 初始化 css
import('./assets/css/index.less');
import App from './App.vue';
import { setupStore } from './store/useUser';
const app = createApp(App);
app.use(registerGlobalComponents);
app.use(createPinia());
app.use(router);
setupStore();
app.mount('#app');
