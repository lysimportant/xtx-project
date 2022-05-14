<template>
  <div class="cart">
    <RouterLink class="curr" to="/cart">
      <i class="iconfont icon-cart"></i>
      <em>{{ store.validTotal }}</em>
    </RouterLink>
    <div class="layer" v-if="store.validTotal > 0 && $route.path !== '/cart'">
      <div class="list">
        <div class="item" v-for="i in store.validList" :key="i.skuId">
          <RouterLink :to="`/product/${i.id}`">
            <img :src="i.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">{{ i.name }}</p>
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ i.nowPrice }}</p>
              <p class="count">x{{ i.count }}</p>
            </div>
          </RouterLink>
          <i @click="removeCart(i.skuId)" class="iconfont icon-close-new"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ store.validTotal }} 件商品</p>
          <p>&yen; {{ store.validTotalPrice }}</p>
        </div>
        <RouterLink to="/cart">
          <LButton type="plain">去购物车结算</LButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCart } from '../../store/useCart';
import Message from '../../plugins/Toast';
const store = useCart();
store.findCart().then((res) => {
  Message({ type: 'success', text: '更新本地购物车成功' });
});
const removeCart = (skuId: string) => {
  store.deleteCart(skuId);
};
</script>
<script lang="ts">
export default {
  name: 'TopNavCart'
};
</script>
<style scoped lang="less">
.cart {
  position: relative;
  z-index: 666;
  display: flex;
  align-items: center;
  width: 50px;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: -10px;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: #e26237;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
}

.layer {
  opacity: 0;
  transition: all 0.4s 0.2s;
  transform: translateY(-200px) scale(1, 0);
  width: 400px;
  height: 400px;
  position: absolute;
  top: 100px;
  right: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 4px;
  padding-top: 10px;
  &::before {
    content: '';
    position: absolute;
    right: 14px;
    top: -10px;
    width: 20px;
    height: 20px;
    background: #fff;
    transform: scale(0.6, 1) rotate(45deg);
    box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
  }
  .foot {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 70px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background: #f8f8f8;
    align-items: center;
    .total {
      padding-left: 10px;
      color: #999;
      p {
        &:last-child {
          font-size: 18px;
          color: #cf4444;
        }
      }
    }
  }
}
.list {
  height: 310px;
  overflow: auto;
  padding: 0 10px;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f8f8f8;
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
  .item {
    border-bottom: 1px solid #f5f5f5;
    padding: 10px 0;
    position: relative;
    i {
      position: absolute;
      bottom: 38px;
      right: 0;
      opacity: 0;
      color: #666;
      transition: all 0.5s;
    }
    &:hover {
      i {
        opacity: 1;
        cursor: pointer;
      }
    }
    a {
      display: flex;
      align-items: center;
      img {
        height: 80px;
        width: 80px;
      }
      .center {
        padding: 0 10px;
        width: 200px;
        .name {
          font-size: 16px;
        }
        .attr {
          color: #999;
          padding-top: 5px;
        }
      }
      .right {
        width: 100px;
        padding-right: 20px;
        text-align: center;
        .price {
          font-size: 16px;
          color: #cf4444;
        }
        .count {
          color: #999;
          margin-top: 5px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
