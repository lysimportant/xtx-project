import { defineStore } from 'pinia';
import localCache from '../utils/cache';
export interface UserType {
  profile: {
    id: string;
    avatar: string;
    nickname: string;
    account: string;
    mobile: string;
    token: string;
  };
  redirectUrl: any;
}
export const useUser = defineStore('useUser', {
  state(): UserType {
    return {
      profile: {
        id: '',
        account: '',
        nickname: '',
        avatar: '',
        token: '',
        mobile: ''
      },
      redirectUrl: '/'
    };
  },
  actions: {
    setUser(payload: any) {
      this.profile = payload;
    },
    setRedirectUtl(url: string) {
      this.redirectUrl = url;
    }
  }
});

export const setupStore = () => {
  const user = localCache.getCache('user');
  useUser().setUser(user);
};

export default function useStore() {
  return useUser();
}
