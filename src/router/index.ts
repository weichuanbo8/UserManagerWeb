import { createWebHashHistory, createRouter } from 'vue-router';
//导入进度条组件
// import NProgress from 'nprogress/index';
// import 'nprogress/nprogress.css';
//导入session
import { useUserViewStore } from '../store';
//导入全局常量
import { 
  G_systemTitle, 
  G_systemVersion, 
  G_user_class, 
  G_role_class, 
  G_authority_class,
  G_roleAuthor_class, 
  G_Manager,
  G_user_mine, } from '../config/GlobalConst';
import {
  G_routes_default, 
  G_routes_Login, 
  G_routes_Index, 
  G_routes_User, 
  G_routes_Role, 
  G_routes_Authority,
  G_routes_RoleAuthority,
  G_routes_Mine} from '../config/GlobalConst'
//将引用外置，否则会报错
//[name]必须首字母大写！！！
import login from '../views/login.vue';
import index from '../views/index.vue';
import user from '../class/roleAuthority/user.vue';
import role from '../views/user/role.vue';
import authority from '../views/user/authority.vue';
import roleAuthority from '../views/user/roleAuthority.vue';
import mine from '../views/userCenter.vue';

const routes = [
  // 入口
  { path: G_routes_default, 
    redirect:G_routes_default + G_routes_Login 
  },
  //登陆
  {
    path:G_routes_default + G_routes_Login, 
    name:G_routes_Login, component:login
  },
  //主页面
  {
    path:G_routes_default + G_routes_Index, 
    name:G_routes_Index, component:index, 
    meta:{title:G_systemTitle + G_systemVersion},
    children : [
      //用户管理
      {
        path:G_routes_default + G_routes_User, 
        name:G_routes_User, component: user, 
        meta:{title: G_user_class + G_Manager}
      },
      //角色管理
      {
        path:G_routes_default + G_routes_Role, 
        name:G_routes_Role, component: role, 
        meta:{title: G_role_class + G_Manager}
      },
      //权限管理
      {
        path:G_routes_default + G_routes_Authority, 
        name:G_routes_Authority, component: authority, 
        meta:{title:G_authority_class + G_Manager}
      },
      //角色权限管理
      {
        path:G_routes_default + G_routes_RoleAuthority, 
        name:G_routes_RoleAuthority, component: roleAuthority, 
        meta:{title:G_roleAuthor_class + G_Manager}
      },
      //个人中心
      {
        path:G_routes_default + G_routes_Mine, 
        name:G_routes_Mine, component: mine, 
        meta:{title:G_user_mine}
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//导航守卫——导航触发时
//to 目标地址；from 出发地址；next 放行时调用
router.beforeEach((to, from, next) => {
  //获取token
  const accessTokenStore = useUserViewStore();
  //验证登录是否通过（目标不是登陆页且token为空，则跳转到login页面）
  if (to.name !== G_routes_Login && !accessTokenStore.userView?.accessToken) next({ name: G_routes_Login })
  else{
    //展示页面进度条
    //NProgress.start();
    //必须有重钓钩子
    next();//正常跳转
    //next(url)——重定向一个新的地址、跳转；
    //next(false)——阻止调转
  }
});

//导航守卫——后置钩子
router.afterEach((to, from) => {
  //重新定义页面标题
  if (to.meta && to.meta.title){document.title = to.meta.title as string;}
  //结束页面进度条
  //NProgress.done();
});

export default router

//跳转到Index页面
export const RouterToIndex = async () => {
  router.push({name:'Index'});
};
//跳转到Login页面
export const RouterToLogin = async () => {
  router.push({name:'Login'});
};