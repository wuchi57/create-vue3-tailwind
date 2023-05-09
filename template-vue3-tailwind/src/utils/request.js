import axios from 'axios'

// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  // 指定请求超时的毫秒数
  timeout: 10000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
})

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
    (config) => {
      //  在这里一般会携带前台的参数发送给后台，比如下面这段代码：
      /**
      const userStore = useUserStore()
      if (userStore.token) {
        // 让每个请求携带token
        config.headers['Authorization'] = 'Bearer ' + userStore.token
      }
      **/
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
)

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
    (response) => {
      /**
       * 根据你的项目实际情况来对 response 和 error 做处理
       */
      const res = response.data
      const code = response.data.code
      if (code !== 200) {
        return Promise.reject(new Error(res?.msg || '未知错误，请联系管理员'))
      } else {
        return res
      }
    },
    (error) => {
      const { response } = error
      if (response && response.data) {
        return Promise.reject(error)
      }
      const {message} = error
      console.error(message)
      return Promise.reject(error)
    },
)

export default instance