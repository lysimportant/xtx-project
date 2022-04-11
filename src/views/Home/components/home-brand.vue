<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        :class="{ disabled: Index === 0 }"
        @click="toggle(-1)"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        href="javascript:;"
        :class="{ disabled: Index === 1 }"
        @click="toggle(1)"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div ref="target" class="box">
      <Transition name="fade">
        <ul
          v-if="result.length"
          class="list"
          :style="{ transform: `translateX(${-Index * 1240}px)` }"
        >
          <li v-for="item in result" :key="item.id">
            <RouterLink to="/">
              <img :src="item.logo" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <skeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomePanel from './home-panel.vue';

import { findBrand } from '@/api/home';
import { useLazyData } from '@/hooks/index';
// 获取品牌的数据
// const brands = ref([]);
// findBrand(10).then((res: any) => {
//   brands.value = res.data.result;
//   console.log(brands.value[0]);
// });

const { result, target } = useLazyData(() => findBrand(10));
// const {result, target} = useLazyData(findBrand, 10)
// 品牌的切换
const Index = ref(0);
const toggle = (setp: number) => {
  const newIndex = Index.value + setp;
  if (newIndex < 0 || newIndex > 1) return;
  Index.value = newIndex;
};
</script>

<style scoped lang="less">
.home-panel-container {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: #27ba9b;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
