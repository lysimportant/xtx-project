<template>
  <div class="home-skeleton">
    <div
      class="item"
      v-for="i in 4"
      :key="i"
      :style="{ backgroundColor: props.bg }"
    >
      <skeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <skeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <skeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
const props = withDefaults(defineProps<{ bg?: string }>(), {
  bg: '#fff'
});
</script>

<style scoped lang="less">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton {
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
