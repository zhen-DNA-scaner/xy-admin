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
  'visitor@qq.com': {
    roles: null,
    password: 'visitor123'
  },
  'admin@qq.com': {
    roles: ['admin'],
    password: 'admin123'
  }
}

export default [{
  url: '/api/captcha',
  type: 'post',
  response: ({ body }) => {
    const { email, phone } = body || {};
    if ( !( email || phone ) ) return {
      code: 40022
    }
    if (email && !validate('email', email)) return {
      code: 40022,
      errMsg: '邮箱格式错误'
    }
    if (phone && !validate('phone', phone)) return {
      code: 40022,
      errMsg: '手机格式错误'
    }
    return {
      code: 20000
    }
  }
}, {
  url: /\/api\/sendCaptcha\/.*/,
  type: 'post',
  response: () => {
    // 通过 cookie 权限获取用户邮箱/手机并发送验证码到邮箱
    return {
      code: 20000
    }
  }
}, {
  url: /\/api\/validateCaptcha\/.*/,
  type: 'post',
  response: () => {
    // 通过 cookie 权限获取用户信息并验证验证码
    return {
      code: 20000
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
      data: {
        _id: Random.id()
      }
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
        roles: user.roles,
        avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    }
  }
}, {
  url: '/api/forget',
  type: 'post',
  response: ({ body }) => {
    const { email, password, captcha } = body || {};

    if(!email || !password || !captcha) return {
      code: 40022
    }

    const user = usersStatic[email];

    if(!user) return {
      code: 40004,
      errMsg: '用户不存在'
    }

    if (!user.roles) return {
      code: 40001,
      errMsg: '暂无管理员权限!'
    }

    return {
      code: 20000,
      data: {
        nickName: email,
        roles: usersStatic[email].roles
      }
    }
  }
}, {
  url: '/api/user',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: {
        _id: Random.id(),
        roles: ['admin'],
        job: '前端开发工程师',
        email: '724953302@qq.com',
        profile: '',
        avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        nickName: 'Zepeng Zheng',
        province: '广东省',
        city: '惠州市',
        tags: ['很有想法', '专注设计', '长长长长长长长长长长长长长长长长腿长长长长长长长长长长长长长长长长腿', '巨人'],
        passwordStrenth: 'weak', // good strong
        phone: '156****5661'
      }
    }
  }
}, {
  url: '/api/user',
  type: 'put',
  response: ({ body }) => {
    return {
      code: 20000,
      data: body
    }
  }
}, {
  url: '/api/user/password',
  type: 'put',
  response: ({ body }) => {
    const { password, newPassword, confirm } = body || {};
    if(!password || !newPassword || !confirm){
      return{
        code: 40022
      }
    }
    return{
      code: 20000
    }
  }
}, {
  url: '/api/user/email',
  type: 'put',
  response: ({ body }) => {
    const { captcha, newEmail, newEmailCaptcha } = body || {};
    if(!captcha || !newEmail || !newEmailCaptcha){
      return{
        code: 40022
      }
    }
    return{
      code: 20000
    }
  }
}, {
  url: '/api/userdynamic',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: [{
        _id: Random.id(),
        status: 'info',
        createTime: '2015-09-05',
        action: `
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        `
      },{
        _id: Random.id(),
        status: 'error',
        createTime: '2015-09-04',
        action: `
          <p>Solve initial network problems 1.</p>
          <p>Solve initial network problems 2.</p>
          <p>Solve initial network problems 3.</p>
          <p>Solve initial network problems 4.</p>
          <p>Solve initial network problems 5.</p>
        `
      },{
        _id: Random.id(),
        status: 'success',
        createTime: '2015-09-03',
        action: `回复<a href="https://baidu.com" target="_blank">《如何站在巨人的肩膀上做事》</a>成功。`
      },{
        _id: Random.id(),
        status: 'success',
        createTime: '2015-09-02',
        action: `成功发表文章<a href="https://baidu.com" target="_blank">《如何站在巨人的肩膀上做事》</a>。`
      },{
        _id: Random.id(),
        status: 'success',
        createTime: '2015-09-01',
        action: '恭喜您成功被授权为管理员，拥有平台管理、编辑权限。'
      }]
    }
  }
}]