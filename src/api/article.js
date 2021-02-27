import request from '@/utils/request.js'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}

// 获取文章详情
export const getArticleById = articleID => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleID}`
  })
}

// 添加收藏
export const addCollected = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏
export const deleteCollected = Id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${Id}`
  })
}

// 添加点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const deleteLike = Id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${Id}`
  })
}
