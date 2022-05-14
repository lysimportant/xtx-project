<template>
  <div class="xtx-confirm" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ props.title }}</h3>
        <a
          href="JavaScript:;"
          class="iconfont icon-close-new"
          @click="props.cancelCallback"
        ></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ props.text }}</span>
      </div>
      <div class="footer">
        <slot name="footer">
          <LButton size="mini" type="gray" @click="props.cancelCallback"
            >取消</LButton
          >
          <LButton size="mini" type="primary" @click="props.submitCallback"
            >确认</LButton
          >
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, ref, onMounted } from 'vue';
import LButton from '../l-button/l-button.vue';
interface Props {
  title: string;
  text: string;
  cancelCallback?: any;
  submitCallback?: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '温馨提示'
});
const fade = ref(false);
onMounted(() => {
  setTimeout(() => {
    fade.value = true;
  }, 0);
});
</script>
<script lang="ts">
export default {
  name: 'LConfirm'
};
</script>
<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: #cf4444;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
