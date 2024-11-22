/* 
    这是一个基于UserManagerWebApi的前端展示系统
*/
/* create
    创建项目
        a、本地gitHub根目录下创建项目
        b、切换到新建的userManagerWeb目录下执行加载
        c、加载组件
        d、配置组件
    以上内容的具体步骤参考E:\job\document\学习总结.xmind
*/
/* github
    配置github，以下操作取自github官网给的提示(使用管理员运行)
    a、在gitHub创建一个新的项目
        git init
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
/*  npm
    配置组件
    a、按需引用
    b、配置跨域访问
    c、配置页面导航
    d、配置状态管理和持久化
    e、修改首页——清空app.vue、修改title

    提交git 0.92
*/

/*class
    定义存储数据的对象
    文件路径 src/class/*
    说明——所有存储数据的对象都定义成 Type,
          文件名命名规则：*.d.ts
    清单——UserView.d.ts 保存后台返回的完整的用户信息
          LoginRequest.d.ts 前台封装登陆信息
          LoginResponce.d.ts 后台返回的登陆信息
          PasswordDto.d.ts 后台返回修改密码的信息
*/

/* config
    统一定义常量值
    注：这个文件是逐步完善的
*/

/* pinia
    通过pinia配置仓库
    文件路径 src/store/index.ts
    每个全局变量都由三个部分组成——变量声明、赋值方法、清除方法
    ...
*/

/* router
    定义导航
    a、编写src/router/index.ts

*/

/* axios
    定义网络请求
    a、自定义axios封装 src/http/index.ts
        ——封装axios实例
        ——重写请求拦截器
        ——重写响应拦截器
        ——封装request方法
            ——封装以response为返回值的方法—httResponse
            ——封装以实体为返回值的方法-httpData
    b、实现各个模块的http远程访问方法
        ——api/LoginApi.ts
*/

/* toolApi.ts
    定义公共函数类
*/

/* login.vue
    a、保存session
    b、element组件使用
    c、打通前端和后台
    d、根据“session”确定页面是否跳转
    e、MD5加密
*/

/*
    index.vue
    a、菜单
    b、页面跳转
    c、element中ICON的特殊处理（必须单独安装）
 */

/***************以上完成了系统的框架搭建***********/
/***************后续基本是循环开发****************/
/*
    角色管理
    class       ——定义存储类（Role）
    enum        ——定义枚举(detailType)
    const       ——定义全局常量(用户表的中文属性)
    api         ——定义roleApi.ts
    Component   ——制作分页组件、明细页面
    Vue         ——创建页面——role.vue角色页面

    注：除了注释，尽可能将统一管理中文
        每个文件尽量不要出现常量字符串，应统一管理
        方法以动词开头，名词结尾
        页面内触发的事件、定义的方法，命名以Handle结尾
        页面外响应的事件，方法名以Event结尾
*/
/*
    用户管理
    class       ——定义存储类（user、userView、addUserDto）
    const       ——定义全局常量(用户表的中文属性)
    api         ——定义userApi.ts
    Component   ——明细页面(如果添加和修改的属性项有较大差异，则明细页面应该写成两个)
    Vue         ——创建页面——user.vue用户页面
*/
/*
    权限管理
    class       ——定义存储类（Authority）
    const       ——定义全局常量(用户表的中文属性)
    api         ——定义authorityApi.ts
    Component   ——明细页面
    Vue         ——创建页面——authority.vue权限页面
*/
/*
    角色权限管理
    class       ——定义存储类（RoleAuthorityView）
    api         ——定义roleAuthorityApi.ts
    Vue         ——创建页面——roleAuthority.vue角色权限页面
*/
/* 角色权限管理
    class       ——定义存储类（RoleAuthority、AuthorityView）
    const       ——定义全局常量(用户表的中文属性)
    api         ——定义RoleAuthorityApi.ts
    Vue         ——创建页面——RoleAuthority.vue角色权限页面
*/



//系统自带基本配置
import { createApp } from 'vue';
import './style.css'
import App from './App.vue'
//导航
import router from './router'
//状态管理及持久化
import {createPinia} from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
//element-Plus组件
import element from 'element-plus'
import 'element-plus/dist/index.css'

//注入
const app = createApp(App);
app.use(router);
app.use(element);
const pinia = createPinia() 
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia);
app.mount('#app');
