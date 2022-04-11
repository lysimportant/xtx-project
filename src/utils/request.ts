import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';
export default function request(config: AxiosRequestConfig) {
  const instance = axios.create({
    timeout: 5000,
    baseURL
  });

  instance.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token') ?? '';
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use((res) => {
    return res;
  });

  return instance(config);
}
