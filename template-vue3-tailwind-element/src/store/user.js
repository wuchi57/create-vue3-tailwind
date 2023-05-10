import { defineStore } from 'pinia'
import { User } from 'api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    info: null
  }),
  actions: {
    login (userInfo) {
      const {username, password} = unref(userInfo)
      return new Promise((resolve, reject) => {
        User.login(username.trim(), password).then(res => {
          this.token = res.data.token
          this.getUserInfo()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo () {
      User.getUserInfo().then(res => {
        this.info = res.data.user
      })
    },
  },
})
