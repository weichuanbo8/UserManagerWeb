<template>
  
  <div>
      <!-- 1、查询 -->
      <div >
        <!-- 控制器列表 -->
        <el-select v-model="currentRole" class="elImput" :placeholder=placeholder @change="ChangedRoleItemHandle($event)" >
            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item" />
        </el-select>
      </div>
      <!-- 2、选择框集合 -->
      <div>
        <!-- 按控制器分组 -->
        <div class="div"
            v-for="controllerItem in currentRoleAuthority?.controllerAuthorityList">
            {{ controllerItem.controllerValue + controllerItem.authorityViewList.length }}
            <!-- 显示控制分组内的权限视图 -->
            <div 
                v-for="authorityView in controllerItem.authorityViewList">
                <!-- 选择框 -->
                <el-checkbox 
                    v-model="authorityView.isSelect" 
                    :label="authorityView.authority.name" 
                    size="large" 
                    @change="changedhandle"></el-checkbox>
            </div>
        </div>
        <!-- 操作 -->
        <div>
            <el-button size="large" type="primary" @click="submit">{{G_button_submit}}</el-button>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
/*************************************************************/
import {ref, onMounted} from 'vue';
//导入角色权限的存储结构
import { RoleAuthority } from '../../class/roleAuthority/RoleAuthority';
import { Role } from '../../class/role/Role';
//导入http后台访问接口
import {$api_GetAuthoritiesByRoleId, $api_UpdateRoleAuthority} from '../../api/RoleAuthorityApi';
import { $api_GetAllRoles } from '../../api/RoleApi';
//导入全局常量
import { 
    G_message_pleaseSelect,
    G_role_class,
    G_button_submit,
} from '../../config/GlobalConst';
/*************************************************************/
//定义角色权限视图
let currentRoleAuthority = ref<RoleAuthority>();
//当前选择的角色
let currentRole = ref<Role>({
    id : 0,
    name : '',
    description : '',
});
//角色列表
let roles = ref<Role[]>();
//下拉下拉列表初始值
let placeholder = G_message_pleaseSelect + G_role_class;

/*************************************************************/
//钩子
onMounted(() => {
    //获取角色列表
    GetRoleList();
});
//下拉列表改变选项事件处理方法
const ChangedRoleItemHandle = async (value : string) => {
  currentRole.value = value as unknown as Role;
  //获取角色对应的角色权限视图
  await $api_GetAuthoritiesByRoleId(currentRole.value.id)
  .then((res) =>{
      //给角色权限视图赋值
      currentRoleAuthority.value = res as unknown as RoleAuthority;
      console.log(currentRoleAuthority.value)
  });
};
//获取角色列表全部数据
const GetRoleList = async () => {
  await $api_GetAllRoles()
  .then((res) => {
    roles.value = res.data as Role[];
  });
};
//选择框值变化事件处理方法
const changedhandle = () => {};
//提交
const submit = async () => {
    if (!currentRoleAuthority)return;
    if (!currentRoleAuthority.value?.role.id) return;
    await $api_UpdateRoleAuthority(currentRoleAuthority.value?.role.id, currentRoleAuthority.value?.controllerAuthorityList)
};
</script>

<style scoped>
.elImput {
  width : 200px;
  margin : 5px;
}
.div {
  color : rgb(176, 40, 40);
  bor : 2px ;
}
</style>