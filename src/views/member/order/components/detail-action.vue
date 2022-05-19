<template>
  <div class="detail-action" v-if="props.order">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[props.order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ props.order.id }}</p>
      <p>下单时间：{{ props.order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderState === 1">
        <LButton
          @click="$router.push('/member/pay?id=' + order.id)"
          type="primary"
          size="small"
          >立即付款</LButton
        >
        <LButton type="gray" size="small" @click="handleCancel"
          >取消订单</LButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderState === 2">
        <LButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</LButton
        >
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderState === 3">
        <LButton type="primary" size="small" @click="handleConfirm(props.order)"
          >确认收货</LButton
        >
        <LButton
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          type="plain"
          size="small"
          >再次购买</LButton
        >
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderState === 4">
        <LButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</LButton
        >
        <LButton type="plain" size="small">评价商品</LButton>
        <LButton type="gray" size="small">申请售后</LButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderState === 5">
        <LButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</LButton
        >
        <LButton type="plain" size="small">查看评价</LButton>
        <LButton type="gray" size="small">申请售后</LButton>
      </template>
      <!-- 已取消 -->
    </div>

    <Teleport to="#model">
      <OrderCancel ref="orderCancelRef" />
    </Teleport>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, ref } from 'vue';
import { orderStatus } from '@/api/constant';
import OrderCancel from './order-cancel.vue';
import { handleConfirm } from '../hooks/index';
const props = withDefaults(defineProps<{ order: any }>(), { order: {} });
const orderCancelRef = ref<InstanceType<typeof OrderCancel>>();
const handleCancel = () => {
  orderCancelRef.value?.open(props.order);
};
</script>
<script lang="ts">
export default {
  name: 'OrderDetailAction'
};
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: #27ba9b;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    // width: 240px;
    line-height: 30px;
    p {
      line-height: 30px;
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
