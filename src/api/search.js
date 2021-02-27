import request from '@/utils/request.js'

export const getSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResults = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
