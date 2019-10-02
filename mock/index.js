import Mock from 'mockjs';
import user from './modules/user';

const apis = [
  ...user
];

const responseContextHandle = response => {
  return ctx => {
    ctx.Random = Mock.Random;
    ctx.IDPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    ctx.body = JSON.parse(ctx.body);
    return Mock.mock( response(ctx) )
  }
}

apis.forEach(api => {
  Mock.mock( api.url, api.type, responseContextHandle(api.response) );
});