<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <breadcrumbs>
        <breadcrumbsItem to="/">首页</breadcrumbsItem>
        <Transition name="fade-right" mode="out-in">
          <breadcrumbsItem :key="topCategory.id">
            {{ topCategory.name }}
          </breadcrumbsItem>
        </Transition>
      </breadcrumbs>
      <!-- 轮播图 -->
      <carousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的商品推荐 -->
      <template v-for="sub in subList" :key="sub.id">
        <div class="ref-goods" v-if="sub.goods.length">
          <div class="head">
            <h3>- {{ sub.name }} -</h3>
            <p class="tag">{{ sub.desc }}</p>
            <CarMore :path="`/category/sub/${sub.id}`" />
          </div>
          <div class="body">
            <template v-for="goods in sub.goods" :key="goods.id" :goods="goods">
              <subItem :goods="goods" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCategory } from '../../store/useCategory';
import { findBanner } from '../../api/home';
import { findTopCategory } from '../../api/category';
import subItem from './components/sub-item/sub-item.vue';
const store = useCategory();
const route = useRoute();
// 获取轮播图数据
const sliders = ref([]);
findBanner().then((data: any) => {
  sliders.value = data.data.result;
});
// 获取面包屑 + 所有子分类  状态管理
const topCategory = computed(() => {
  return store.list.find((item: any) => {
    return item.id === route.params.id;
  });
});
// 各个子分类
const subList = ref<any>([]);
const getSubList = () => {
  findTopCategory(route.params.id).then((res: any) => {
    subList.value = res.data.result.children;
  });
};
// watch 监听route发生变化重新请求子分类数据
watch(
  () => route.params.id,
  (newVal) => {
    // newVal && getSubList(); // 加上判断,确定是否在顶级类目
    if (newVal && `/category/${newVal}` === route.path) getSubList();
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
// 面包屑动画

.top-category {
  background-color: #f5f5f5;
  position: relative;
  top: 0;
  left: 0;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: #27ba9b;
          }
        }
      }
    }
  }
}
</style>
