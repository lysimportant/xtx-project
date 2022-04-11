<template>
  <div
    class="xtx-skeleton"
    :style="{ width: props.width, height: props.height }"
    :class="{ shan: props.animated }"
  >
    <!-- 1 盒子-->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script lang="ts">
export default { name: 'skeleton' };
</script>
<script setup lang="ts">
// 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
import { defineProps, withDefaults } from 'vue';
interface Props {
  width?: string;
  height?: string;
  bg?: string;
  animated?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  width: '100px',
  height: '100px',
  bg: '#efefef',
  animated: false
});
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: '';
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
