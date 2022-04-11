<template>
  <RouterLink :to="props.path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<script lang="ts">
export default {
  name: 'CarMore'
};
</script>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
interface Props {
  path?: string;
}
const props = withDefaults(defineProps<Props>(), {
  path: '/'
});
</script>

<style scoped lang="less">
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,
    i {
      color: #27ba9b;
    }
  }
}
</style>
