<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <breadcrumbs>
        <breadcrumbsItem to="/">首页</breadcrumbsItem>
        <breadcrumbsItem to="/">手机</breadcrumbsItem>
        <breadcrumbsItem to="/">华为</breadcrumbsItem>
        <breadcrumbsItem to="/">p30</breadcrumbsItem>
      </breadcrumbs>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

import GoodsRelevant from './components/goods-relevant.vue';

import { findGoods } from '../../api/product';

const route = useRoute();
// 获取商品详情的函数
const useGoods = async () => {
  const data = ref<any>();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        console.log(route.params.id, typeof route.params.id);
        findGoods(route.params.id as string).then((data: any) => {
          // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
          data.value = null;
          nextTick(() => {
            data.value = data.data.result;
          });
        });
      }
    },
    { immediate: true }
  );
  return data;
};
const goods = useGoods();
</script>
<style scoped lang="less">
.xtx-goods-page {
  background-color: #f5f5f5;
}
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
