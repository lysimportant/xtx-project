<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="FormRef"
      :validation-schema="schema"
      class="form"
      autocomplete="off"
      v-slot="{ errors }"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="account"
              :class="{ error: errors.account }"
              v-model="form.account"
              type="text"
              placeholder="请输入用户名"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              name="password"
              v-model="form.password"
              :class="{ error: errors.password }"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              name="mobile"
              type="text"
              v-model="form.mobile"
              :class="{ error: errors.mobile }"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />
            {{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              type="password"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
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
      </template>
      <div class="form-item">
        <div class="agree">
          <Field v-model="form.isAgree" name="isAgree">
            <LCheckbox v-model="form.isAgree" />
          </Field>
          <!-- <Field
              name="isAgree"
              as="LCheckbox"
              v-model="form.isAgree"
              :class="{ error: errors.isAgree }"
          /> -->
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />{{ errors.isAgree }}
        </div>
      </div>
      <a href="javascript:;" @click="login" class="btn">登录</a>
    </Form>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <!--      <span id="qqLoginBtn"></span>-->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, onUnmounted, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../../router';
import { useCart } from '../../../store/useCart';
// 第三方校验插件
import { Form, Field } from 'vee-validate';
// 校验配置
import schema from '../config/form-validate';
// 自定义插件
import Message from '../../../plugins/Toast';
// 登录请求
import {
  userAccountLogin,
  userAccountLoginMsg,
  userMobileLogin
} from '../../../api/user';
// store 状态集中管理
import { useUser } from '../../../store/useUser';

import { useIntervalFn } from '@vueuse/core';

import localCache from '../../../utils/cache';
const CartStore = useCart();
const FormRef = ref();
const store = useUser();
const route = useRoute();
// 是否短信登录
const isMsgLogin = ref(false);
// 表单信息对象
const form = reactive<any>({
  isAgree: true,
  account: 'xiaotuxian001',
  password: '123456',
  code: null,
  mobile: '13123456789'
});

// 切换登录方式,重置值
watch(isMsgLogin, () => {
  FormRef.value.resetForm();
  Object.keys(form).forEach((key: any) => {
    if (key !== 'isAgree') {
      form[key] = null;
    } else {
      form[key] = true;
    }
  });
});
// 登录时的全部校验
const login = async () => {
  try {
    if (!isMsgLogin.value) {
      const { valid: account, errors: accountError } =
        await FormRef.value.validateField('account');

      const { valid: password, errors: passwordError } =
        await FormRef.value.validateField('password');

      const { valid: isAgree, errors: isAgreeError } =
        await FormRef.value.validateField('isAgree');

      if (!accountError[0] && !passwordError[0] && !isAgreeError[0]) {
        const { account: accounts, password } = form;

        const {
          data: { result: res }
        } = await userAccountLogin({ account: accounts, password });
        loginFn(res);
      }
    } else {
      const { valid: mobile, errors: MError } =
        await FormRef.value.validateField('mobile');
      const { valid: code, errors: CError } = await FormRef.value.validateField(
        'code'
      );
      const { valid: isAgree, errors: IError } =
        await FormRef.value.validateField('isAgree');
      if (!MError[0] && !CError[0] && !IError[0]) {
        const { mobile: Mmobile, code: Ccode } = form;
        const {
          data: { result: res }
        } = await userMobileLogin(Mmobile, Ccode);

        loginFn(res);
      }
    }
  } catch (error: any) {
    return Message({
      type: 'error',
      text: error.response.data.message || '登录失败'
    });
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

  CartStore.mergeCart()
    .then(() => {
      router.push((route.query.redirectUrl as string) || '/');
      return Message({ type: 'success', text: '登录成功,页面跳转' });
    })
    .catch((e) => {
      console.log(e);
    });
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
        await userAccountLoginMsg(form.mobile);
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
onMounted(() => {
  // QC.Login({ btnId: 'qqLoginBtn' });
  // console.log(QC.login, 'QC')
});
</script>

<style lang="less" scoped>
.ErrorMessage {
  color: red;
}
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: #27ba9b;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: #cf4444;
          }
          &.active,
          &:focus {
            border-color: #27ba9b;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: #cf4444;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: #27ba9b;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 63px;
      height: 24px;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
