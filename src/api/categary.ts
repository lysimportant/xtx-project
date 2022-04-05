import request from '@/utils/request'
/**
 * @param findAllCategory 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @returns Promise
 * */
export const findAllCategory = (): string[] => {
  return request({
    method: 'GET',
    url: '/home/category/head'
  })
}
