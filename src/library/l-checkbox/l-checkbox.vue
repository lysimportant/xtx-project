<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LCheckbox'
};
</script>
<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { defineProps, withDefaults, defineEmits } from 'vue';
const emit = defineEmits(['update:modelValue', 'change']);
const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false
});
// 使用useVModel实现双向数据绑定v-model指令
// 1. 使用props接收modelValue
// 2. 使用useVModel来包装props中的modelValue属性数据
// 3. 在使用checked.value就是使用父组件数据
// 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
const checked = useVModel(props, 'modelValue', emit);

const changeChecked = () => {
  // 更新父组件的值
  checked.value = !checked.value;
  // 让组件支持 change 事件
  emit('change', checked.value);
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: #27ba9b;
    ~ span {
      color: #27ba9b;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
