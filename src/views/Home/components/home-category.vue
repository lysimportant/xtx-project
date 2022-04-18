<template>
  <div class="category" @mouseleave="categoryId = null, Index = null">
    <ul class="category-list">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        :index="index"
        @mouseenter="(categoryId = item.id), (Index = index)"
        :class="{ active: Index === index }"
      >
        <router-link :to="`/category/${item.id}`">
          <span>{{ item.name }}</span>
        </router-link>
        <!-- 二层 -->
        <template v-if="item.children">
          <router-link
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            <span>{{ sub.name }} </span>
          </router-link>
        </template>
        <template v-else>
          <skeleton
            bg="rgba(255,255,255,.2)"
            width="60px"
            height="18px"
            :style="{ margin: '0 5px' }"
          />
          <skeleton width="50px" height="18px" bg="rgba(255,255,255,.2)" />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="brand in currCategory.brands" :key="brand.id">
          <RouterLink to="/">
            <img v-lazy="brand.picture" :alt="brand.name" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { useCategory } from 'store/useCategory';
import { findBrand } from '@/api/home';
const sotre = useCategory();
// 得到分类9个后自己加一个
const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chidlren', name: '品牌推荐' }],
  brands: []
});
const menuList = computed(() => {
  // 每个一级分类的两个子分类
  const list = sotre.list.map((v: any) => {
    return {
      id: v.id,
      name: v.name,
      children: v.children && v.children.slice(0, 2),
      goods: v.goods
    };
  });
  list.push(brand);
  return list;
});
// 得到商品推荐数据
const categoryId = ref(null);
const Index = ref(null);
// 找到对应的ID再到menuList里面匹配对应的item，返回并且渲染
const currCategory = computed(() => {
  return menuList.value.find((item: any) => item.id === categoryId.value);
});
// 品牌推荐数据
findBrand().then((data: any) => {
  brand.brands = data.data.result;
});
</script>

<style scoped lang="less">
.category {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 250px !important;
  z-index: 99;
  &-list {
    width: 100%;

    > li {
      width: 250px;
      height: 50px;
      line-height: 50px;
      padding-left: 40px;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      a {
        color: #fff;
      }
      &:hover,
      &.active {
        background: #27ba9b;
      }
      span {
        padding: 0 2px;
      }
    }
  }
  // 弹出层样式
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: #cf4444;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      // 品牌样式
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  //   弹出层的显示和隐藏控制
  &:hover {
    .layer {
      display: block;
    }
  }
}
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
