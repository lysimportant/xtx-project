<template>
  <div class="cart-sku" ref="targetRef">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ props.attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visibel">
      <div class="loading" v-if="loading"></div>
      <GoodsSku
        @change="changeSku"
        :skuId="props.skuId"
        v-else
        :goods="goods"
      />
      <LButton
        v-if="goods"
        @click="submit"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >确认</LButton
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { defineProps, ref, defineEmits } from 'vue';
import { getGoodsSku } from '../../../api/cart';
import GoodsSku from '@/views/goods/components/goods-sku.vue';
import Cookies from 'js-cookie';
interface Props {
  attrsText: string;
  skuId: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['change']);
const visibel = ref(false);
const loading = ref(false);
const goods = ref();
const targetRef = ref<InstanceType<typeof HTMLDivElement>>();
// 打开
const open = () => {
  loading.value = true;
  getGoodsSku(props.skuId).then(({ data: { result } }) => {
    goods.value = result;
    loading.value = false;
  });
  visibel.value = true;
};
// 关闭
const close = () => {
  visibel.value = false;
};
// 切换
const toggle = () => {
  visibel.value ? close() : open();
};
// 点击其它地方关闭
onClickOutside(targetRef, () => {
  close();
});
// 监听sku变化,记录sku信息
const currsku = ref();
const changeSku = (sku: any) => {
  currsku.value = sku;
};
// 点击确认按钮时候,更新信息给父组件
const submit = () => {
  // 当current和skuId和默认的skuId不同
  if (
    currsku.value &&
    currsku.value.skuId &&
    currsku.value.skuId !== props.skuId
  ) {
    emit('change', currsku.value);
    close();
  }
};
</script>
<script lang="ts">
export default {
  name: 'CartSku'
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid #27ba9b;
    box-shadow: 2px 2px 4px lighten(#27ba9b, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid #27ba9b;
      border-top: 1px solid #27ba9b;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/img/loading.gif) no-repeat center;
    }
  }
}
</style>
