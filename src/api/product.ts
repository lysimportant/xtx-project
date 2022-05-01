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
