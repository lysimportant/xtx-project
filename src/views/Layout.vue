<template>
  <!-- 头部 -->
  <TopNav />
  <!--  sticky  -->
  <TopNavSticky />
  <!-- 子路由显示 -->
  <router-view></router-view>
  <!-- 底部 -->
  <FooterCmp />
</template>

<script lang="ts" setup>
import TopNav from '@/components/TopNav/TopNav.vue'
import FooterCmp from 'components/Footer/FooterCmp.vue'
import TopNavSticky from 'components/TopNav/TopNavSticky.vue'
</script>

<style scoped lang="less"></style>
