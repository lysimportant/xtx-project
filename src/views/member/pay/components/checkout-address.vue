<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
          }}
        </li>
        <li>
          <span>收货地址：</span>{{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}
        </li>
      </ul>

      <a @click="openAddressesEdit(showAddress)" href="javascript:;"
        >修改地址</a
      >
    </div>
    <div class="action">
      <LButton class="btn" @click="dislogVisible = true">切换地址</LButton>
      <LButton class="btn" @click="openAddressesEdit({})">添加地址</LButton>
    </div>
  </div>
  <!-- Dialog -->
  <LDialog
    @change="selectedAddress = null"
    title="切换收货地址"
    v-model:visible="dislogVisible"
  >
    <template #>
      <div
        @click="selectedAddress = item"
        class="text item"
        v-for="item in props.list"
        :class="{ active: selectedAddress && selectedAddress.id === item.id }"
        :key="item.id"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li>
            <span>联系方式：</span
            >{{ item.contact.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
          </li>
          <li>
            <span>收货地址：</span
            >{{ item.fullLocation.replace(/ /g, '') + item.address }}
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <LButton
        type="gray"
        style="margin-right: 20px"
        @click="(dislogVisible = false), (selectedAddress = null)"
        >取消</LButton
      >
      <LButton
        type="primary"
        @click="
          (dislogVisible = false),
            (showAddress = selectedAddress),
            emit('change', selectedAddress.id),
            (selectedAddress = null)
        "
        >确认</LButton
      >
    </template>
  </LDialog>
  <!-- 收货添加和编辑的组件 -->
  <addressEdit
    @on-success="successHandler"
    ref="addressEditCom"
  />
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';
import addressEdit from './address-edit.vue';
const props = defineProps<{ list: any[] }>();
const emit = defineEmits(['change']);
const showAddress = ref<any>();
const defaultAddresses = props.list.find((item) => item.isDefault === 0);
// 找到默认收货地址
if (defaultAddresses) {
  showAddress.value = defaultAddresses;
} else {
  if (props.list.length) {
    showAddress.value = props.list[0];
  }
}

// 默认通知父组件一个收货地址
emit('change', showAddress.value && showAddress.value.id);
// 控制地址Dialog框显示和隐藏
const dislogVisible = ref(false);
// 记录当前你选中的地址ID
const selectedAddress = ref<any>(null);
const addressEditCom = ref<InstanceType<typeof addressEdit>>();
// 打开添加地址对话框
const openAddressesEdit = (address: {}) => {
  // 添加 空对象 修改 地址数据
  addressEditCom.value?.open(address);
};
//
const successHandler = (form: any) => {
  // 根据ID查找数据,有则是修改数据,反之就是添加数据
  const address = props.list.find(item => item.id === form.id)
  if (address) {
    for (const key in address) {
      address[key] = form[key];
    }
  } else {
    // 添加 往list追加一条
    const JsonStr = JSON.stringify(form);
    props.list.unshift(JSON.parse(JsonStr));
  }

};
</script>
<script lang="ts">
export default {
  name: 'CheckoutAddress'
};
</script>
<style scoped lang="less">
// 主题
@xtxColor: #27ba9b;
// 辅助
@helpColor: #e26237;
// 成功
@sucColor: #1dc779;
// 警告
@warnColor: #ffb302;
// 价格
@priceColor: #cf4444;

.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}

.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
