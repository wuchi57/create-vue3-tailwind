import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 1,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})