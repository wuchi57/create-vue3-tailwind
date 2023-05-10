import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(
    createPersistedState({
      auto: true,
      key: id => `__persisted__${id}`,
    }),
)
export default store

export { useCounterStore } from './counter.js'
export { useUserStore } from './user.js'