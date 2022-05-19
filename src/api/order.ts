// 订单相关的API
import request from '../utils/request';
/**
 * 结算页面 - 生成订单-根据购物车的选中商品
 * @returns Promise
 */
export const createOrder = () => {
  return request({
    method: 'GET',
    url: '/member/order/pre'
  });
};
/**
 * 结算页面 - 生成订单-根据订单ID
 * @returns Promise
 */
 export const createOrderById = (orderId: string) => {
  return request({
    method: 'GET',
    url: '/member/order/repurchase/' + orderId
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

/**
 * 获取订单详情
 * @param {String} orderId - 订单ID
 * @returns Promise
 */
export const findOrderDetail = (orderId: string) => {
  return request({
    method: 'GET',
    url: `/member/order/${orderId}`
  });
};

/**
 * 查询订单列表
 * @param {Number} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @param {Number} page - 页码
 * @param {Number} pageSize - 每页条数
 * @returns
 */
export const findOrderList = ({ orderState = 0, page = 1, pageSize = 10 }) => {
  return request({
    method: 'get',
    url: '/member/order',
    params: {
      orderState,
      page,
      pageSize
    }
  });
};

/**
 * 取消订单
 * @param {String} orderId - 订单ID
 * @param {String} cancelReason - 取消原因
 * @returns Promise
 */
export const cancelOrder = (orderId: string, cancelReason: string) => {
  return request({
    method: 'put',
    url: `/member/order/${orderId}/cancel`,
    data: {
      cancelReason
    }
  });
};
/**
 * 删除订单
 * @param {Array<string>} ids - 删除订单，id集合
 * @returns
 */
export const deleteOrder = (ids: any) => {
  return request({
    method: 'delete',
    url: '/member/order',
    data: {
      ids: [ids]
    }
  });
};

/**
 * 确认收货
 * @param {String} orderId - 订单ID
 * @returns Promise
 */
export const confirmOrder = (orderId: string) => {
  return request({
    method: 'put',
    url: `/member/order/${orderId}/receipt`
  });
};
/**
 * 查看物流
 * @param {String} id - 订单ID
 * @returns
 */
export const logisticsOrder = (id: string) => {
  return request({
    method: 'GET',
    url: `/member/order/${id}/logistics`
  });
};
