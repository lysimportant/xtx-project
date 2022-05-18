<template>
  <LDialog
    :title="`${formData.id ? '修改' : '添加'}收货地址`"
    v-model:visible="dialogVisible"
  >
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <LCity
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择所在地区"
            />
          </div>
        </div>

        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postalCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <LButton
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</LButton
      >
      <LButton type="primary" @click="submit">确认</LButton>
    </template>
  </LDialog>
</template>
<script lang="ts" setup>
import { ref, defineExpose, reactive, defineEmits } from 'vue';
import { addAddress, editAddress } from '@/api/order';
import Message from '@/plugins/Toast';
const emit = defineEmits(['on-success']);
const dialogVisible = ref(false);

// 打开函数
const open = (address: any) => {
  if (address.id) {
    for (const key in address) {
      if (key === 'isDefault') continue;
      formData[key] = address[key];
    }
  } else {
    for (const key in formData) {
      if (key === 'isDefault') continue;
      formData[key] = '';
    }
  }
  dialogVisible.value = true;
};
// 定义表单数据对象
const formData: any = reactive({
  receiver: null,
  contact: null,
  provinceCode: null,
  cityCode: null,
  countyCode: null,
  address: null,
  postalCode: null,
  addressTags: null,
  isDefault: 1,
  // 城市组件显示文字（完整行政区地址）
  fullLocation: null,
  id: null
});
const changeCity = (result: any) => {
  formData.provinceCode = result.provinceCode;
  formData.cityCode = result.cityCode;
  formData.countyCode = result.countyCode;
  formData.fullLocation = result.fullLocation;
};
// 数据提交
const submit = () => {
  if (formData.id) {
    editAddress(formData).then(() => {
      emit('on-success', formData);
      dialogVisible.value = false;
      Message({ type: 'success', text: '修改收货地址成功~' });
    });
  } else {
    addAddress(formData).then(({ data: { result: res } }) => {
      // 1. 校验
      // 2. 发送了请求
      // 添加ID
      formData.id = res.id;
      emit('on-success', formData);
      dialogVisible.value = false;
      Message({ type: 'success', text: '添加收货地址成功~' });
    });
  }
};
defineExpose({
  open
});
</script>
<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
