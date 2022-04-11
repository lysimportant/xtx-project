import { App } from 'vue';
import defineImage from '@/assets/img/200.png';
export default function defineDirective(app: App) {
  // 1. 图片懒加载指令
  app.directive('lazy', {
    // 生命周期
    // 1. 先存储图片地址到v-lzay值上面        不能在src上，当图片进入可视区，将你存储图片地址设置给图片元素
    // EL: HTMLElement
    // binding： 指令上传递的参数
    mounted(el, binding) {
      // 创建一个观察对象，来观察DOM是否进入可视区
      // IntersectionObserver： WebAPI
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 2. isIntersecting 是否进入可视区
            // 停止观察
            observer.unobserve(el);
            // 3. 将保存的值： binding值给src
            el.src = binding.value;
            // 4. 处理图片加载失败，加载默认图片
            el.onerror = () => {
              el.src = defineImage;
            };
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(el);
    }
  });
}
