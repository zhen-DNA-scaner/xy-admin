import { validate } from '@/utils/validator';

const usersStatic = {
  'admin': {
    roles: ['admin'],
    password: 'admin123'
  },
  'editor': {
    roles: ['editor'],
    password: 'editor123'
  },
  'admin@qq.com': {
    roles: null,
    password: 'admin123'
  }
}

export default [{
  url: '/api/captcha',
  type: 'post',
  response: ({ body, Random }) => {
    const email = body && body.email;
    if (!email || !validate('email', email)) return {
      errMsg: '邮箱格式错误'
    }
    return {
      code: 20000,
      data: Random.id()
    }
  }
}, {
  url: '/api/register',
  type: 'post',
  response: ({ body, Random }) => {
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
      _id: Random.id(),
      roles: usersStatic[email].roles
    }
  }
}, {
  url: '/api/login',
  type: 'post',
  response: ({ body }) => {
    const { userName, password } = body || {}
    const user = usersStatic[userName];
    if (!user || password !== user.password) {
      return {
        code: 40001,
        errMsg: '用户名或密码错误!'
      }
    }
    if (!user.roles) return {
      code: 40001,
      errMsg: '暂无管理员权限!'
    }
    return {
      code: 20000,
      data: {
        nickName: userName,
        roles: user.roles
      }
    }
  }
}, {
  url: '/user',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: {
        _id: Random.id(),
        roles: ['admin']
      }
    }
  }
}]