<template>
  <div class="xtx-numbox">
    <div class="label" v-if="props.label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="props.modelValue" />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { defineProps, defineEmits, withDefaults } from 'vue';
interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  label: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: 1,
  max: 10,
  label: ''
});
const emit = defineEmits(['change', 'update:modelValue']);
// 使用vueuse@core 的useVMdel做数据的绑定, 修改num的值 通知父组件更新数据
const num = useVModel(props, 'modelValue', emit);
const changeNum = (step: number) => {
  // 得到将要修改的数据,如果值不合法(不在正确的范围之内)终止程序
  const newValue = num.value + step;
  if (newValue < props.min || newValue > props.max) return;
  num.value = newValue;
  // 提供change事件
  emit('change', newValue);
};
</script>
<script lang="ts">
export default {
  name: 'LNumbox'
};
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
