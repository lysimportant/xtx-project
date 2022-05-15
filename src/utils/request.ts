import axios from 'axios';
import { useUser } from '../store/useUser';
import router from '../router';
import localCache from '../utils/cache';
const store = useUser();
import type { AxiosRequestConfig } from 'axios';
// export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net';
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net';
export default function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    timeout: 5000,
    baseURL
  });

  instance.interceptors.request.use(
    (config: any) => {
      const { token } = localCache.getCache('user') ?? '';
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        // 1. 清空无效用户信息
        // 2. 跳转到登录页
        // 3. 跳转需要传参（当前路由地址）给登录页码
        store.setUser({});
        // 当前路由地址
        // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
        // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
        // encodeURIComponent 转换uri编码，防止解析地址出问题
        // router.push('/login');
        router.push('/login?redirectUrl=' + fullPath);
      }
      return Promise.reject(err);
    }
  );

  return instance(config);
}
