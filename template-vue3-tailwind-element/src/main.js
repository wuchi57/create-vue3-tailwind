import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import 'styles/global.css'
import router from '@/router/index.js'
import store from '@/store/index.js'

// 全局导入SvgIcon
import 'virtual:svg-icons-register'

createApp(App).use(router).use(store).mount('#app')
