<template>
  <div class="xtx-cart-page">
    <div class="container">
      <breadcrumbs>
        <breadcrumbsItem to="/">首页</breadcrumbsItem>
        <breadcrumbsItem>购物车</breadcrumbsItem>
      </breadcrumbs>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <LCheckbox @change="changeCheck" :modelValue="store.isCheckAll"
                  >全选</LCheckbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="store.validList.length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="(goods, index) in store.validList" :key="goods.id">
              <td>
                <LCheckbox
                  @change="($event) => updateSelected(goods.skuId, $event)"
                  v-model="goods.selected"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <!-- <p class="attr">{{ goods.attrsText }}</p> -->
                    <!-- 选择规格组件 -->
                    <CartSku
                      :skuId="goods.skuId"
                      @change="($event) => updateCartSku(goods.skuId, $event)"
                      :attrsText="goods.attrsText"
                    />
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
                <p v-if="goods.price - goods.nowPrice > 0">
                  比加入时降价
                  <span class="red"
                    >&yen;{{ goods.price - goods.nowPrice }}</span
                  >
                </p>
              </td>
              <td class="tc">
                <LNumbox
                  @change="($event) => updateCount(goods.skuId, $event)"
                  :max="goods.stock"
                  v-model="goods.count"
                />
              </td>
              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (goods.nowPrice * goods.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(goods.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="store.inValidList.length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="(goods, index) in store.inValidList" :key="goods.skuId">
              <td><LCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>&yen;{{ (goods.nowPrice * goods.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteCart(goods.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <LCheckbox @change="changeCheck" :modelValue="store.isCheckAll"
            >全选</LCheckbox
          >
          <a href="javascript:;" @click="batchDeleteCart">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ store.validTotal }} 件商品，已选择
          {{ store.selectedTotal }} 件，商品合计：
          <span class="red">¥{{ store.selectedTotalPrice }}</span>
          <LButton type="primary" @click="submit">下单结算</LButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script lang="ts" setup>
import GoodRelevant from '../goods/components/goods-relevant.vue';
import CartNone from './components/cart-none.vue';
import CartSku from './components/cart-sku.vue';
import { useCart } from '../../store/useCart';
import Message from '../../plugins/Toast';
import confirm from '../../plugins/confirm';
const store = useCart();
// 删除多个商品
const batchDeleteCart = (flag?: any) => {
  confirm({
    text: `亲,您是否确认删除${flag ? '选中' : '失效选中'}的商品!`
  }).then(() => {
    store.batchDeletion(flag);
    Message({ type: 'success', text: '商品删除成功' });
  });
};
// 全选更改
const changeCheck = (selected: boolean) => {
  store.changeCheckAll(selected);
};
// 删除单个商品
const deleteCart = (skuId: any) => {
  confirm({ text: '请问是否删除该商品' }).then(
    (res) => {
      store.deleteCart(skuId);
      Message({ type: 'success', text: '商品删除成功' });
    },
    (reject) => {
      Message({ type: 'success', text: '已取消删除该商品' });
    }
  );
};
// 修改商品数量
const updateCount = (skuId: string, count: number) => {
  store.updateCart({ skuId, count });
};
// 修改商品选中
const updateSelected = (skuId: string, selected: boolean) => {
  store.updateCart({ skuId, selected });
};
const updateCartSku = (skuId: any, newSku: any) => {
  const obj: any = {};
  obj.skuId = skuId;
  obj.newSku = newSku;
  store.updateCartSku(obj);
};
// 点击下单
const submit = () => {

}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: #cf4444;
}
.green {
  color: #27ba9b;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
