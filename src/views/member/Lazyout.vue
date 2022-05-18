<template>
  <div class="container">
    <LMemberAside />
    <article class="article">
      <RouterView />
    </article>
  </div>
</template>
<script lang="ts" setup>
import LMemberAside from '@/components/member/member-aside.vue';
</script>
<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
