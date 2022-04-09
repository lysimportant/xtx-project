<template>
  <div
    class="xtx-carousel"
    @mouseenter="mouseEvent(true)"
    @mouseleave="mouseEvent(false)"
  >
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: Index === index }"
        v-for="(item, index) in props.sliders"
        :key="index"
      >
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left" @click="toggle(-1)"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right" @click="toggle(1)"></i
    ></a>
    <div class="carousel-indicator">
      <template v-for="(item, i) in props.sliders" :key="i">
        <span @click="Index = i" :class="{ active: Index === i }"></span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'carousel'
}
</script>
<script lang="ts" setup>
import { defineProps, ref, withDefaults, watch, onUnmounted } from 'vue'
interface Props {
  sliders: any[] // 轮播图数据
  autoplay?: boolean // 是否自动播放
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  sliders: <any>[],
  autoplay: false,
  duration: 3000
})
// 图片的索引值
const Index = ref(0)

// 自动播放函数
let timer: any = null // 保存定时器
const autoPlayFn = () => {
  clearInterval(timer)
  // 设置定时器 用于自动播放图片
  timer = setInterval(() => {
    Index.value++
    if (Index.value >= props.sliders.length) {
      Index.value = 0
    }
  }, props.duration)
}
// 自动播放的条件: sliders数据变化 且autoplay 为 true
watch(
  () => props.sliders,
  (n) => {
    if (n.length && props.autoplay) {
      autoPlayFn()
    }
  },
  {
    immediate: true
  }
)

// 2. 鼠标离开和进入添加时间和删除事件
const mouseEvent = (v: boolean) => {
  if (v && timer && props.autoplay) {
    // 清楚定时器
    clearInterval(timer)
  } else if (props.sliders.length && props.autoplay) {
    // 启动自动循环
    autoPlayFn()
  }
}

const toggle = (index: number) => {
  // if(Index.value <= 0) {
  //   Index.value = props.sliders.length
  // } else if (Index.value >=  props.sliders.length){
  //   Index.value = 0
  // }
  const newValue = Index.value + index
  // 超出索引
  if (newValue > props.sliders.length - 1) {
    Index.value = 0
    return
  }
  // 少于索引
  if (newValue < 0) {
    Index.value = props.sliders.length - 1
    return
  }
  // 正常
  Index.value = newValue
}
onUnmounted(() => {
  // 卸载组件时清楚定时器
  clearInterval(timer)
})
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
