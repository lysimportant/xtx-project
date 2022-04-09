import type { App } from 'vue'
import registerComponents from './registerComponents'
export default {
  install(app: App) {
    registerComponents(app)
  }
}
