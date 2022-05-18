// 提供服用逻辑 函数 hooks
import { ref, onUnmounted } from 'vue';
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
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

export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0);
  const timeText = ref('');
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (time.value <= 0) {
        pause();
      }
      time.value--;
      timeText.value = dayjs.unix(time.value).format('mm分ss秒');
    },
    1000,
    { immediate: false }
  );
  onUnmounted(() => {
    pause();
  });
  const start = (countdown: number) => {
    time.value = countdown;
    timeText.value = dayjs.unix(time.value).format('mm分ss秒');
    resume();
  };
  return {
    start,
    timeText
  };
};
