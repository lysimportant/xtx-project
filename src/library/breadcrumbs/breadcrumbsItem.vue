<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="props.to" :to="props.to"> <slot /> </RouterLink>
    <span v-else> <slot /> </span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'breadcrumbsItem'
};
</script>
<script lang="ts" setup>
import { defineProps } from 'vue';
interface Props {
  to?: any;
}
const props = defineProps<Props>();
</script>
