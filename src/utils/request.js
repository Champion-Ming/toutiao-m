import axios from 'axios'
import store from '@/store'
import JsonBigint from 'json-bigint'

// 将基准地址挂载在axios上
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  transformResponse: [function (data) {
    try {
      return JsonBigint.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 定义请求拦截器 使发送请求时现代header Token
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 处理当2小时token过期时判断响应拦截器中状态码是否为401 如果是401则使用refresh_token刷新最新的token口令
request.interceptors.response.use((response) => {
  // console.log('response')
  if (response.status === 401) {
    console.log('into')
    const newAxios = axios.create({
      baseURL: 'http://toutiao-app.itheima.net/'
    })
    try {
      console.log('try')
      const { user } = store.state
      var data = newAxios({
        method: 'put',
        url: '/v1_0/authorizations',
        headers: {
          Authorization: user.refresh_token
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return response
})

export default request
