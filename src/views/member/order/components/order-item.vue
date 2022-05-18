<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span class="down-time" v-if="order.orderState === 1">
        <i class="iconfont icon-down-time"></i>
        <b>付款截止：{{ timeText }}</b>
      </span>
      <a
        href="javascript:'"
        class="del"
        @click="emit('on-delete', order)"
        v-if="[5, 6].includes(order.orderState)"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="(goods, index) in order.skus" :key="goods.id">
            <RouterLink class="image" :to="`/product/${goods.id}`">
              <img :src="goods.image" alt="" />
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">
                {{ goods.name }}
              </p>
              <p class="attr ellipsis">
                <span>{{ goods.attrsText }}</span>
              </p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <!-- 待收货  查看物流 -->
        <!-- 待评价  评价商品 -->
        <!-- 已完成  查看评价 -->
        <p @click="$emit('on-logistics', order)" v-if="order.orderState === 3">
          <a class="green" href="javascript:;">查看物流</a>
        </p>
        <p v-if="order.orderState === 4">
          <a class="green" href="javascript:;">评价商品</a>
        </p>
        <p v-if="order.orderState === 5">
          <a class="green" href="javascript:;">查看评价</a>
        </p>
        <!--  -->
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <LButton
          @click="$router.push(`/member/pay?orderId=${order.id}`)"
          v-if="order.orderState === 1 && order.countdown > -1"
          type="primary"
          size="small"
          >立即付款</LButton
        >
        <LButton v-if="order.orderState === 3" type="primary" size="small"
          >确认收货</LButton
        >
        <p>
          <a
            href="javascript:;"
            @click="$router.push(`/member/order/${order.id}`)"
            >查看详情</a
          >
        </p>
        <p v-if="order.orderState === 1">
          <a href="javascript:;" @click="emit('on-cancel', order)">取消订单</a>
        </p>
        <p v-if="[2, 3, 4, 5].includes(order.orderState)">
          <a href="javascript:;">再次购买</a>
        </p>
        <p v-if="[4, 5].includes(order.orderState)">
          <a href="javascript:;">申请售后</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue';
import { orderStatus } from '@/api/constant';
import { usePayTime } from '../../../../hooks';
const emit = defineEmits(['on-cancel', 'on-delete', 'on-logistics']);
interface Props {
  order: any;
}
const props = withDefaults(defineProps<Props>(), {
  order: {}
});
const { start, timeText } = usePayTime();
start(props.order.countdown);
</script>

<style scoped lang="less">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: #27ba9b;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: #cf4444;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: #27ba9b;
          }
        }
      }
    }
  }
}
</style>
