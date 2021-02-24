import request from '../utils/request.js'
// import store from '@/store'

// 获取用户的登陆token
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendyzm = mobile => {
  return request({
    method: 'GET',
    url: `http://ttapi.research.itcast.cn/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户的登陆信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道列表
export const UserPDInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
