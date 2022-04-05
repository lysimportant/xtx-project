// 提供首页相关数据
import request from '@/utils/request'
/**
 * 获取品牌
 * @parma {Integer} limit - 获取品牌的数量
 * @returns Promise
 *
 */
export const findBrand = (limit = 6) => {
  return request({
    method: 'GET',
    url: '/home/brand',
    params: {
      limit
    }
  })
}
