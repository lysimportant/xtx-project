<template>
  <h1><img src="~@/assets/img/logo.png" alt="" /></h1>
  <ul class="header-middle-nav">
    <li><router-link to="/">首页</router-link></li>
    <!--    遍历数组渲染导航数据 -->
    <template v-for="item in list" :key="item.id">
      <li @mousemove="show(item.id)" @mouseleave="hide(item.id)">
        <router-link :to="`/category/${item.id}`" @click="hide(item.id)">
          {{ item.name }}
        </router-link>
        <div
          class="layer"
          :class="{ open: item.open }"
          :style="{ top: props.top }"
        >
          <!--            子类的数据如果没有立刻加载完成用户触发则提示数据加载中       -->
          <ul v-if="item.children">
            <li
              v-for="sub in item.children"
              :key="sub.id"
              @click="hide(item.id)"
            >
              <router-link :to="`/category/sub/${sub.id}`">
                <img :src="sub.picture" :alt="sub.name" />
                <p>{{ sub.name }}</p>
              </router-link>
            </li>
          </ul>
          <p v-else>数据加载中</p>
        </div>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue';
import { useCategory } from '@/store/useCategory';
const store = useCategory();
const props = withDefaults(
  defineProps<{
    top?: string;
  }>(),
  {
    top: '150px'
  }
);
store.setList(); // 异步获取头部导航数据
//将数据转换为动态数据
const list = computed(() => {
  return store.list;
});

const show = (id: number) => {
  store.show(id);
};
const hide = (id: number) => {
  store.hide(id);
};
</script>

<style scoped lang="less">
h1 {
  width: 200px;
  height: 80px;
  padding: 0;
  margin: auto;
}
// 中部导航
.header-middle-nav {
  width: 720px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  text-align: center;

  > li {
    margin-right: 40px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &:hover {
      color: #27ba9b;
      border-bottom: 1px solid #27ba9b;
      // 显示二级类目
      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }

    .layer {
      &.open {
        height: 132px;
        opacity: 1;
      }
      width: 1240px;
      // height: 200px !important;
      background-color: #fff;
      position: absolute;
      left: 336px;

      height: 0;
      z-index: 999;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 70px 0;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
            border-bottom: 1px solid transparent;
          }
          &:hover {
            p {
              color: #27ba9b;
            }
          }
        }
      }
    }
  }
}
</style>
