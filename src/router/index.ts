import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import useStore from '../store/useUser';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('views/Layout.vue'),
    children: [
      { path: '/', component: () => import('views/Home/Home.vue') },
      {
        path: '/category/:id',
        component: () => import('views/category/index.vue')
      },
      {
        path: '/category/sub/:id',
        component: () => import('views/category/sub.vue')
      },
      {
        path: '/product/:id',
        component: () => import('views/goods/index.vue')
      },
      {
        path: '/cart',
        component: () => import('views/cart/index.vue')
      },
      {
        path: '/member/checkout',
        component: () => import('views/member/pay/checkout.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/index.vue')
  },
  {
    path: '/login/callback',
    name: 'loginCallback',
    component: () => import('views/login/callback.vue')
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0, y: 0 };
  }
});
// 路由的前置导航
router.beforeEach((to, from, next) => {
  // 需要登录的路由: 地址是以 /member 开头
  const { profile } = useStore();
  if (profile && !profile.token && to.path.startsWith('/member')) {
    // encodeURIComponent 特殊字符串转为URL编码 以防错误
    next('/login?redirectUrl=' + encodeURIComponent(to.fullPath));
  }
  next();
});

export default router;
