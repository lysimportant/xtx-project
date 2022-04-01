<template>
  <ul class="header-middle-nav">
    <template v-for="item in topCategory" :key="item">
      <li>
        <template v-if="item == '美食'">
          <a href="#">{{ item }}</a>
          <div class="layer">
            <ul>
              <li v-for="i in 10" :key="i">
                <a href="#">
                  <img
                    src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png"
                    alt=""
                  />
                  <p>果干</p>
                </a>
              </li>
            </ul>
          </div>
        </template>
        <router-link to="/" v-else>{{ item }}</router-link>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { topCategory } from "@/api/constant";
</script>

<style scoped lang="less">
// 中部导航
.header-middle-nav {
  width: 720px;
  display: flex;
  align-items: center;
  margin-left: 50px;
  text-align: center;

  > li {
    margin-right: 40px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &:hover {
      color: #27ba9b;
      border-bottom: 1px solid #27ba9b;
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }

    .layer {
      width: 1240px;
      // height: 200px !important;
      background-color: #fff;
      position: absolute;
      left: 340px;
      top: 166px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 70px 0;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
            border-bottom: 1px solid transparent;
          }
          &:hover {
            p {
              color: #27ba9b;
              border-bottom: 1px solid #27ba9b;
            }
          }
        }
      }
    }
  }
}
</style>
