import request from '../utils/request';

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 * @returns Promise
 * */
export const findGoods = (id: string) => {
  return request({
    method: 'GET',
    url: '/goods',
    params: {
      id
    }
  });
};

/**
 * 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 */
export const findRelevantGoods = (id?: string | number, limit = 16) => {
  return request({
    method: 'GET',
    url: '/goods/relevant',
    params: { id, limit }
  });
};
/**
 * 获取热销榜的商品
 * @param {String} ID - 商品的ID
 * @param {Integer} type - 商品的类型
 * @param {Integer} limit - 商品的数量
 * @returns Promise
 * */
export const findGoodsHot = (id: string, type = 1, limit = 3) => {
  return request({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  });
};

/**
 * 获取商品的评价信息
 * @param {String} ID - 商品的ID
 * @retuens Promise
 * */
export const findGoodsCommentInfo = (id: string) => {
  return request({
    // url: `/goods/${id}/eva`
    // axios 遇见 https 开头的路径地址 不会加上 基础地址
    method: 'GET',
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`
  });
};

/**
 * 获取商品的评价列表
 * @param {String} ID - 商品的ID
 * @param {Object} params - 对象刷选数据
 * @retuens Promise
 * */
export const findGoodsCommentList = (id: string, params: any) => {
  return request({
    method: 'GET',
    url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    params: { ...params }
  });
};
