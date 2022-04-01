<template>
  <!-- 头部 -->
  <TopNav />
  <!-- 身体 -->
  <router-view></router-view>
  <!-- 底部 -->
  <FooterCmp />
</template>

<script lang="ts" setup>
import TopNav from "@/components/TopNav/TopNav.vue";
import HomeCmp from "views/Home/Home.vue";
import FooterCmp from "components/Footer/FooterCmp.vue";
</script>

<style scoped lang="less"></style>
