<template>
  <div class="top-category">
    <div class="container">
        <!-- 面包屑 -->
      <breadcrumbs>
        <breadcrumbsItem to="/">首页</breadcrumbsItem>
        <breadcrumbsItem v-if="topCategory">{{ topCategory.name }}</breadcrumbsItem>
      </breadcrumbs>
      <!-- 轮播图 -->
      <carousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" >
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的商品推荐 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { useCategory } from 'store/useCategory'
import { findBanner } from '@/api/home';
import { computed } from '@vue/reactivity';
const store = useCategory()
const route = useRoute()
console.log(store.list)
// 获取轮播图数据
const sliders = ref([]);
findBanner().then((data: any) => {
  sliders.value = data.data.result;
});
// 获取面包屑 + 所有子分类  状态管理
const topCategory = computed(() => {
  const cate = {}

  return store.list.find((item: any) => {
    return item.id === route.params.id
  })
})
</script>

<style scoped lang="less">
.top-category {
  height: 1000px;
  background-color: #f5f5f5;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
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
