<template>
  <div class="props.order-steps" v-if="props.order">
    <LSteps :active="props.order.orderState === 6 ? 1 : props.order.orderState">
      <lStepsItem title="提交订单" :desc="props.order.createTime" />
      <lStepsItem title="付款成功" :desc="props.order.payTime" />
      <lStepsItem title="商品发货" :desc="props.order.consignTime" />
      <lStepsItem title="确认收货" :desc="props.order.endTime" />
      <lStepsItem title="订单完成" :desc="props.order.evaluationTime" />
    </LSteps>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import lStepsItem from '../../../../library/l-steps-item/l-steps-item';
const props = defineProps<{ order: any }>();
</script>

<style scoped lang="less"></style>
