<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right><CarMore path="/" /></template>
      <div ref="target" style="position: relative; height: 406px">
        <!-- 面板内容 -->
        <transition name="fade">
          <ul v-if="result.length" class="goods-list">
            <li v-for="item in result" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="" />
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else />
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import HomePanel from './home-panel.vue';
import HomeSkeleton from './home-skeleton.vue';
import { findHot } from '@/api/home';

import { useLazyData } from '@/hooks/index';
// findHot().then((res: any) =>{
//   list.value = res.data.result
// })
const { result, target } = useLazyData(findHot);
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  width: 1240px;
  margin: 0 auto;
  li {
    width: 306px;
    height: 406px;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
