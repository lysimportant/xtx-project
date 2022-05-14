import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
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

export default router;
