<template>
  <carousel :sliders="sliders" :autoplay="true" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { findBanner } from '@/api/home';
// 获取轮播图数据
const sliders = ref([]);
findBanner().then((data: any) => {
  sliders.value = data.data.result;
});
</script>

<style scoped lang="less">
.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
