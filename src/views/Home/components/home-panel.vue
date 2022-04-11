<template>
  <div class="home-panel-container">
    <div class="container">
      <div class="head">
        <h3>
          {{ props.title }}<small>{{ props.subTitle ?? '' }}</small>
        </h3>
        <!-- 右上角的内容 具名插槽 -->
        <slot name="right"></slot>
      </div>
      <!-- 主题内容的插件 默认插槽 #default -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
interface Props {
  title: string;
  subTitle?: string;
}
const props = defineProps<Props>();
</script>

<style scoped lang="less">
.home-panel-container {
  background-color: #fff;
  .container {
    width: 1240px;
    margin: 0 auto;
    .head {
      padding: 40px 0;
      display: flex;
      align-items: flex-end;
      h3 {
        flex: 1;
        font-size: 32px;
        font-weight: normal;
        margin-left: 6px;
        height: 35px;
        line-height: 35px;
        small {
          font-size: 16px;
          color: #999;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
