import Mock from 'mockjs';
import qs from 'qs';
// 基本配置
Mock.setup({
  // 随机延时时间
  timeout: 500 - 1000
});
// 拦截接口 /my/test
// 1. 接口地址路径规则 需要匹配到它
// 2. 请求方式
// 3. 返回数据 (函数里返回数据)
// {
//   id: '1',
//   name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
//   picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
//   desc: '清汤鲜香 红汤劲爽',
//   price: '159.00'
// }
Mock.mock(/\/my\/test/, 'get', () => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    // arr.push(Mock.mock("@id"));
    arr.push(
      Mock.mock({
        id: '@id',
        name: '@cname',
        image: "@image('200x200')"
      })
    );
  }
  return { msg: '获取数据成功', result: arr };
});
Mock.mock(/\/member\/collect/, 'get', (config: any) => {
  const queryString = config.url.split('?')[1];
  const queryObject: any = qs.parse(queryString);
  const items: any = [];
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(
      Mock.mock({
        id: '@id',
        name: '@ctitle(10,20)',
        desc: '@ctitle(4,10)',
        price: '@float(100,200,2,2)',
        // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock(
          '@integer(1,8)'
        )}.jpg`
      })
    );
  }
  return {
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  };
});
