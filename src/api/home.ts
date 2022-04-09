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
/**
 * 获取广告区轮播图
 * @returns Promise
 *
 */
export const findBanner = () => {
  return request({
    method: 'GET',
    url: '/home/banner'
  })
}
/**
 * 获取新鲜好物
 * @returns Promise
 *
 */
export const findNew = () => {
  return request({
    method: 'GET',
    url: '/home/new'
  })
}

/**
 * 获取人气推荐
 * @returns Promise
 *
 */
export const findHot = () => {
  return request({
    method: 'GET',
    url: '/home/hot'
  })
}
