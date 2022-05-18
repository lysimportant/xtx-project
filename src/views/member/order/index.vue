<template>
  <div class="member-order">
    <!-- jsx语法 -->
    <Tabs v-model="activeName" @tab-click="change">
      <TabsPanel
        v-for="(key, index) in orderStatus"
        :key="index"
        :label="key.label"
        :name="key.name"
      ></TabsPanel>
    </Tabs>
    <!-- 订单组件 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem v-for="item in orderList" :order="item" :key="item.id" />
    </div>
    <!-- 分页 -->
    <lPagination
      v-if="total > 0"
      :currentPage="reqParams.page"
      :pageSize="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    ></lPagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import { findOrderList } from '@/api/order';
import Tabs from '../../../library/l-tabs/l-tabs.vue';
import TabsPanel from '../../../library/l-tabs/l-tabs-panel.tsx';
import OrderItem from './components/order-item.vue';
import lPagination from '../../../library/l-pagination/l-pagination.vue';
import { orderStatus } from '@/api/constant';
// import TabsPanel from '../../../library/l-tabs/l-tabs-panel.vue';
const activeName = ref('all');
// 点击Tabs触发的事件
const change = (tab: any) => {
  console.log(tab.index);
  reqParams.orderState = tab.index;
  reqParams.page = 1;
};
// 加载中 标识符
const loading = ref(false);
// 查询订单参数
const reqParams = reactive({
  page: 1,
  pageSize: 5,
  orderState: 0
});
// 分页点击
// const currentChange = (page: number) => {
//   reqParams.page = page;
// };
// 总页数
const total = ref(0);
// 订单列表
const orderList = ref([]);
// 检测Tabs变化请求对应那个数据
watch(
  reqParams,
  () => {
    loading.value = true;
    // 查询订单
    findOrderList(reqParams).then(({ data }: any) => {
      orderList.value = data.result.items;
      total.value = data.result.counts;
      loading.value = false;
    });
  },
  { immediate: true }
);
</script>
<script lang="ts">
export default {
  name: 'orderIndex'
};
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/img/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
