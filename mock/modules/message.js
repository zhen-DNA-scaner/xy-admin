export default [{
  url: '/api/notice',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: {
        count: 5,
        totalPage: 1,
        list: [
          {
            _id: Random.id(),
            'type': 'warning',
            'title': '警告类系统通知',
            'createTime': '@date("yyyy-MM-dd hh:mm")'
          },{
            _id: Random.id(),
            'type': 'info',
            'title': '您发表的文章已通过审核',
            'createTime': '@date("yyyy-MM-dd hh:mm")'
          },{
            _id: Random.id(),
            'type': 'danger',
            'title': '致命性、错误、驳回通知',
            'createTime': '@date("yyyy-MM-dd hh:mm")'
          },{
            _id: Random.id(),
            'type': 'success',
            'title': '成功通知！',
            'createTime': '@date("yyyy-MM-dd hh:mm")'
          },{
            _id: Random.id(),
            'type': '',
            'title': '【通知过期】标题文本过长发生截取，只保留一行！',
            'createTime': '@date("yyyy-MM-dd hh:mm")'
          }
        ]
      }
    }
  }
}, {
  url: '/api/message',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: {
        count: 3,
        totalPage: 1,
        list: [{
          '_id': Random.id(),
          'type|1': ['reply', 'comment'],
          'user': {
            '_id': Random.id(),
            'nickName': '@cname',
            'avatarUrl': 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          },
          'content': '这种模板用于提示与谁发生了互动。',
          'createTime': '@date("yyyy-MM-dd hh:mm")'
        },{
          '_id': Random.id(),
          'type|1': ['reply', 'comment'],
          'user': {
            '_id': Random.id(),
            'nickName': '@cname',
            'avatarUrl': 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
          },
          'content': '这种模板用于提示与谁发生了互动。',
          'createTime': '@date("yyyy-MM-dd hh:mm")'
        },{
          '_id': Random.id(),
          'type|1': ['reply', 'comment'],
          'user': {
            '_id': Random.id(),
            'nickName': '@cname',
            'avatarUrl': Random.image('40x40')
          },
          'content': '这种模板用于提示与谁发生了互动。',
          'createTime': '@date("yyyy-MM-dd hh:mm")'
        }]
      }
    }
  }
}, {
  url: '/api/todo',
  type: 'get',
  response: ({ Random }) => {
    return {
      code: 20000,
      data: {
        count: 4,
        totalPage: 1,
        list: [{
          '_id': Random.id(),
          'status|1': ['done', 'doing', 'undo'],
          'creator': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'doer': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'createTime': '@date("yyyy-MM-dd hh:mm")',
          'deathLine': '@date("yyyy-MM-dd hh:mm")',
          'title': '任务名称',
          'content': Random.cparagraph(1, 3)
        },{
          '_id': Random.id(),
          'status|1': ['done', 'doing', 'undo'],
          'creator': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'doer': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'createTime': '@date("yyyy-MM-dd hh:mm")',
          'deathLine': '@date("yyyy-MM-dd hh:mm")',
          'title': '晓月程序v2.0版本发布',
          'content': Random.cparagraph(1, 3)
        },{
          '_id': Random.id(),
          'status|1': ['done', 'doing', 'undo'],
          'creator': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'doer': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'createTime': '@date("yyyy-MM-dd hh:mm")',
          'deathLine': '@date("yyyy-MM-dd hh:mm")',
          'title': '信息安全考试',
          'content': Random.cparagraph(1, 3)
        },{
          '_id': Random.id(),
          'status|1': ['done', 'doing', 'undo'],
          'creator': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'doer': {
            '_id': Random.id(),
            'nickName': '@cname'
          },
          'createTime': '@date("yyyy-MM-dd hh:mm")',
          'deathLine': '@date("yyyy-MM-dd hh:mm")',
          'title': '任务名称2',
          'content': Random.cparagraph(1, 3)
        }]
      }
    }
  }
}]