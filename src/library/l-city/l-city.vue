<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder" v-if="!props.fullLocation">{{
        props.placeholder
      }}</span>
      <span class="value" v-else>{{
        props.fullLocation ?? changeResult.fullLocation
      }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currList"
          :key="item.code"
        >
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LCity'
};
</script>
<script lang="ts" setup>
import { computed, ref, defineProps, reactive, defineEmits } from 'vue';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios';
const props = defineProps<{ fullLocation: any; placeholder: string }>();
const emit = defineEmits(['change']);
// import
// 控制展开收起,默认收起
const active = ref(false);
// 城市数据
const allCityData = ref([]);
// 数据加载中的变量
const loading = ref(false);

const openDialog: any = () => {
  // 获取
  loading.value = true;
  active.value = true;
  getCityData().then((data: any) => {
    allCityData.value = data;
    loading.value = false;
    for (const key in changeResult) {
      changeResult[key] = '';
    }
  });
};
const closeDialog = () => {
  active.value = false;
};
// 切换展开收起
const toggleDialog = () => {
  if (active.value) closeDialog();
  else openDialog();
};
// 点击其他位置隐藏
const target = ref(null);
onClickOutside(target, () => {
  closeDialog();
});
// 获取省市区数据函数
const getCityData = () => {
  const url =
    'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
  // 1. 没有本地缓存
  // 2.有缓存,取出本地数据
  // 返回的数据可能是同步页可能是异步 Promise 统一处理
  return new Promise((resolve, rejects) => {
    // 约定数据缓存在 本地缓存中
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      axios.get(url).then((res) => {
        window.cityData = res.data;
        resolve(res.data);
      });
    }
  });
};
const changeResult: any = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
});
// 计算属性: 获取当前显示的地区数组
const currList = computed(() => {
  // 默认显示第一层
  let list: any = allCityData.value;
  // 可能: 市一级
  if (changeResult.provinceCode && changeResult.provinceName) {
    list = list.find(
      (item: any) => item.code === changeResult.provinceCode
    ).areaList;
  }
  // 可能: 县一级
  if (changeResult.cityCode && changeResult.cityName) {
    list = list.find(
      (item: any) => item.code === changeResult.cityCode
    ).areaList;
  }
  return list;
});
const changeItem = (item: any) => {
  if (item.level === 0) {
    // 省
    changeResult.provinceCode = item.code;
    changeResult.provinceName = item.name;
  }
  if (item.level === 1) {
    // 市
    changeResult.cityCode = item.code;
    changeResult.cityName = item.name;
  }
  if (item.level === 2) {
    // 区
    changeResult.countyCode = item.code;
    changeResult.countyName = item.name;
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
    closeDialog();
    emit('change', changeResult);
  }
};
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/img/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
