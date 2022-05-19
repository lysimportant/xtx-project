<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <DetailAction :order="order" />
    <!-- 进度 -->
    <DetailSteps :order="order" />
    <!-- 物流 -->
    <Suspense>
      <template #>
        <DetailLogistics
          v-if="[3, 4, 5].includes(order.orderState)"
          :order="order"
        />
      </template>
      <template #fallback> <div class="loading">loading...</div> </template>
    </Suspense>
    <!-- 信息 -->
    <DetailInfo :order="order" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import DetailAction from './components/detail-action.vue';
import DetailSteps from './components/detail-steps.vue';
import DetailLogistics from './components/detail-logistics';
import DetailInfo from './components/detail-info.vue';
import { findOrderDetail } from '@/api/order';
const route = useRoute();
const order: any = ref(null);
findOrderDetail(route.params.id).then(({ data }) => {
  order.value = data.result;
});
</script>

<style scoped lang="less">
.member-order-detail {
  background-color: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
