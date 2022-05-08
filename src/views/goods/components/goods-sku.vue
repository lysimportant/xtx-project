<template>
  <div class="goods-sku">
    <template v-for="item in props.goods.specs" :key="item.id">
      <dl>
        <dt>{{ item.name }}</dt>
        <dd>
          <template v-for="val in item.values" :key="val.name">
            <img
              @click="changeSku(item, val)"
              v-if="val.picture"
              :src="val.picture"
              :class="{ selected: val.selected, disabled: val.disabled }"
              :title="val.name"
            />
            <span
              @click="changeSku(item, val)"
              :class="{ selected: val.selected, disabled: val.disabled }"
              v-else
              >{{ val.name }}</span
            >
          </template>
        </dd>
      </dl>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import bwPowerSet from '../../../vender/power-set';
const props = defineProps<{ goods: any; skuId?: string }>();
const emit = defineEmits(['change']);
// 初始化选中
const initDefaultSelected = (goods: any, skuId: string) => {
  // 1. 找出sku的信息
  // 2. 遍历每一个按钮,按钮的值和sku记录的值相同,就选中
  const sku = goods.skus.find((sku: any) => sku.id === skuId);
  goods.specs.forEach((item: any, index: number) => {
    const val = item.values.find(
      (val: any) => val.name === sku.specs[index].valueName
    );
    val.selected = true;
  });
};
// 获取可能被选中的值
const getSelectedValues = (specs: any) => {
  const arr: any = [];
  specs.forEach((item: any) => {
    const selected = item.values.find((val: any) => val.selected);
    arr.push(selected ? selected.name : undefined);
  });
  return arr;
};
// 得到一个路径字典对象
const spliter = '★';
// 更新按钮禁用状态
const updateDisableStatus = (specs: any, pathMap: any) => {
  specs.forEach((item: any) => {
    const selectedValues = getSelectedValues(specs);
    item.values.forEach((val: any, index: number) => {
      // 2. 判断当前是否选中,是选中不做判断
      if (val.selected) return;
      // 3.拿当前值按钮顺序套入选中的值数组
      selectedValues[index] = val.name;
      // 4. 剔除undefined数据,按照分隔符拼接一个key
      const key = selectedValues.filter((value: any) => value).join(spliter);
      // 5. 拿key和路径字典对比
      val.disabled = !pathMap[key];
    });
  });
};

// 根据skus数据得到路径字典对象
const getPathMap = (skus: any) => {
  // 1. 得到所有的sku集合 props.goods.skus
  // 2. 从所有的sku中筛选出有效的sku
  // 3. 根据有效的sku使用powerset算法得到子集
  // 4. 根据子集往路径字典对象中存储 key: value
  const pathMap: any = {};
  skus.forEach((sku: any) => {
    // 1. 过滤出有库存有效的sku
    if (sku.inventory > 0) {
      // [1,2,3] => [[1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]
      // 2. 得到sku属性值数组
      const specs = sku.specs.map((spec: any) => spec.valueName);
      // 3. 得到sku属性值数组的子集
      const powerSet = bwPowerSet(specs);
      // 4. 设置给路径字典对象
      powerSet.forEach((set) => {
        const key = set.join(spliter);
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id);
        } else {
          // 没有key设置一个数组
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};
const pathMap = getPathMap(props.goods.skus);
updateDisableStatus(props.goods.specs, pathMap);
if (props.skuId) {
  initDefaultSelected(props.goods, props.skuId);
}
// 1. 每个按钮都有自己的选中状态 selectd
// 1.1 点击的是已选中,只需要取消当前选中
// 1.2 点击的是未选中,把所有选中的取消,再选中当前点击的
const changeSku = (item: any, val: any) => {
  if (val.disabled) return;
  if (val.selected) {
    val.selected = false;
  } else {
    item.values.forEach((val: any, index: number) => {
      val.selected = false;
    });
    val.selected = true;
    // 点击按钮时 更新状态
  }
  updateDisableStatus(props.goods.specs, pathMap);
  // 将选中的sku信息通知父组件{ skuId, price, oldprice, inventory, specsText}
  // 1. 选中完整的sku组件按钮, 才可以拿到这些信息,提交父组件
  // 2. 不是完整的sku组件按钮,提交空对象父组件
  const validselectedValues = getSelectedValues(props.goods.specs).filter(
    (v: any) => v
  );
  if (validselectedValues.length === props.goods.specs.length) {
    const skuIds = pathMap[validselectedValues.join(spliter)];
    const sku = props.goods.skus.find((sku: any) => sku.id === skuIds[0]);
    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs
        .reduce((p: any, n: any) => `${p} ${n.name}：${n.valueName}`, '')
        .replace(' ', '')
    });
    // p 上一次的值
  } else {
    emit('change', {});
  }
};
</script>
<script lang="ts">
export default {
  name: 'GoodsSku'
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: #27ba9b;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
