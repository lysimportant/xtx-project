<template>
  <breadcrumbs>
    <breadcrumbsItem to="/">首页</breadcrumbsItem>
    <breadcrumbsItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</breadcrumbsItem>
    <Transition name="fade-right" mode="out-in">
      <breadcrumbsItem v-if="category.sub" :key="category.sub.name">{{
        category.sub.name
      }}</breadcrumbsItem>
    </Transition>
  </breadcrumbs>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { cate } from './sub-bread-config';
import { useRoute } from 'vue-router';
import { useCategory } from '../../../../store/useCategory';
const store = useCategory();
const route = useRoute();
const category = computed(() => {
  const cate: cate = {};
  store.list.forEach((top: any) => {
    if (top.children) {
      const sub = top.children.find((sub: any) => sub.id === route.params.id);
      if (sub) {
        cate.top = { id: top.id, name: top.name };
        cate.sub = { id: sub.id, name: sub.name };
      }
    }
  });
  return cate;
});
</script>

<style scoped lang="less"></style>
