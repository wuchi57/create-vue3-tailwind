import request from 'utils/request'

export default class User {
  /**
   * 登录
   * @param username
   * @param password
   * @returns {Promise<*>}
   */
  static async login (username, password) {
    return request({
      url: '/login',
      method: 'post',
      data: {username, password},
    })
  }

  /**
   * 获取用户信息
   * @returns {Promise<*>}
   */
  static async getUserInfo () {
    return request({
      url: '/getInfo',
      method: 'get'
    })
  }
}