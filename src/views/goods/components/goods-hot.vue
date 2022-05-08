<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div>
      <sub-item v-for="item in goodsList" :key="item" :goods="item" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, withDefaults, ref } from 'vue';
import { useRoute } from 'vue-router';
import subItem from '../../category/components/sub-item/sub-item.vue';
import { findGoodsHot } from '../../../api/product';
const route = useRoute();
const props = withDefaults(defineProps<{ type?: number }>(), {
  type: 1
});
// 热销字典
const titleObj: any = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' };
const title = computed(() => {
  return titleObj[props.type];
});
// 发送请求数据
const goodsList = ref([]);
findGoodsHot(route.params.id as string, props.type).then(
  ({ data: { result: res } }) => {
    goodsList.value = res;
  }
);
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: #e26237;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
