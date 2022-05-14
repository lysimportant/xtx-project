import { createVNode, render } from 'vue';
import LConfirm from '@/library/l-confirm/l-confirm.vue';
//
const div = document.createElement('div');
div.setAttribute('class', 'l-confirm-container'); // 标记DIV
document.body.appendChild(div);
//
export default ({ title, text }: { title?: string; text: string }) => {
  //
  return new Promise((resovle, reject) => {
    const cancelCallback = () => {
      render(null, div);
      reject(new Error('点击取消'));
    };
    const submitCallback = () => {
      render(null, div);
      resovle(true);
    };
    const vnode = createVNode(LConfirm, {
      title,
      text,
      cancelCallback,
      submitCallback
    });
    render(vnode, div);
  });
};
