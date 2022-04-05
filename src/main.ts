import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
// 初始化 css
import('./assets/css/index.less')

import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
