import { reactive } from 'vue';

export interface sortTyoe {
  inventory: boolean;
  onlyDiscount: boolean;
  sortField: null | string;
  sortMethod: null | string;
}
export const sortParams: sortTyoe = reactive({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null
});
export const sortObj = [
  {
    name: '默认排序',
    val: null
  },
  {
    name: '最新商品',
    val: 'publishTime'
  },
  {
    name: '最高人气',
    val: 'orderNum'
  },
  {
    name: '评论最多',
    val: 'evaluateNum'
  },
  {
    name: '价格排序',
    val: 'price'
  }
];
