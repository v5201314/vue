// 文章相关的 API 接口,封装到这个模块
import request from '@/utils/request.js'

// 向外导出一个 API 接口
export const getArticleListAPI = function(_page, _limit) {
  return request.get('/articles', {
    // 请求的参数
    params: {
      _page,
      _limit
    }
  })
}
