import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// 集成SvgIcon
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 集成ElementUI + ElementUI Icon
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue、vue-router 相关函数
      imports: ['vue', 'vue-router'],
      dts: resolve(__dirname, './auto-imports.d.ts'),
      // 集成ElementUI + ElementUI Icon
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({prefix: 'Icon'}),
      ],
    }),
    Components({
      dts: resolve(__dirname, './components.d.ts'),
      // 集成ElementUI + ElementUI Icon
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({enabledCollections: ['ep']}),
      ],
    }),
    // 集成ElementUI + ElementUI Icon
    Icons({autoInstall: true}),
      // 集成SvgIcon
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, 'src/components'),
      'api': resolve(__dirname, 'src/api'),
      'assets': resolve(__dirname, 'src/assets'),
      'router': resolve(__dirname, 'src/store'),
      'store': resolve(__dirname, 'src/store'),
      'styles': resolve(__dirname, 'src/styles'),
      'hooks': resolve(__dirname, 'src/hooks'),
      'views': resolve(__dirname, 'src/views'),
      'layout': resolve(__dirname, 'src/layout'),
      'utils': resolve(__dirname, 'src/utils'),
      'plugins': resolve(__dirname, 'src/plugins'),
      'dirs': resolve(__dirname, 'src/directives'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    hmr: true,
    https: false,
    port: 3000,
    host: '0.0.0.0',
    open: true,
    cors: true,
    proxy: {
      '/api-v2': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api-v2/, ''),
      }
    }
  },
})
