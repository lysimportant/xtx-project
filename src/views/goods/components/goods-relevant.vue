<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{
        props.goodsId ? '同类商品推荐' : '猜你喜欢'
      }}</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <carousel :sliders="sliders" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import { findRelevantGoods } from '../../../api/product';
const props = defineProps<{ goodsId?: string }>();
const sliders: any = ref([]);
findRelevantGoods(props.goodsId).then(({ data: { result: res } }) => {
  const pageSize = 4;
  const pageCount = Math.ceil(res.length / pageSize);
  for (let i = 0; i < pageCount; i++) {
    sliders.value.push(res.slice(pageSize * i, pageSize * (i + 1)));
  }
});
</script>
<script lang="ts">
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant'
};
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid #27ba9b;
      border-right: 4px solid #27ba9b;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(#27ba9b, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: #27ba9b;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
