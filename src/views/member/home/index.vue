<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <subItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 组件 -->
    <HomePanel title="我的足迹">
      <subItem v-for="item in collectGoods1" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import HomeOverview from './components/home-overview.vue';
import HomePanel from './components/home-panel.vue';
import GoodsRelevant from '../../goods/components/goods-relevant.vue';
import subItem from '../../category/components/sub-item/sub-item.vue';
// import request from '@/utils/request';
import { findCollect } from '@/api/member';
// const goods = {
//   id: '1',
//   name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
//   picture:
//     'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
//   desc: '清汤鲜香 红汤劲爽',
//   price: '159.00'
// };
// 调用模拟的接口
// request({
//   methods: 'GET',
//   url: '/my/test'
// }).then(({ data }) => {
//   console.log(data);
// });

const collectGoods = ref([]);
findCollect(1, 4).then(({ data }) => {
  collectGoods.value = data.result.items;
});

const collectGoods1 = ref([]);
findCollect(2, 4).then(({ data }) => {
  console.log(data.result.items);
  collectGoods1.value = data.result.items;
});
</script>

<script lang="ts">
export default {
  name: 'MemberHome'
};
</script>
<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
