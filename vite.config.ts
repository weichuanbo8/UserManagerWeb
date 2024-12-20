import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//配置按需引用
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import {G_baseURL_current} from './src/config/GlobalConst'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    //配置按需引用
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server:{
    open:true,
    host:"127.0.0.1",
    port:5021,
    //代理
    proxy:{//后台api访问地址配置
      '/api':{
        target:G_baseURL_current,
        changeOrigin:true,
        rewrite:(Path) => Path.replace(/^\/api/,''),
        timeout: 5 * 1000,
      }
    }
  }  
})
