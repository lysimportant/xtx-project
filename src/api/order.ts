// 订单相关的API
import request from '../utils/request';
/**
 * 结算页面 - 生成订单
 * @returns Promise
 */
export const createOrder = () => {
  return request({
    method: 'GET',
    url: '/member/order/pre'
  });
};

/**
 * 添加收货地址
 * @param {Object} form - 参考接口文档
 *@returns Promise
 */
export const addAddress = (data: any) => {
  return request({
    method: 'POST',
    url: '/member/address',
    data
  });
};

/**
 * 修改收货地址
 * @param {Object} data - 参考接口文档
 *@returns Promise
 */
export const editAddress = (data: any) => {
  return request({
    method: 'put',
    url: `/member/address/${data.id}`,
    data
  });
};

/**
 * 结算页面 - 提交订单
 * @param {Object} data - 参考接口文档
 * @returns Promise
 */
export const submitOrder = (data: any) => {
  return request({
    method: 'POST',
    url: '/member/order',
    data
  });
};
