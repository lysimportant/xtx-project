<template>
  <div class="xtx-pagination">
    <a
      @click="changeCurrent(currentPage - 1)"
      v-if="currentPage > 1"
      href="javascript:;"
      >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span
      :style="{ cursor: 'pointer' }"
      v-if="pager.start > 1"
      @click="changeCurrent(1)"
      >...</span
    >
    <template v-for="i in pager.btnArr" :key="i">
      <a
        href="javascript:;"
        @click="changeCurrent(i)"
        :class="{ active: i === currentPage }"
        >{{ i }}</a
      >
    </template>
    <span
      :style="{ cursor: 'pointer' }"
      v-if="pager.end < pager.pageCount"
      @click="changeCurrent(pager.pageCount)"
      >...</span
    >
    <a
      v-if="currentPage < pager.pageCount"
      @click="changeCurrent(currentPage + 1)"
      href="javascript:;"
      >下一页</a
    >
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  ref,
  defineProps,
  withDefaults,
  defineEmits,
  watch
} from 'vue';
import { useVModel } from '@vueuse/core';
interface Props {
  total: number;
  currentPage: number;
  pageSize: number;
}
const props = withDefaults(defineProps<Props>(), {
  total: 100,
  currentPage: 1,
  pageSize: 10
});
const emit = defineEmits([
  'update:currentPage',
  'update:total',
  'update:pageSize',
  'current-change'
]);
const currentPage = useVModel(props, 'currentPage', emit);
const total = useVModel(props, 'total', emit);
const pageSize = useVModel(props, 'pageSize', emit);

const changeCurrent = (page: number) => {
  if (currentPage.value !== page) {
    emit('current-change', page);
  }
};
// 1. 约定按钮的数量为5,如果成为动态需要变为响应式数据
const count = 5;
// 2. 当前显示的页码
// const myCurrentPage = ref(1);
// // 3. 总页数 = 总条数 / 每一页条数 向上取整
// const myTotal = ref(100);
// const myPageSize = ref(10);
// 4. 其它数据(总页数,起始按钮,结速按钮,按钮数组) 依赖上面的数据可以得到
const pager: any = computed(() => {
  // 得到总首页的数量
  const pageCount = Math.ceil(total.value / pageSize.value);
  // 起始按钮,结速按钮,按钮数组
  // 1. 理想
  const offset = Math.floor(count / 2);
  let start = currentPage.value - offset;
  let end = start + count - 1;
  // 2. 如果起始页码小于1需要处理 start
  if (start < 1) {
    start = 1;
    end = start + count - 1 > pageCount ? pageCount : start + count - 1;
  }
  // 3. 如果结束页码大于总页数需要处理
  if (end > pageCount) {
    end = pageCount;
    start = end - count + 1 < 1 ? 1 : end - count + 1;
  }
  const btnArr = [];
  for (let i = start; i <= end; i++) {
    btnArr.push(i);
  }
  return {
    btnArr,
    start,
    end,
    pageCount
  };
});
// watch(props, () => {
//   myTotal.value = props.total
//   myCurrentPage.value = props.currentPage
//   myPageSize.value = props.pageSize
// }, { immediate: true})
</script>
<script lang="ts">
export default {
  name: 'LPagination'
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #27ba9b;
    }
    &.active {
      background: #27ba9b;
      color: #fff;
      border-color: #27ba9b;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
