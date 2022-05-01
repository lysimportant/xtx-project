import { createVNode, render } from 'vue'; // 组件和实例直接调用
// 1. 导入组件
import LMessage from '@/library/l-message/l-message.vue';
// 创建DOM
const div = document.createElement('div');
div.setAttribute('class', 'l-message-container');
document.body.appendChild(div);
interface Props {
  type: string;
  text: string;
  duration?: number;
}
let timer: any = null;
export default function ({ type, text, duration = 3000 }: Props) {
  // 2. 转化为虚拟DOM
  const vnode = createVNode(LMessage, { type, text });
  // 3. 准备一个装消息的DOM容器
  // 4. 渲染DOM
  render(vnode, div);
  // 5.定时销毁
  clearTimeout(timer);
  setTimeout(() => {
    render(null, div);
  }, duration);
}
