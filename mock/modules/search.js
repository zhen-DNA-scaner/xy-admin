import { getQueryObject } from '@/utils/index.js'

export default [{
  url: /\/api\/search\?.*/,
  type: 'get',
  response: ({ url, Random }) => {
    const query = getQueryObject(url);
    return {
      code: 20000,
      data: [
        {
          _id: Random.id(),
          title: `${query.k}提示词1`
        },{
          _id: Random.id(),
          title: `${query.k}提示词2`
        },{
          _id: Random.id(),
          title: `${query.k}提示词3`
        }
      ]
    }
  }
}]