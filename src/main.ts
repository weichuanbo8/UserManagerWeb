/* 
    这是一个基于UserManagerWebApi的前端展示系统
*/
/*
    1、创建项目
        a、本地gitHub根目录下创建项目
        b、切换到新建的userManagerWeb目录下执行加载
        c、加载组件
        d、配置组件
    以上内容的具体步骤参考E:\job\document\学习总结.xmind
*/
/*
    配置github，以下操作取自github官网给的提示
    a、在gitHub创建一个新的项目
        git init
        git add README.md
        git commit -m "v0.9 项目初创，尚未完成组件配置"
        git branch -M main
        git remote add origin https://github.com/weichuanbo8/UserManagerWeb.git
        git push -u origin main
    b、已有一个项目
        git remote add origin https://github.com/weichuanbo8/UserManagerWeb.git
        git branch -M main
        git push -u origin main
    c、日常提交
        git add .
        git commit -m "【0.91】 注释"
        git push -u origin main
*/
/*
    配置组件
    a、按需引用
    b、配置跨域访问
    c、配置页面导航
    d、配置状态管理
    e、修改首页——清空app.vue、修改title
*/
import { createApp } from 'vue';
import router from './router'
import App from './App.vue'
import {createPinia} from 'pinia'

createApp(App)
.use(router)
.use(createPinia)
.mount('#app')
