<template v-if="props.goods">
  <p class="g-name">{{ goods.name }}</p>
  <p class="g-desc">{{ goods.desc }}</p>
  <p class="g-price">
    <span>{{ goods.price }}</span>
    <span>{{ goods.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>
        至
        <LCity
          placeholder="请选择配送地址"
          :fullLocation="fullLocation"
          @change="changeCity"
        />
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import LCity from '../../../library/l-city/l-city.vue';
const props = defineProps<{ goods: any }>();
// 提供给后台的数据
const provinceCode = ref('110000');
const cityCode = ref('119900');
const countyCode = ref('110101');
const fullLocation = ref('北京市 市辖区 东城区');
// 取出用户收获地址中默认地址给的四个数据
if (props.goods.userAddresses) {
  console.log('帐号登录了', props.goods);
  // 登录
  const defaultAddresses = props.goods.userAddresses.find(
    (item: any) => item.isDefault === 1
  );
  if (defaultAddresses) {
    // 默认地址
    provinceCode.value = defaultAddresses.provinceCode;
    cityCode.value = defaultAddresses.cityCode;
    countyCode.value = defaultAddresses.countyCode;
    fullLocation.value = defaultAddresses.fullLocation;
  }
}
const changeCity = (item: any) => {
  provinceCode.value = item.provinceCode;
  cityCode.value = item.cityCode;
  countyCode.value = item.countyCode;
  fullLocation.value = item.fullLocation;
};
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }
    &:first-child {
      color: #cf4444;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: '•';
            color: #27ba9b;
            margin-right: 2px;
          }
        }
        a {
          color: #27ba9b;
        }
      }
    }
  }
}
</style>
