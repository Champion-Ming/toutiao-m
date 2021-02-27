import request from '@/utils/request.js'

export const getComment = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 添加点赞
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

// 取消点赞
export const deleteLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 发布评论或者回复评论
export const addComments = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
