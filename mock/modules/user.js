import { validate } from '@/utils/validator';

const usersStatic = {
  'admin': {
    roles: ['admin']
  },
  'editor': {
    roles: ['editor']
  },
  'visitor': {
    roles: []
  },
  'admin@qq.com': {
    rroles: ['admin']
  }
}

export default [{
  url: '/api/captcha',
  type: 'post',
  response: ({ body, IDPool, Random }) => {
    const email = body && body.email;
    if (!email || !validate('email', email)) return {
      errMsg: '邮箱格式错误'
    }
    return {
      code: 20000,
      data: Random.string(IDPool, 4)
    }
  }
}, {
  url: '/api/register',
  type: 'post',
  response: ({ body, IDPool, Random }) => {
    const { email, password2, captcha } = body || {}
    
    if(!email || !password2 || !captcha) return {
      code: 40022
    }
    if(usersStatic[email]) return {
      code: 21000,
      errMsg: '用户已存在'
    }
    return {
      code: 20000,
      _id: Random.string(IDPool, 12),
      roles: []
    }
  }
}, {
  url: '/user',
  type: 'get',
  response: ({ Random, IDPool }) => {
    return {
      code: 20000,
      data: {
        _id: Random.string(IDPool, 12),
        roles: ['admin']
      }
    }
  }
}]