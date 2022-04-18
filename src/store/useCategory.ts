import { defineStore } from 'pinia';
import { topCategory } from '../api/constant';
import { findAllCategory } from '../api/categary';

interface categoryData {
  list: any[];
}
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCategory = defineStore('category', {
  // other options...
  state: (): categoryData => {
    return {
      // 分类信息的集合 依赖topCategory重新设置，保证初始化就要数据不至于白屏
      list: topCategory.map((item) => ({ name: item }))
    };
  },
  actions: {
    async setList() {
      // 获取分类的数据
      const { data: data } = await findAllCategory();
      // 添加一个显示控制Boolean open
      this.list = data.result.map((v) => ({ ...v, open: false }));
    },
    // show 和 hidden 方法 显示和隐藏
    show(id: number) {
      const currCategory = this.list.find((item) => item.id === id);
      currCategory.open = true;
    },
    hide(id: number) {
      const currCategory = this.list.find((item) => item.id === id);
      currCategory.open = false;
    }
  }
});
