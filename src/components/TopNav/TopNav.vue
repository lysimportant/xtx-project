<template>
  <div class="nav-bar">
    <div class="top-nav">
      <ul>
        <template v-if="token">
          <li>
            <a href="javascript:;" class="login-left"
              ><i class="iconfont icon-user"></i> 用户名字</a
            >
          </li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" class="login-left">请先登录</a></li>
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
    <div class="header-nav">
      <h1><img src="~@/assets/img/logo.png" alt="" /></h1>
      <ul class="header-middle-nav">
        <template v-for="item in headerArr" :key="item">
          <li>
            <router-link to="/">{{ item }}</router-link>
          </li>
        </template>
      </ul>
      <div class="search">
        <div><i class="iconfont icon-search"></i> <input type="text" placeholder="搜索" /></div>
      </div>
      <div class="cart">
        <a href="javascript:;"><i class="iconfont icon-cart"></i><em>0</em></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const token = sessionStorage.getItem("token");
const navArr = ["我的订单", "会员中心", "帮助中心", "关于我们"];
const headerArr = ["首页", "居家", "美食", "服饰", "母婴", "个护", "严选", "数码", "运动", "杂项"];
</script>

<style scoped lang="less">
.nav-bar {
  height: 53px;
  background: #333333;
  .top-nav {
    width: 1240px;
    margin: 0 auto;
    overflow: hidden;
    ul {
      float: right;
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
  .header-nav {
    display: flex;
    overflow: hidden;
    width: 1240px;
    margin: 0 auto;
    height: 132px;
    // 购物车
    .cart {
      position: relative;
      text-align: center;
      line-height: 132px;
      left: 10px;
      i {
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: -15px;
        top: 38%;
        padding: 1px 6px;
        line-height: 1;
        background: #e26237;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
    // 中部导航
    .header-middle-nav {
      width: 720px;
      display: flex;
      align-items: center;
      margin-left: 50px;
      text-align: center;
      li {
        margin-right: 40px;
        cursor: pointer;
        &:hover {
          color: #27ba9b;
          border-bottom: 1px solid #27ba9b;
        }
      }
    }
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
