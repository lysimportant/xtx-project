<template>
  <Form
    ref="FormRef"
    :validation-schema="schema"
    class="xtx-form"
    autocomplete="off"
    v-slot="{ errors, resetForm }"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          name="mobile"
          type="text"
          class="input"
          v-model="form.mobile"
          :class="{ err: errors.mobile }"
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
          type="password"
          placeholder="请输入验证码"
          class="input"
          :class="{ err: errors.code }"
          v-model="form.code"
          name="code"
        />
        <span class="code" @click="sendCode">{{
          isActive ? time + 's后发送' : '发送验证码'
        }}</span>
      </div>
      <div class="error" v-if="errors.code">
        <i class="iconfont icon-warning" />{{ errors.code }}
      </div>
    </div>
    <a href="javascript:;" @click="submit" class="submit">立即绑定</a>
  </Form>
</template>

<script lang="ts" setup>
import { defineProps, onUnmounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import schema from '../config/form-validate';
import { userQQBindCOde, userQQBindLogin } from '../../../api/user';
import { Field, Form } from 'vee-validate';
import { useIntervalFn } from '@vueuse/core';
import Message from '../../../plugins/Toast';
import { useUser } from '../../../store/useUser';
import localCache from '../../../utils/cache';
import router from '../../../router';
const store = useUser();
const route = useRoute();
interface Props {
  unionId: string;
}
const props = defineProps<Props>();
const nickname = ref('');
const avatar = ref('');
const mobile = ref('');
const FormRef = ref();
const form = reactive({
  mobile: '',
  code: ''
});
if (QC.Login.check()) {
  QC.api('get_user_info').success((res) => {
    console.log(res);
    nickname.value = res.data.nickname;
    avatar.value = res.data.figureurl_1;
  });
}
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
        await userQQBindCOde(form.mobile);
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
  console.log('手机登录');
  const { valid: mobile, errors: MError } = await FormRef.value.validateField(
    'mobile'
  );
  const { valid: code, errors: CError } = await FormRef.value.validateField(
    'code'
  );
  if (!MError[0] && !CError[0]) {
    const { mobile: Mmobile, code: Ccode } = form;
    try {
      const {
        data: { result: res }
      } = await userQQBindLogin(props.unionId, Mmobile, Ccode);
      loginFn(res);
      console.log(res);
    } catch (error) {
      console.log(error);
      Message({ type: 'error', text: '绑定失败' });
    }
  }
};
// 登录简化函数
const loginFn = (res: any) => {
  const { id, account, nickname, avatar, token, mobile } = res;
  store.setUser({ id, account, nickname, avatar, token, mobile });
  localCache.setCache('user', {
    id,
    account,
    nickname,
    avatar,
    token,
    mobile
  });
  router.push(route.query.redirectUrl || '/');
  return Message({ type: 'success', text: 'QQ登录成功,页面跳转' });
};
</script>
<style scoped lang="less">
@import '../config/login-callback-common';
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
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
