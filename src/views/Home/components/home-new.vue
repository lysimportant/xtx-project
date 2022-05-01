<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><CarMore path="/" /></template>
      <div ref="target" style="position: relative; height: 406px">
        <Transition name="fade">
          <!-- 面板内容 -->
          <ul v-if="result.length" class="goods-list">
            <li v-for="item in result" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img v-lazy="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script setup lang="ts">
import HomePanel from './home-panel.vue';
import { findNew } from '../../../api/home';
import HomeSkeleton from './home-skeleton.vue';
import { useLazyData } from '../../../hooks/index';

// findNew().then((res: any) =>{
//   goods.value = res.data.result
// })

const { result, target } = useLazyData(findNew);
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
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
      padding: 12px 30px 0 30px;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      color: #cf4444;
    }
  }
}
</style>
