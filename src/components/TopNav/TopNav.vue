<template>
  <div class="nav-bar">
    <nav class="top-nav">
      <div>
        <ul class="clearfix">
          <template v-if="token">
            <li>
              <a href="javascript:;" class="login-left"
                ><i class="iconfont icon-user"></i>
                {{ store.profile.nickname ?? store.profile.account }}</a
              >
            </li>
            <li><a href="javascript:;" @click="logout">退出登录</a></li>
          </template>
          <template v-else>
            <li>
              <router-link href="javascript:;" class="login-left" to="/login"
                >请先登录</router-link
              >
            </li>
            <li><a href="javascript:;">免费注册</a></li>
          </template>
          <template v-for="item in navArr" :key="item">
            <li>
              <a href="javascript:;">{{ item }}</a>
            </li>
          </template>
          <li>
            <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="header-nav">
      <TopNavHeader />
      <div class="search">
        <div>
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="搜索" />
        </div>
      </div>
      <!-- 使用头部购物车组件 -->
      <TopNavCart />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '../../store/useUser';
import { useRouter } from 'vue-router';
import TopNavHeader from './TopNavHeader.vue';
import TopNavCart from './TopNavCart.vue';
import localCache from '../../utils/cache';
import { useCart } from '../../store/useCart';
const store = useUser();
const CartStore = useCart();
const router = useRouter();
const { token } = localCache.getCache('user') ?? { token: '' };

const navArr = ['我的订单', '会员中心', '帮助中心', '关于我们'];
const logout = () => {
  window.localStorage.clear();
  // CartStore.list = [];
  store.setUser({});
  router.push('/login');
};
</script>

<style scoped lang="less">
.nav-bar {
  .top-nav {
    // height: 53px;
    background: #333333;
    overflow: hidden;
    div {
      height: 53px;
      margin: 0 auto;

      width: 1240px;
      position: relative;
      ul {
        position: absolute;
        right: 0;
        li {
          display: inline-block;
          line-height: 53px;
          padding: 0 5px;
          .login-left {
            border: 0;
          }
          a {
            font-size: 14px;
            border-left: 2px solid rgb(102, 102, 102);
            color: #cdcdcd;
            padding: 0 5px;
            &:hover {
              color: #27ba9b;
            }
          }
        }
      }
    }
  }
  .header-nav {
    display: flex;
    // overflow: hidden;
    width: 1240px;
    margin: 0 auto;
    height: 132px;
    background: #fff;
    position: relative;

    // 搜索框
    .search {
      position: relative;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        border-bottom: 1px solid #e7e7e7;
        i {
          position: absolute;
          left: 10px;
          top: 42%;
        }
        input {
          width: 160px;
          border-radius: 5px;
          padding: 5px 15px;
        }
      }
    }
  }
}
</style>
