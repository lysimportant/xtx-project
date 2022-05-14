import request from '../utils/request';

/**
 * 获取新的商品信息
 * @param {String} skuId - 商品SKUID
 * @returns Promise
 */
export const getNewCartGoods = (skuId: string) => {
  return request({
    method: 'GET',
    url: `/goods/stock/${skuId}`
  });
};

/**
 * 获取对应skuId的商品信息
 * @param {String} skuId - SKU ID
 * @returns Promise
 */
export const getGoodsSku = (skuId: string) => {
  return request({
    method: 'GET',
    url: '/goods/sku/' + skuId
  });
};

/**
 * 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - SKUID
 * @param {Boolean} object.selected - 商品是否选中
 * @param {Number} object.count - 商品的数量
 * @returns Promise
 */
interface cratList {
  skuId: string;
  selected: boolean;
  count: number;
}
export const mergerCartApi = (data: cratList) => {
  return request({
    method: 'POST',
    url: '/member/cart/merge',
    data
  });
};
/**
 *获取购物车列表
 * @returns Promise
 */
export const findCart = () => {
  return request({
    method: 'GET',
    url: '/member/cart'
  });
};

/**
 * 加入购物车
 * @param {String} skuId - SKUID
 * @param {Integer} count - 商品的数量
 * @returns Promise
 */

export const insertCart = (skuId: string, count: number) => {
  return request({
    method: 'POST',
    url: '/member/cart',
    data: { skuId, count }
  });
};

/**
 * 删除单个或多个商品
 * @param {Array<string>} ids - SKUID 的集合
 * @returns Promise
 */
export const deleteCart = (ids: string[]) => {
  return request({
    method: 'DELETE',
    url: '/member/cart',
    data: { ids }
  });
};

/**
 * 更新购物车商品
 * @param {String} skuId - SKUID
 * @param {Boolean} selected - 是否选中
 * @param {Integer} count - 商品的数量
 * @returns Promise
 */
export const updateCart = (skuId: string, selected: boolean, count: number) => {
  return request({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data: {
      selected,
      count
    }
  });
};

/**
 * 全部选中或取消全选中
 * @param {Boolean} selected - selected 商品是否选中
 * @param {Array<string>} ids - SKUID 的集合
 * @returns Promise
 */
export const checkAllCart = (selected: boolean, ids: string[]) => {
  return request({
    method: 'PUT',
    url: `/member/cart/selected`,
    data: {
      selected,
      ids
    }
  });
};
