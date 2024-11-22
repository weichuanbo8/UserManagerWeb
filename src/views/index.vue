<template>
    <div class="page">
        <div class="aside">
            <el-menu router active-text-color="#ffd04b" background-color="#142334" class="el-menu-vertical-demo"
                default-active="2" text-color="#fff">
                <h3 class="mb-2">{{ G_systemTitle }}</h3>
                <!-- 用户管理模块 -->
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>{{ G_user_class + G_Manager }}</span>
                    </template>
                    <!-- 角色管理 -->
                    <el-menu-item :index="G_routes_default + G_routes_Role">{{ G_role_class + G_Manager }}</el-menu-item>
                    <!-- 用户管理 -->
                    <el-menu-item :index="G_routes_default + G_routes_User">{{ G_user_class + G_Manager }}</el-menu-item>
                    <!-- 权限管理 -->
                    <el-menu-item :index="G_routes_default + G_routes_Authority">{{ G_authority_class + G_Manager }}</el-menu-item>
                    <!-- 角色权限管理 -->
                    <el-menu-item :index="G_routes_default + G_routes_RoleAuthority">{{ G_roleAuthor_class + G_Manager }}</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </div>
        <div class="right">
            <div class="header">
                <el-menu router :ellipsis="false" mode="horizontal" background-color="#142334" text-color="#fff"
                    active-text-color="#ffd04b">
                    <!-- 右上角菜单 -->
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <House />
                            </el-icon>
                            <!-- 用“当前用户”做标题 -->
                            <span>{{userStore?.userView?.name}}</span>
                        </template>
                        <!-- 个人中心 -->
                        <el-menu-item :index="G_routes_default + G_routes_Mine">
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <span>{{ G_user_mine }}</span>
                        </el-menu-item>
                        <!-- 修改密码 -->
                        <el-menu-item :index="G_routes_default + G_routes_ChangePassword">
                            <el-icon>
                                <Unlock />
                            </el-icon>
                            <span>{{ G_update + G_user_password }}</span>
                        </el-menu-item>
                        <!-- 退出 -->
                        <el-menu-item index="" @click="exit">
                            <el-icon>
                                <SwitchButton />
                            </el-icon>
                            <span>{{ G_Exit }}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
            <div class="main">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/*************************************************************/

//导入钩子函数，处理组件加载后的动作
import {onMounted} from 'vue';
//导入已经持久化的用户信息
import {useUserViewStore, clear} from '../store';
//导入跳转回登录页面的方法
import {RouterToLogin} from '../router';
//导入消息框组件
import { ElMessageBox } from 'element-plus';
//头部、左侧菜单栏引用图标
import { House, Unlock, User, SwitchButton, UserFilled } from '@element-plus/icons-vue';

//导入全局常量
import { G_systemTitle, G_user_class, G_role_class, G_Manager, G_authority_class, G_roleAuthor_class } from '../config/GlobalConst';
import { G_routes_default, G_routes_User, G_routes_Role, G_routes_Authority,G_routes_RoleAuthority } from '../config/GlobalConst';
import { G_routes_Mine, G_routes_ChangePassword } from '../config/GlobalConst';
import { G_user_mine, G_update, G_user_password, G_Exit } from '../config/GlobalConst';

/*************************************************************/
let userStore = useUserViewStore();

/*************************************************************/
onMounted(()=>{
    //如果为空将返回到登录页面
    if (!userStore.userView)
    {
        RouterToLogin();
    }
});

let exit = () => {
    ElMessageBox.confirm(
        '确定退出系统?', 
        'Warning',
        {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        .then(() => {
            //清除缓存
            clear();
            //页面定向到登录页面
            RouterToLogin();
    });
}
</script>

<style scoped lang="scss">
.page {
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #142334;

.aside {
    width: 200px;
    color: white;
    .el-menu {
        border-right: none;
    }
    .mb-2{
        text-align: center;
        padding-top: 20px;
        padding-left: 5px;
    }
}

.right{
    flex:1;
    display: flex;
    flex-direction: column;
    .header{
        height: 60px;
        .el-menu{
            border-bottom: none;
            float:right;
        }
    }
    .main{
        flex:1;
        background-color: white;
    }
}


}
</style>