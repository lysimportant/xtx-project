import { defineStore } from 'pinia';
import {
  findCart,
  getNewCartGoods,
  mergerCartApi,
  insertCart,
  deleteCart,
  updateCart,
  checkAllCart
} from '../api/cart';
import { useUser } from './useUser';
const useUserStore = useUser();
interface state {
  list: any;
}
export const useCart = defineStore('useCart', {
  state(): state {
    return {
      list: []
    };
  },
  actions: {
    // 加载购物车
    insertCart(payload: any) {
      // 1. 先找下是否有相同的商品
      // 2. 如果有相同的商品,查询它的数量,累加到payload上,再保存最新位置,原来商品信息删除
      // 3. 如果没有相同商品,保存在最新位置即可
      // 4.
      const handleGoodsList = () => {
        const sameIndex = this.$state.list.findIndex(
          (goods: any) => goods.skuId === payload.skuId
        );
        if (sameIndex > -1) {
          const count = this.$state.list[sameIndex].count;
          payload.count += count;
          //  删除原来的商品
          this.$state.list.splice(sameIndex, 1);
        }
        //  追加新的商品
        this.$state.list.unshift(payload);
      };
      if (useUserStore.profile.token) {
        // 已登录
        insertCart(payload.skuId, payload.count)
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            console.log(data);
            this.list = data.result;
          });
      } else {
        // 未登录
        handleGoodsList();
      }
    },
    // 更新商品
    updateCart(payload: any) {
      const updateCartFn = () => {
        const goods = this.$state.list.find(
          (item: any) => item.skuId === payload.skuId
        );
        for (const key in payload) {
          if (
            goods[key] !== undefined &&
            goods[key] !== null &&
            goods[key] !== ''
          ) {
            goods[key] = payload[key];
          }
        }
      };
      // 可能修改的值 skuId selected count
      if (useUserStore.profile.token) {
        console.log('更新了购物车商品');
        updateCart(payload.skuId, payload.selected, payload.count)
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            console.log(data);
            this.list = data.result;
          });
      } else {
        updateCartFn();
      }
    },
    // 获取商品列表
    findCart() {
      return new Promise((resovle, reject) => {
        if (useUserStore.profile?.token) {
          findCart().then(({ data }) => {
            this.list = data.result;
          });
        } else {
          // 未登录
          // 一共的请求发送
          const promiseAll = this.$state.list.map((goods: any) => {
            return getNewCartGoods(goods.skuId);
          });
          // 已登录
          Promise.all(promiseAll).then((dataLsit) => {
            dataLsit.forEach((data, index) => {
              this.updateCart({
                skuId: this.$state.list[index].skuId,
                ...data
              });
            });
            resovle(0);
          });
        }
      });
    },
    // 删除商品
    deleteCart(skuId: string) {
      if (useUserStore.profile.token) {
        // 登录
        deleteCart([skuId])
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            console.log(data);
            this.list = data.result;
          });
      } else {
        // 未登录的操作
        const index = this.$state.list.findIndex(
          (item: any) => item.skuId === skuId
        );
        this.$state.list.splice(index, 1);
      }
    },
    // 全选 与 取消全选
    changeCheckAll(selected: boolean) {
      if (useUserStore.profile.token) {
        const ids: string[] = this.validList.map((item) => item.skuId);
        checkAllCart(selected, ids)
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            this.list = data.result;
          });
      } else {
        this.validList.forEach((goods: any) => (goods.selected = selected));
      }

      // if (this.validList.length === this.selectedList.length) {
      // this.validList.forEach((goods: any) => goods.selected = false);
      // } else {
      //   this.validList.forEach((goods: any) => goods.selected = true);
      // }
    },
    // 一次删除多个商品
    batchDeletion(flag: boolean) {
      if (useUserStore.profile.token) {
        //
        const ids: string[] = this[
          flag === true ? 'inValidList' : 'selectedList'
        ].map((item: any) => item.skuId);

        deleteCart(ids)
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            console.log(data);
            this.list = data.result;
          });
      } else {
        this[flag === true ? 'inValidList' : 'selectedList'].forEach(
          (goods: any) => {
            this.deleteCart(goods.skuId);
          }
        );
      }
    },
    updateCartSku(payload: { skuId: string; newSku: any }) {
      if (useUserStore.profile.token) {
        // 登录
        const oldGoods = this.list.find(
          (item: any) => item.skuId === payload.skuId
        );
        //删除
        deleteCart([oldGoods.skuId]);
        // 加入购物车
        insertCart(payload.newSku.skuId, oldGoods.count)
          .then(() => {
            return findCart();
          })
          .then(({ data }) => {
            this.list = data.result;
          });
      } else {
        // 未登录
        // 1. 找出旧的商品信息
        // 2. 删除旧的商品信息
        // 3. 根据新的sku信息和旧的商品信息,合并成一条新的购物车商品信息
        // 4. 添加新的商品
        const oldGoods = this.list.find(
          (item: any) => item.skuId === payload.skuId
        );
        this.deleteCart(payload.skuId); // 删除商品
        const {
          skuId,
          price: nowPrice,
          specsText: attrsText,
          inventory: stock
        } = payload.newSku;
        const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock };
        this.insertCart(newGoods);
      }
    },
    // 合并购物车
    async mergeCart() {
      // 准备合并的参数
      const cartList = this.list.map((goods: any) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        };
      });
      await mergerCartApi(cartList);
      // 合并成功 清空本地购物车
      this.list = [];
    }
  },
  getters: {
    // 有效商品列表
    validList(state: state) {
      return state.list.filter(
        (goods: any) => goods.stock > 0 && goods.isEffective
      );
    },
    // 有效商品总件数
    validTotal(): number {
      return this.validList.reduce((p: number, c: any) => p + c.count, 0);
    },
    // 有效商品金额
    validTotalPrice(): number {
      // toFixed(2)
      return this.validList
        .reduce((p: number, c: any) => p + c.nowPrice * c.count, 0)
        .toFixed(2);
      // return this.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100;
    },
    // 无效商品列表
    inValidList(): [] {
      return this.list.filter(
        (item: any) => item.stock <= 0 || !item.isEffective
      );
    },
    // 已选商品列表
    selectedList(): [] {
      return this.validList.filter((item: any) => item.selected);
    },
    // 已选列表总件数
    selectedTotal(): number {
      return this.selectedList.reduce((pre, curr: any) => pre + curr.count, 0);
    },
    // 已选商品总金额
    selectedTotalPrice(): number {
      // toFixed(2)
      return parseFloat(
        this.selectedList
          .reduce((p: number, c: any) => p + c.nowPrice * c.count, 0)
          .toFixed(2)
      );
      // return this.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100;
    },
    // 是否全选
    isCheckAll() {
      return (
        this.validList.length !== 0 &&
        this.validList.length === this.selectedList.length
      );
    }
  }
});
