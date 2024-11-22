<template>
    <div>
      <div class="Query">
        <!-- 控制器列表 -->
        <el-select v-model="currentController" class="elImput" :placeholder=placeholder @change="ChangedAuthorityItemHandle" >
            <el-option v-for="item in controllers" :key="Index" :label="item" :value="item" />
        </el-select>
        <!-- 搜索按钮 -->
        <el-button type="primary" @click = "QueryAuthorityHandle">{{ G_Query }}</el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" @click = "AddRoleHandle">{{ G_add }}</el-button>
      </div>
      <!-- 列表字段 -->
      <el-table :data="authorities" style="width: 90%">
        <el-table-column prop="name" :label="G_authority_name" width="150" />
        <el-table-column prop="controllerValue" :label="G_authority_controllerValue" width="120" />
        <el-table-column prop="actionValue" :label="G_authority_actionValue" width="220" />
        <el-table-column prop="actionPath" :label="G_authority_actionPath" width="300" />
        <!-- 列表按钮 -->
        <el-table-column :label="G_Option">
          <template #default="scope">
            <el-button size="small" type="primary" @click="UpdateRolehandle(scope.row)">{{G_update}}</el-button>
            <el-button size="small" type="danger" @click="DeleteRoleHandle(scope.row)">{{ G_delete }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 装载明细页面的抽屉组件
         v-model 显示开关
         title 标题
         @closed 关闭时触发的事件方法
         destroy-on-close 关闭是是否清楚组件上的赋值
      -->
    <el-drawer v-model="detailIsDrawer" :title="detailTitle" direction="rtl"  @closed="CloseDrawerHandle" :destroy-on-close="destroyOnClose" >
        <!-- 明细页面 
             userView                   明细页面定义的属性——装载数据(props)
             detailType                 明细页面定义的属性——明细页面类型(props)
             CloseUserDetailEvent       明细页面定义的事件——明细页面关闭触发(emits)
         -->
        <authorityDetail 
            :props_authority="currentDetailData" 
            :props_detailType ="addOrEdit" 
            @CloseEvent="CloseDetailEvent">
        </authorityDetail>
    </el-drawer>
</template>

<script setup lang="ts">

/*************************************************************/
import { onMounted, ref } from 'vue';
//导入消息组件
import { ElMessageBox } from 'element-plus';
//导入权限数据存储结构
import { Authority } from '../../class/authority/Authority';
//导入http后台访问接口
import { $api_DeleteAuthority, $api_GetAuthoritiesBy, $api_GetControllers } from '../../api/AuthorityApi';
//导入详情页面
import authorityDetail from '../../components/authority/authorityDetail.vue';
//导入自定义枚举——详情页类型（add、update）
import { DetailType } from '../../class/DetailType';
//导入全局常量
import { 
    G_add,
    G_update,
    G_Option,
    G_button_enter,
    G_button_cancle,
    G_delete,
    G_message_pleaseSelect,
    G_authority_name,
    G_authority_controllerValue,
    G_authority_actionPath,
    G_authority_actionValue,
    G_message_tips,
    G_message_AreYouSureDelete,
    G_Query
 } from '../../config/GlobalConst';
import Index from '../index.vue';
/*************************************************************/
//定义权限列表
let authorities = ref<Authority[]>();
//定义详情页显示开关
let detailIsDrawer = ref<Boolean>(false);
//定义“add”“update”切换开关
let addOrEdit : DetailType = DetailType.Add;
//当前明细数据
let currentDetailData = ref<Authority>();
//明细页面标题
let detailTitle = addOrEdit == DetailType.Add ? G_add : G_update;
//定义详情页面在关闭时“是否清空组件数据”
let destroyOnClose = true;
//控制器列表
let controllers = ref<string[]>();
//当前控制器名
let currentController = ref<string>('');
//下拉下拉列表初始值
let placeholder = G_message_pleaseSelect + G_authority_controllerValue;
/*************************************************************/
//钩子
onMounted(() => {
    //获取控制器列表
    GetControllerList();
});
//添加按钮事件处理方法
const AddRoleHandle = () => {
    //将明细页面类型设置为“添加”
    addOrEdit = DetailType.Add;
    //明细页面关闭时，是否清空组件赋值
    destroyOnClose = true;
    //打开抽屉
    detailIsDrawer.value = true;
};
//修改按钮事件处理方法
const UpdateRolehandle = (authority : Authority) => {
    //给currentValue赋值
    currentDetailData.value = authority;
    //明细页面类型改为“修改”
    addOrEdit = DetailType.Update;
    //明细页面关闭时，是否清空组件赋值
    destroyOnClose = true;
    //打开抽屉
    detailIsDrawer.value = true;
};
//删除按钮事件处理方法
const DeleteRoleHandle = (authority : Authority) => {
    //检查入参，如果是空值就不处理（不这样处理，后面的代码会报错）
    if (!authority){ return; }
    //打开消息框
    ElMessageBox.confirm(
        //消息框内容
        G_message_AreYouSureDelete,
        //消息框标题
        G_message_tips,
        //交互部分
        {
            confirmButtonText : G_button_enter,
            cancelButtonClass : G_button_cancle,
            type : 'warning'
        }
    ).then(() => {
        //向后台请求
        $api_DeleteAuthority(authority.id).then(() => {
            //更新列表
            GetAuthorityList();
        });
    });
};
//明细页面抛出的“页面关闭”事件处理方法
const CloseDetailEvent = () => {
    //触发抽屉组件的关闭事件
    detailIsDrawer.value = false;
};
//抽屉关闭事件处理方法
const CloseDrawerHandle = () => {
    //更新列表
    GetAuthorityList();
};
//下拉列表改变选项事件处理方法
const ChangedAuthorityItemHandle = (val : string) => {
    currentController.value = val;
    console.log(controllers.value);
};
//向后台获取角色列表
const GetAuthorityList = async () => {
    await $api_GetAuthoritiesBy(currentController.value)
    .then((res) => {
        //存储服务端数据
        authorities.value = res.data;
    });
};
//搜索按钮事件处理方法
const QueryAuthorityHandle = () => {
    GetAuthorityList();
    console.log(controllers.value);
};
//向后台获取控制器列表
const GetControllerList = async () => {
    await $api_GetControllers()
    .then((res) => {
        //存储服务端数据
        controllers.value = res as unknown as string[];
    });
};
</script>

<style scoped>
.elImput {
  width : 200px;
  margin : 5px;
}
.elSelect {
  width : 200px;
  margin : 5px;
}
.Query {
    /* position :; */
}
</style>