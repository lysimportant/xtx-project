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
      }
    ]
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
