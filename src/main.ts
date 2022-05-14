import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-persistedstate-plugin';
import router from './router';
import registerGlobalComponents from './plugins';
// 初始化 css
import('./assets/css/index.less');
import App from './App.vue';
import { setupStore } from './store/useUser';
const app = createApp(App);
app.use(registerGlobalComponents);
const store = createPinia();

store.use(createPersistedState());
app.use(store);
app.use(router);
setupStore();
app.mount('#app');
