import { createMemoryHistory, createRouter } from 'vue-router'
const routes = [
    {path: '/', redirect:'/' },//重定位根节点请求转到HomePage页面(可以将后面的'/'替换成其他相对路径)

  ]
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })
  export default router