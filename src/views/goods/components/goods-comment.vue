<template>
  <div ref="sortRef" class="goods-comment">
    <template v-if="commentInfo">
      <div class="head">
        <div class="data">
          <p>
            <span>{{ commentInfo.salesCount }}</span
            ><span>人购买</span>
          </p>
          <p>
            <span>{{ commentInfo.praisePercent }}</span
            ><span>好评率</span>
          </p>
        </div>
        <div class="tags">
          <div class="dt">大家都在说：</div>
          <div class="dd">
            <template v-for="(tag, index) in commentInfo.tags" :key="index">
              <a
                href="javascript:;"
                @click="changeTag(index)"
                :class="{ active: currentTag === index }"
                >{{ tag.title }} ({{ tag.tagCount }})</a
              >
            </template>
          </div>
        </div>
      </div>
      <!-- 排序 -->
      <div class="sort">
        <span>排序：</span>
        <a
          @click="changeSort(null)"
          href="javascript:;"
          :class="{ active: reqParams.sortField === null }"
          >默认</a
        >
        <a
          @click="changeSort('praiseCount')"
          href="javascript:;"
          :class="{ active: reqParams.sortField === 'praiseCount' }"
          >最热</a
        >
        <a
          @click="changeSort('createTime')"
          href="javascript:;"
          :class="{ active: reqParams.sortField === 'createTime' }"
          >最新</a
        >
      </div>
      <!-- 列表 -->
      <div class="list" v-if="commentList">
        <div class="item" v-for="item in commentList" :key="item.id">
          <div class="user">
            <img :src="item.member.avatar" alt="" />
            <span>{{ formatNickname(item.member.nickname) }}</span>
          </div>
          <div class="body">
            <div class="score">
              <i v-for="i in item.score" class="iconfont icon-wjx01"></i>
              <i v-for="i in 5 - item.score" class="iconfont icon-wjx02"></i>
              <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
            </div>
            <div class="text">{{ item.content }}</div>
            <!-- 评论图片组件 -->
            <GoodsCommentImage
              v-if="item.pictures.length"
              :pictures="item.pictures"
            />
            <div class="time">
              <span>{{ item.createTime }}</span>
              <span class="zan"
                ><i class="iconfont icon-dianzan"></i
                >{{ item.praiseCount }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <LPagination
        v-if="total"
        @change="change"
        v-model:total="total"
        v-model:current-page="reqParams.page"
        v-model:page-size="reqParams.pageSize"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject, reactive, watch, onMounted, nextTick } from 'vue';
import GoodsCommentImage from './goods-comment-image.vue';

import {
  findGoodsCommentInfo,
  findGoodsCommentList
} from '../../../api/product';
const sortRef: any = ref(null);
onMounted(() => {});
const goods: any = inject('goods');
const formatSpecs = (specs: any) => {
  return specs
    .reduce((p: any, n: any) => `${p} ${n.name}: ${n.nameValue}`, '')
    .trim();
};
const formatNickname = (name: string) => {
  return name.substring(0, 1) + '*****' + name.substring(name.length - 1);
};
// 请求数据的筛选条件准备
const reqParams: any = reactive({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  sortField: null
});
const total = ref(0);
const commentList: any = ref();
watch(
  reqParams,
  () => {
    findGoodsCommentList(goods.value.id, reqParams).then(({ data: res }) => {
      commentList.value = res.result.items;
      total.value = res.result.counts;
    });
  },
  { immediate: true }
);
const change = () => {
  changeScorll();
};
// 滚动事件
const changeScorll = () => {
  let timer: any = null;
  let targetTop = sortRef.value.offsetTop;
  timer = setInterval(() => {
    let cureentTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    let speed = Math.floor(-cureentTop / 9);
    document.documentElement.scrollTop = cureentTop + speed;
    if (cureentTop <= targetTop + 200) {
      clearInterval(timer);
    }
  }, 50);
};
// 改变排序
const changeSort = (type: any) => {
  reqParams.sortField = type;
  reqParams.page = 1;
};
// 激活Tag
const currentTag = ref(0);
const changeTag = (index: number) => {
  const tag = commentInfo.value.tags[index];
  // 1. 全部评价
  // 2.	有图
  // 3.其它tag
  if (tag.type === 'all') {
    reqParams.hasPicture = null;
    reqParams.tag = null;
  } else if (tag.type === 'img') {
    reqParams.hasPicture = true;
    reqParams.tag = null;
  } else {
    reqParams.hasPicture = null;
    reqParams.tag = tag.title;
  }
  currentTag.value = index;
  reqParams.page = 1;
};
// 获取评论的基本信息
const commentInfo = ref();
findGoodsCommentInfo(goods.value.id).then(({ data: { result: res } }) => {
  res.tags.unshift({
    title: '有图',
    tagCount: res.hasPictureCount,
    type: 'img'
  });
  res.tags.unshift({
    title: '全部评介',
    tagCount: res.evaluateCount,
    type: 'all'
  });
  commentInfo.value = res;
});
</script>
<script lang="ts">
export default {
  name: 'GoodsComment'
};
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: #cf4444;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: #27ba9b;
            background: lighten(#27ba9b, 50%);
            color: #27ba9b;
          }
          &.active {
            border-color: #27ba9b;
            background: #27ba9b;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: #27ba9b;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
