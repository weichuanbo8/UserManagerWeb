import { defineStore } from 'pinia'
import {ref} from 'vue';
//导入用户类
import {UserView} from '../class/user/UserView';
import { LoginResponce } from '../class/login/LoginResponce';
//定义全局变量目录
const enum piniaIds {
  CurrentLoginUserView = 'userView',
  //accessToken = 'accessToken'
};

//1、用户信息
//命名规则—— use[userView]Store
export const useUserViewStore = defineStore(
  piniaIds.CurrentLoginUserView, 
  () => {
    //声明userView是一个自定义的UserView实体类
    const userView = ref<LoginResponce>();
    //页面向Pinia存入数据时调用的方法
    const setUserView = (loginResponce : LoginResponce ) => { 
        userView.value = loginResponce; 
    };
    //清除Session中的userView
    const clearUserView = () => {
      //以下是清除session的几种方法
      //1、键仍存在，但值被清空
      userView.value = undefined;
      //2、键值都被清空，但页面不跳转
      //localStorage.removeItem(piniaIds.CurrentLoginUserView);
      //3、无效
      //persist.storage.removeItem(piniaIds.CurrentLoginUserView);
    };
    // const persist = {
    //   storage : sessionStorage,
    //   key : piniaIds.CurrentLoginUserView
    // };
    //导出
    return {userView, setUserView, clearUserView}
  },
  //持久化（安装完后，还需要在main.ts中声明
  {persist : true}
);
//next pinia……

//清空session
export const clear = () =>{
  const userViewStore = useUserViewStore();
  userViewStore.clearUserView();
}
