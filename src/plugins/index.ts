import type { App } from 'vue';
import registerComponents from './registerComponents';
import registerDirective from './registerDirective';
export default {
  install(app: App) {
    // 注册全局组件
    registerComponents(app);
    // 定义指令
    registerDirective(app);
  }
};
