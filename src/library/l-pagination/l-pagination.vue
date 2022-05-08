<template>
  <div class="xtx-pagination">
    <a v-if="myCurrentPage > 1" @click="myCurrentPage--" href="javascript:;">上一页</a>
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <template v-for="i in pager.btnArr" :key="i">
       <a href="javascript:;" @click="myCurrentPage = i" :class="{ active: i === myCurrentPage}">{{i}}</a>
    </template>
    <span v-if="pager.end < pager.pageCount">...</span>
    <a v-if="myCurrentPage < pager.pageCount" @click="myCurrentPage++" href="javascript:;">下一页</a>
    <a v-else href="javascript:;"  class="disabled">下一页</a>
  </div>
  {{ myCurrentPage }} {{ pager.pageCount }}
</template>
<script lang="ts" setup>
import { computed, ref, defineProps, withDefaults } from 'vue'
interface Props {
  total: string | number
}
const props = withDefaults(defineProps<Props>(), {})
// 1. 约定按钮的数量为5,如果成为动态需要变为响应式数据
const count = 5;
// 2. 当前显示的页码
const myCurrentPage = ref(1);
// 3. 总页数 = 总条数 / 每一页条数 向上取整
const myTotal = ref(100);
const myPageSize = ref(10);
// 4. 其它数据(总页数,起始按钮,结速按钮,按钮数组) 依赖上面的数据可以得到
const pager: any = computed(() => {
  // 得到总首页的数量
  const pageCount = Math.ceil(myTotal.value / myPageSize.value);
  // 起始按钮,结速按钮,按钮数组
  // 1. 理想
  const offset = Math.floor(count / 2);
  let start = myCurrentPage.value - offset
  let end = start + count - 1;
  // 2. 如果起始页码小于1需要处理 start
  if (start < 1) {
    start = 1
    end = (start + count - 1) > pageCount ? pageCount : (start + count - 1);
  }
  // 3. 如果结束页码大于总页数需要处理
  if (end > pageCount) {
    end = pageCount;
    start = (end - count + 1) < 1 ? 1 : (end - count + 1)
  }
  const btnArr = []
  for(let i = start;i <= end; i++ ) {
    btnArr.push(i)
  }
  return {
    btnArr,
    start,
    end,
    pageCount
  }
})
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
