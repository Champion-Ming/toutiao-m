import axios from 'axios'
import store from '@/store'
import JsonBigint from 'json-bigint'
import router from '@/router'

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
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function (response) {
    return response
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function (error) {
    console.log(error)
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    // console.log('response')
    if (error.response && error.response.status === 401) {
      const user = store.state.user
      // 校验是否有 refresh_token
      if (!user || !user.refresh_token) {
        router.push('/login')
        // 代码不要往后执行了
        return false
      }
      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://toutiao-app.itheima.net/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        // 如果获取成功，则把新的 token 更新到容器中
        console.log('刷新token成功', res)
        store.commit('setUser', {
          token: res.data.data.token,
          refresh_token: user.refresh_token
        })
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (error) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷新token失败', error)
        router.push('login')
      }
    }
    return Promise.reject(error)
  }
)

export default request
