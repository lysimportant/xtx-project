<template>
  <div class="header-sticky" :class="{ show: y > 78 }">
    <div class="container" v-show="y > 78">
      <TopNavHeader :top="'80px'" />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TopNavHeader from 'components/TopNav/TopNavHeader.vue';
// 记录屏幕Y轴的高度
const y = ref(0);
onMounted(() => {
  window.onscroll = (e) => {
    const scrollTop = document.documentElement.scrollTop;
    y.value = scrollTop;
  };
});
</script>

<style scoped lang="less">
.header-sticky {
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #fff;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    width: 1240px;
    margin: 0 auto;
    display: flex;
    .right {
      height: 20px;
      margin: auto;
      width: 220px;
      display: flex;
      text-align: center;
      padding-left: 40px;
      border-left: 2px solid #27ba9b;
      a {
        padding: 0 20px;
      }
    }
  }
}
</style>
