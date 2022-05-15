<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <img v-lazy="props.goods.picture" alt="" />
    <p class="name ellipsis">{{ props.goods.name }}</p>
    <p class="desc ellipsis">{{ props.goods.tag }}</p>
    <p class="price">&yen;{{ props.goods.price }}</p>
  </RouterLink>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
interface Props {
  goods: any;
}
const props = defineProps<Props>();
</script>
<style lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;
  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: #cf4444;
    font-size: 20px;
  }
}
</style>
