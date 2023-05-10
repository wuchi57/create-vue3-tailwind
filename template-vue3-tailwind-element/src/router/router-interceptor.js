// import { useUserStore } from 'store'

const whiteList = ['/login']

export default function interceptor (to, from, next) {

  /**
  const userStore = useUserStore()

  if (userStore.token) {
    // 携带token
    // 可以在这里设置标题：Get title from route info
    // 获取用户路由表，渲染菜单, 出错就跳转登录，打印信息
    next()
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next()
      // next(`/login?redirect=${to.fullPath}`)
    }
  }
  **/

  next()
}
