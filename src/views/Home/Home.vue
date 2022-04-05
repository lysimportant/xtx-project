<template>
  <div class="home-container">
    <!-- 首页入口 -->
    <div class="home-entry">
      <div>
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        123
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HomeCategory from './home-category.vue'
</script>

<style scoped lang="less">
.home-container {
  height: 800px;
  .home-entry {
    position: relative;
    top: 0;
    left: 0;
    background-color: #f5f5f5;
    div {
      position: relative;
      top: 0;
      width: 1240px;
      height: 500px;
      margin: 0 auto;
    }
  }
}
</style>
