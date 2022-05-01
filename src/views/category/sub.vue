<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <subBread />
      <!-- 筛选区域 -->
      <subFilter @filter-change="filterChange" />
      <!-- 商品容器(排序&列表) -->
      <div class="goods-list">
        <subSort @sort-change="sortChange"></subSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <subItem :goods="goods" />
          </li>
        </ul>
        <LInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { findSubCategoryGoods } from '../../api/category';
import subBread from './components/sub-bread/sub-bread.vue';
import subFilter from './components/sub-filter/sub-filter.vue';
import subSort from './components/sub-sort/sub-sort.vue';
import subItem from './components/sub-item/sub-Item.vue';
import LInfiniteLoading from '../../library/l-infinite-loading/l-infinite-loading.vue';
const route = useRoute();
//
const loading = ref(false);
// 是否加载完毕
const finished = ref(false);
// 商品列表数据
const goodsList = ref<any>([]);
// 请求参数
let reqParams: any = {
  page: 1,
  pageSize: 20
};
const getData = async () => {
  loading.value = true;
  reqParams.categoryId = route.params.id;
  const {
    data: { result: res }
  } = await findSubCategoryGoods(reqParams);
  if (res.items.length) {
    // 有数剧追加数据
    goodsList.value.push(...res.items);
    reqParams.page++;
  } else {
    // 数据加载完成
    finished.value = true;
  }
  loading.value = false;
};
// 监听路由ID的变化
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/sub/${newVal}` === route.path) {
      finished.value = false;
      goodsList.value = []; // 导致列表为空,加载更多数据组件顶上,进入可视区加载数据
      reqParams = {
        page: 1,
        pageSize: 20
      };
    }
  }
);

//
const filterChange = (filterParams: any) => {
  finished.value = false;
  reqParams = { ...reqParams, ...filterParams };
  reqParams.page = 1;
  goodsList.value = [];
};

// 1. 排序组件
const sortChange = (sortParams: any) => {
  finished.value = false;
  reqParams = { ...reqParams, ...sortParams };
  reqParams.page = 1;
  goodsList.value = [];
};
// 2. 筛选组件
</script>

<style scoped lang="less">
.sub-category {
  background-color: #f5f5f5;
  .goods-list {
    background-color: #fff;
    padding: 0 25px;
    margin-top: 25px;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;
      li {
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
