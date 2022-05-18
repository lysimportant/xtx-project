<script lang="tsx">
import { defineComponent, inject } from 'vue';
export default defineComponent({
  name: 'LTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const activeName = inject('activeName');
    return {
      activeName
    };
  }
});
</script>
<template></template>
