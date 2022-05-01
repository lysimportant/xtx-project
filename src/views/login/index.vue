<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          href="javascript:;"
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
          >账户登录</a
        >
        <a
          href="javascript:;"
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          >扫码登录</a
        >
      </nav>
      <!-- 表单 -->
      <LoginForm
        v-show="activeName === 'account'"
        class="account-box"
      ></LoginForm>
      <!-- 二维码 -->
      <div v-show="activeName === 'qrcode'" class="qrcode-box">
        <img src="@/assets/img/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import LoginHeader from './components/login-header.vue';
import LoginFooter from './components/login-footer.vue';
import LoginForm from './components/login-form.vue';
import { useUser } from '../../store/useUser';
import { useRoute } from 'vue-router';
const route = useRoute();
const store = useUser();
const activeName = ref('account');
store.setRedirectUtl(route.query.redirectUrl || '/');
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/img/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    // 二维码容器
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      img {
        width: 205px;
        height: 205px;
      }
      p {
        margin-top: 20px;
        a {
          color: #27ba9b;
          font-size: 16px;
        }
      }
    }
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: #27ba9b;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
