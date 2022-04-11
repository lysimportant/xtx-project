// 提供服用逻辑 函数 hooks
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
/**
 *数据懒加载
 * @param { Object } target - DOM Object
 * @param { Function } apiFn - API 函数
 * */
export const useLazyData = (apiFn: Function) => {
  let result = ref([]);
  const target = ref<InstanceType<typeof HTMLElement>>();
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入元素可视区
      if (isIntersecting) {
        stop();
        // API函数的调佣
        apiFn().then((res: any) => {
          result.value = res.data.result;
        });
      }
    },
    {
      threshold: 0
    }
  );
  return { result, target };
};
