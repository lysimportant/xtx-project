<template>
  <div class="xtx-infinite-loading" ref="container">
    <div class="loading" v-if="props.loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="props.finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, withDefaults, defineEmits } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
const emit = defineEmits(['infinite']);
const props = withDefaults(
  defineProps<{ loading: boolean; finished: boolean }>(),
  {
    loading: false,
    finished: false
  }
);
const container = ref(null);
useIntersectionObserver(
  container,
  ([{ isIntersecting }], dom) => {
    if (isIntersecting) {
      if (props.loading === false && props.finished === false) {
        emit('infinite');
      }
    }
  },
  {
    threshold: 0
  }
);
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/img/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/img/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
