<template>
  <div class="sub-category">
    <div class="container">
      <subBread />
      <subFilter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import subBread from './components/sub-bread/sub-bread.vue';
import subFilter from './components/sub-filter/sub-filter.vue';
</script>

<style scoped lang="less">
.sub-category {
  background-color: #f5f5f5;
}
</style>
