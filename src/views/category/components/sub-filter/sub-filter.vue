<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <template v-for="(brand, index) in filterData.brands" :key="index">
          <a
            href="javascript:;"
            :class="{ active: filterData.brands.selectedBrand === brand.id }"
            @click="changeBrand(brand.id)"
          >
            {{ brand.name }}
          </a>
        </template>
      </div>
    </div>

    <template v-for="p in filterData.saleProperties" :key="p.id">
      <div class="item">
        <div class="head">{{ p.name }}：</div>
        <div class="body">
          <a
            href="javasript:;"
            v-for="attr in p.properties"
            :key="attr.id"
            :class="{ active: p.selectedAttr === attr.id }"
            @click="changeProp(p, attr.id)"
            >{{ attr.name }}</a
          >
        </div>
      </div>
    </template>
  </div>
  <div v-else class="sub-filter">
    <skeleton class="item" width="800px" height="40px" />
    <skeleton class="item" width="800px" height="40px" />
    <skeleton class="item" width="600px" height="40px" />
    <skeleton class="item" width="600px" height="40px" />
    <skeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
import { findSubCategoryFilter } from '../../../../api/category';

const route = useRoute();
const filterData = ref<any>(null);
const filterLoading = ref(false);
const emit = defineEmits(['filter-change']);
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal && `/category/sub/${newVal}` === route.path) {
      filterLoading.value = true;
      // 请求网络数据
      findSubCategoryFilter(route.params.id).then((data: any) => {
        // 品牌
        data.data.result.brands.selectedBrand = null;
        data.data.result.brands.unshift({ id: null, name: '全部' });
        // 属性
        data.data.result.saleProperties.forEach((item: any) => {
          item.selectedAttr = null;
          item.properties.unshift({ id: null, name: '全部' });
        });
        // 设置修改的数据
        filterData.value = data.data.result;
        filterLoading.value = false;
      });
    }
  },
  {
    immediate: true
  }
);

// 筛选条件函数
const getFilterParams = () => {
  const obj = { brandId: null, attrs: <any>[] };
  obj.brandId = filterData.value.brands.selectedBrand;
  filterData.value.saleProperties.forEach((item: any) => {
    if (item.selectedAttr) {
      const prop = item.properties.find(
        (prop: any) => prop.id === item.selectedAttr
      );
      obj.attrs.push({ groupName: item.name, propertyName: prop.name });
    }
  });
  if (obj.attrs.length === 0) obj.attrs = null;
  return obj;
};
const changeBrand = (id: any) => {
  if (filterData.value.brands.selectedBrand === id) return;
  filterData.value.brands.selectedBrand = id;
  emit('filter-change', getFilterParams());
};
const changeProp = (item: any, id: any) => {
  if (item.selectedAttr === id) return;
  item.selectedAttr = id;
  emit('filter-change', getFilterParams());
};
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    padding: 10px 0;
    line-height: 40px;
    .head {
      width: 100px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: #27ba9b;
        }
      }
    }
  }
}
</style>
