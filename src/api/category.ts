import request from '../utils/request';
/**
 * @param findAllCategory 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @returns Promise
 * */
export const findAllCategory = (): any => {
  return request({
    method: 'GET',
    url: '/home/category/head'
  });
};
/**
 * 获取顶级类目的所有分类
 * @parma {String} id -- 顶级类目
 * @returns Promise
 * */
export const findTopCategory = (id: number) => {
  return request({
    method: 'GET',
    url: '/category',
    params: { id }
  });
};

/**
 *  获取二级类目的
 * @parma {String} id -- 二级类目
 * @returns Promise
 * */

export const findSubCategoryFilter = (id: string) => {
  return request({
    method: 'GET',
    url: '/category/sub/filter',
    params: { id }
  });
};

/**
 * 获取分类下的商品
 * @param {Object} params
 * @returns Promise
 * */
export const findSubCategoryGoods = (data: any) => {
  return request({
    method: 'post',
    url: '/category/goods/temporary',
    data
  });
};
