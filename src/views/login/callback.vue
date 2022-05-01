<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LoginHeader from './components/login-header';
import LoginFooter from './components/login-footer';
import CallbackBind from './components/callback-bind';
import CallbackPatch from './components/callback-patch';
import { userQQLogin } from '../../api/user';
import localCache from '../../utils/cache';
import router from '../../router';
import Message from '../../plugins/Toast';
import { useUser } from '../../store/useUser';
const isBind = ref(true);
const hasAccount = ref(true);
const nickname = ref(null);
const avatar = ref(null);
const unionId = ref(null);
const store = useUser();
if (QC.Login.check()) {
  // 获取QQ的唯一标识方法
  QC.Login.getMe((openId: any) => {
    unionId.value = openId;
    userQQLogin(openId)
      .then((data: any) => {
        //  登录成功 data.result 是用户信息
        //  1. 存储用户信息
        const { id, account, nickname, avatar, token, mobile } =
          data.data.result;
        console.log('网络请求成功了', data.data.result);

        store.setUser({ id, account, nickname, avatar, token, mobile });
        localCache.setCache('user', {
          id,
          account,
          nickname,
          avatar,
          token,
          mobile
        });
        //  2. 跳转到来源页或者首页
        router.push(store.redirectUrl);
        //  3. 成功提示
        return Message({ type: 'success', text: 'QQ登录成功,页面跳转' });
      })
      .catch((e) => {
        // 登录失败
        isBind.value = false;
      });
    //  请求后台QQ登录
  });
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/img/load.gif) no-repeat center / 100px
        100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: #27ba9b;
      border-color: #27ba9b;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
