import Mock from 'mockjs';
import user from './modules/user';
import search from './modules/search';
import message from './modules/message';

const apis = [
  ...user,
  ...search,
  ...message,
];

const responseContextHandle = response => {
  return ctx => {
    const Random = Mock.Random;
    Random.extend({
      id: function() {
        const IDPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        return Random.string(IDPool, 12);
      }
    });
    ctx.Random = Random;
    ctx.body = JSON.parse(ctx.body);
    return Mock.mock( response(ctx) )
  }
}

apis.forEach(api => {
  Mock.mock( api.url, api.type, responseContextHandle(api.response) );
});