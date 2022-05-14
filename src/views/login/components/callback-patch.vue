<template>
  <Form
    ref="FormRef"
    :validation-schema="mySchema"
    class="xtx-form"
    autocomplete="off"
    v-slot="{ errors }"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          :class="{ err: errors.account }"
          v-model="form.account"
          name="account"
          class="Field input"
          type="text"
          placeholder="请输入用户名"
        />
      </div>
      <div class="error" v-if="errors.account">
        <i class="iconfont icon-warning" />
        {{ errors.account }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          :class="{ err: errors.mobile }"
          v-model="form.mobile"
          name="mobile"
          class="Field input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="error" v-if="errors.mobile">
        <i class="iconfont icon-warning" />
        {{ errors.mobile }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
          class="Field input"
          type="text"
          placeholder="请输入验证码"
        />
        <span class="code" @click="sendCode">{{
          isActive ? time + 's后发送' : '发送验证码'
        }}</span>
      </div>
      <div class="error" v-if="errors.code">
        <i class="iconfont icon-warning" />
        {{ errors.code }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.password }"
          v-model="form.password"
          name="password"
          class="Field input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
      <div class="error" v-if="errors.password">
        <i class="iconfont icon-warning" />
        {{ errors.password }}
      </div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          :class="{ err: errors.rePassword }"
          v-model="form.rePassword"
          name="rePassword"
          class="Field input"
          type="password"
          placeholder="请确认密码"
        />
      </div>
      <div class="error" v-if="errors.rePassword">
        <i class="iconfont icon-warning" />
        {{ errors.rePassword }}
      </div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>

<script lang="ts" setup>
import { defineProps, onUnmounted, reactive, ref, withDefaults } from 'vue';
import { useRoute } from 'vue-router';
import schema from '../config/form-validate';
import { userQQPatchCode, userQQPatchLogin } from '../../../api/user';
import { Field, Form } from 'vee-validate';
import { useIntervalFn } from '@vueuse/core';
import Message from '../../../plugins/Toast';
import { useUser } from '../../../store/useUser';
import localCache from '../../../utils/cache';
import router from '../../../router';
import { useCart } from '../../../store/useCart';
const store = useUser();
const CartStore = useCart();
const route = useRoute();
const FormRef = ref();
interface Props {
  unionId: string;
}
const props = withDefaults(defineProps<Props>(), {
  unionId: ''
});
const form = reactive({
  account: '',
  mobile: '',
  code: '',
  password: '',
  rePassword: ''
});
const mySchema = {
  account: schema.accountApi,
  mobile: schema.mobile,
  code: schema.code,
  rePassword: schema.rePassword,
  password: schema.password
};
// 发送验证码
const time = ref(0);
const { pause, resume, isActive } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false }
);
onUnmounted(() => {
  pause(); // 销毁定时器
});
const sendCode = async () => {
  const { valid: mobile, errors } = await FormRef.value.validateField('mobile');
  if (mobile) {
    // 通过
    if (time.value === 0) {
      try {
        await userQQPatchCode(form.mobile);
        Message({ type: 'success', text: '发送成功' });
        time.value = 60;
        resume();
      } catch (error: any) {
        Message({ type: 'error', text: error.response.data.message });
      }
    }
  } else {
    Message({ type: 'error', text: '请输入正确的手机号码' });
  }
};
const submit = async () => {
  // const { valid: mobile, errors: MError } = await FormRef.value.validateField(
  //   'mobile'
  // );
  // const { valid: code, errors: CError } = await FormRef.value.validateField(
  //   'code'
  // );
  const valid = await FormRef.value.validate();
  if (valid) {
    const { mobile, code, account, password } = form;
    try {
      const {
        data: { result: res }
      } = await userQQPatchLogin(
        props.unionId,
        mobile,
        code,
        account,
        password
      );
      console.log(res, 'loginFn');
      loginFn(res);
    } catch (error) {
      console.log(error);
      Message({ type: 'error', text: '绑定失败' });
    }
  }
};
// 登录简化函数
const loginFn = (res: any) => {
  let { id, account, nickname, avatar, token, mobile } = res;
  nickname = account;
  store.setUser({ id, account, nickname, avatar, token, mobile });
  localCache.setCache('user', {
    id,
    account,
    nickname,
    avatar,
    token,
    mobile
  });
  CartStore.mergeCart().then(() => {
    router.push(store.redirectUrl || '/');
    return Message({ type: 'success', text: 'QQ完善信息完成,页面跳转' });
  });
};
</script>

<style scoped lang="less">
@import '../config/login-callback-common';

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
