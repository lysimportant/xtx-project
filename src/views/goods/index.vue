<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <breadcrumbs>
        <breadcrumbsItem to="/">首页</breadcrumbsItem>
        <breadcrumbsItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</breadcrumbsItem>
        <breadcrumbsItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</breadcrumbsItem>
        <Transition name="fade-right" mode="out-in">
          <breadcrumbsItem>{{ goods.name }}</breadcrumbsItem>
        </Transition>
      </breadcrumbs>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- sku组建 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <LNumbox v-model="defaultCount" label="数量" :max="goods.inventory" />
          <!-- 按钮组件 -->
          <l-button type="primary" style="margin-top: 20px" @click="intserCart"
            >加入购物车</l-button
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, provide } from 'vue';
import { useRoute } from 'vue-router';
import { useCart } from '../../store/useCart';
import GoodsRelevant from './components/goods-relevant.vue';
import GoodsImage from './components/goods.image.vue';
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';
import GoodsHot from './components/goods-hot.vue';
import LNumbox from '../../library/l-numbox/l-numbox.vue';
import GoodsTabs from './components/goods-tabs.vue';
import GoodsWarn from './components/goods-warn.vue';
import Message from '../../plugins/Toast';
import { findGoods } from '../../api/product';
const store = useCart();
const route = useRoute();
// 选择商品的默认数量为1
const defaultCount = ref(1);

// 完成的sku
const changeSku = (sku: any) => {
  if (sku.skuId) {
    goods.value.price = sku.price;
    goods.value.oldPrice = sku.oldPrice;
    goods.value.inventory = sku.inventory;
  }
  currentSku.value = sku;
};

// 获取商品详情的函数
const useGoods = () => {
  const data: any = ref();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id as string).then(
          ({ data: { result: res } }) => {
            // 让商品数据为null然后使用v-if的组件可以重新销毁和创建
            data.value = null;
            nextTick(() => {
              data.value = res;
            });
          }
        );
      }
    },
    { immediate: true }
  );
  return data;
};

const goods: any = useGoods();
provide('goods', goods);
const currentSku: any = ref();
// 加入购物车
const intserCart = () => {
  // 字段 id
  if (currentSku.value && currentSku.value.skuId) {
    const { skuId, specsText: attrsText, inventory: stock } = currentSku.value;
    const { id, name, price, mainPictures } = goods.value;
    store.insertCart({
      skuId,
      attrsText,
      stock,
      id,
      price,
      name,
      nowPrice: price,
      picture: mainPictures[0],
      selected: true,
      isEffective: true,
      count: defaultCount.value
    });
    Message({ type: 'success', text: '加入购物车成功' });
  } else {
    Message({ type: 'warn', text: '请选择完整的规格' });
  }
};
</script>
<style scoped lang="less">
.xtx-goods-page {
  background-color: #f5f5f5;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
