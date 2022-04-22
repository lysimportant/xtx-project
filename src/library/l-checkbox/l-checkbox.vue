<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, ref, watch, defineEmits } from 'vue';
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false
})
const checked = ref(false);
const changeChecked = () => {
  checked.value = !checked.value;
  emit('update:modelValue', checked.value)
};
watch(() => props.modelValue, () => {
  checked.value = props.modelValue
}, { immediate: true })
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
