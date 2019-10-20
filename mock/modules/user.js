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
  response: ({ body, Random }) => {
    const email = body && body.email;
    if (!email || !validate('email', email)) return {
      errMsg: '邮箱格式错误'
    }
    return {
      code: 20000,
      data: Random.id(4)
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