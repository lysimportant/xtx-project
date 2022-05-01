import request from '../utils/request';
/**
 * 帐号密码登录
 * @param {String} account 帐号
 * @param {String,} password 密码
 * @returns Promise
 * */
export const userAccountLogin = (data: any) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  });
};

/**
 * 获取手机号短信验证码
 * @param {String} mobile 手机号码
 * @returns Promise
 * */
export const userAccountLoginMsg = (mobile: string) => {
  return request({
    method: 'get',
    url: '/login/code',
    params: {
      mobile
    }
  });
};
/**
 * 手机号登录
 * @param {String} mobile 手机号码
 * @param {String} code 验证码 默认 123456
 * @returns Promise
 * */
export const userMobileLogin = (mobile: string, code: string) => {
  return request({
    method: 'POST',
    url: '/login/code',
    data: {
      mobile,
      code
    }
  });
};
/**
 * @param {String} unionId QQ唯一标识 openId
 * @param {Number} source 客户端类型 PC 1
 * @returns Promise
 * */
export const userQQLogin = (unionId: string, source = 1) => {
  return request({
    method: 'POST',
    url: '/login/social',
    data: {
      unionId,
      source
    }
  });
};

/**
 * QQ绑定的时候需要的验证码
 * @param {String} mobile 手机号码
 * @returns Promise
 * */
export const userQQBindCOde = (mobile: string) => {
  return request({
    method: 'get',
    url: '/login/social/code',
    params: {
      mobile
    }
  });
};

/**
 * QQ绑定立即登录
 * @param {String} unionId QQ唯一标识
 * @param {String} mobile 手机号码
 * @param {String} code 验证码
 * @returns Promise
 * */
export const userQQBindLogin = (
  unionId: string,
  mobile: string,
  code: string
) => {
  return request({
    method: 'POST',
    url: '/login/social/bind',
    data: {
      unionId,
      mobile,
      code
    }
  });
};

/**
 * 校验帐号是否存在
 * @param {String} account - 帐号
 * @returns Promise '/register/check'
 */
export const userCheckAccount = (account: string) => {
  return request({
    method: 'GET',
    url: '/register/check',
    params: {
      account
    }
  });
};

/**
 * QQ完善的时候需要的验证码
 * @param {String} mobile 手机号码
 * @returns Promise
 * */
export const userQQPatchCode = (mobile: string) => {
  return request({
    method: 'get',
    url: '/register/code',
    params: {
      mobile
    }
  });
};

/**
 * QQ绑定立即登录
 * @param {String} unionId QQ唯一标识
 * @param {String} mobile 手机号码
 * @param {String} code 验证码
 * @param {String} account 帐号名称
 * @param {String} password 帐号密码
 * @returns Promise
 * */
export const userQQPatchLogin = (
  unionId: string,
  mobile: string,
  code: string,
  account: string,
  password: string
) => {
  return request({
    method: 'POST',
    url: `/login/social/${unionId}/complement`,
    data: {
      unionId,
      mobile,
      code,
      account,
      password
    }
  });
};
