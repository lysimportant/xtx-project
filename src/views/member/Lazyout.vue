<template>
  <div class="member-body">
    <div class="container">
      <LMemberAside />
      <article class="article">
        <RouterView />
      </article>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LMemberAside from '@/components/member/member-aside.vue';
</script>
<style scoped lang="less">
.member-body {
  background-color: #f5f5f5;
  .container {
    display: flex;
    padding-top: 20px;
    .article {
      width: 1000px;
    }
  }
}
</style>
