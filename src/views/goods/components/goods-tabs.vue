<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: component === 'GoodsDetail' }"
        href="javascript:;"
        @click="toggleComponent('GoodsDetail')"
        >商品详情</a
      >
      <a
        :class="{ active: component === 'GoodsComment' }"
        href="javascript:;"
        @click="toggleComponent('GoodsComment')"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <!-- components内置动态组件 -->
    <component
      :is="component === 'GoodsDetail' ? GoodsDetail : GoodsComment"
    ></component>
    <!-- <component :is="component"/> -->
    <!--     <GoodsDetail v-show="component === 'GoodsDetail'"/>-->
    <!--     <GoodsComment v-show="component === 'GoodsComment'"/>-->
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import GoodsDetail from './goods-detail.vue';
import GoodsComment from './goods-comment.vue';
const goods: any = inject('goods', 'goods的 值还没有接受到');
const component = ref('GoodsDetail');
const toggleComponent = (name: string) => {
  component.value = name;
};
</script>

<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: #cf4444;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: #27ba9b;
        }
      }
    }
  }
}
</style>
