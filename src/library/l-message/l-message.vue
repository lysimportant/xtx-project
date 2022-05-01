<template>
  <Transition name="down">
    <div class="xtx-message" :style="style[props.type]" v-show="visable">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[props.type].icon]"></i>
      <span class="text">{{ props.text }}</span>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, ref, onMounted } from 'vue';

interface Props {
  text: string;
  type: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'warn',
  text: ''
});
const visable = ref(false);
onMounted(() => {
  visable.value = true;
});
// 定义一个对象，包含三种情况的样式，对象key就是类型字符串
const style = {
  warn: {
    icon: 'icon-warning',
    color: '#E6A23C',
    backgroundColor: 'rgb(253, 246, 236)',
    borderColor: 'rgb(250, 236, 216)'
  },
  error: {
    icon: 'icon-shanchu',
    color: '#F56C6C',
    backgroundColor: 'rgb(254, 240, 240)',
    borderColor: 'rgb(253, 226, 226)'
  },
  success: {
    icon: 'icon-queren2',
    color: '#67C23A',
    backgroundColor: 'rgb(240, 249, 235)',
    borderColor: 'rgb(225, 243, 216)'
  }
};
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      transform: translate3d(0, 75px, 0);
      background-color: red;
      opacity: 1;
    }
    &-active {
      transition: all 5s;
    }
    &-to {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
  }
}
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 35px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
