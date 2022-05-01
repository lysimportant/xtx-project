<template>
  <div class="sub-sort">
    <div class="sort">
      <template v-for="item in sortObj" :key="item.val">
        <a
          href="javascript:;"
          @click="changeSort(item.val)"
          :class="{ active: sortParams.sortField === item.val }"
          v-if="item.val !== 'price'"
          >{{ item.name }}</a
        >
        <a href="javascript:;" v-else @click="changeSort(item.val)">
          {{ item.name }}
          <i
            class="arrow up"
            :class="{
              active:
                sortParams.sortField === item.val &&
                sortParams.sortMethod === 'asc'
            }"
          />
          <i
            class="arrow down"
            :class="{
              active:
                sortParams.sortField === item.val &&
                sortParams.sortMethod === 'desc'
            }"
          />
        </a>
      </template>
    </div>
    <div class="check">
      <l-checkbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</l-checkbox
      >
      <l-checkbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</l-checkbox
      >
    </div>
    <!--  -->
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from 'vue';
import { sortObj, sortParams } from './sub-sort-config';
const emit = defineEmits(['sort-change']);
// 实现交换的数据盒后台保持一致
const changeSort = (val: any) => {
  if (val === 'price') {
    sortParams.sortField = val;
    if (sortParams.sortMethod === null) {
      // 第一次点击，默认是降序
      sortParams.sortMethod = 'desc';
    } else {
      sortParams.sortMethod = sortParams.sortMethod === 'asc' ? 'desc' : 'asc';
    }
  } else {
    if (sortParams.sortField === val) return;
    sortParams.sortField = val;
    sortParams.sortMethod = null;
  }
  // 排序发生变化 触发sort-change
  emit('sort-change', sortParams);
};
const changeCheck = () => {
  // 排序发生变化 触发sort-change
  emit('sort-change', sortParams);
};
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: #27ba9b;
        border-color: #27ba9b;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: #27ba9b;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: #27ba9b;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
