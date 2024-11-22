<template>
    <div>
      <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click = "AddUserHandle">{{ G_add }}</el-button>
      </div>
      <!-- 列表字段 -->
      <el-table :data="userViews" style="width: 90%">
        <el-table-column prop="userName" :label="G_user_name" width="120" />
        <el-table-column prop="email" :label="G_user_email" width="200" />
        <el-table-column prop="phone" :label="G_user_phone" width=" 120" />
        <el-table-column prop="roleName" :label="G_user_RoleName" width="120" />
        <el-table-column prop="userStateDescription" :label="G_user_userState" width="80" />
        <!-- 列表按钮 -->
        <el-table-column :label="G_Option">
          <template #default="scope">
            <el-button size="small" type="primary" @click="UpdateUserHandle(scope.row)">{{G_update}}</el-button>
            <el-button size="small" type="danger" @click="DeleteUserHandle(scope.row)">{{ G_delete }}</el-button>
            <el-button size="small" type="primary" @click="UpdateUserStateHandle(scope.row)">{{ scope.row.userStateDescription }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页
        :limit 每页显示条数，取组件默认值
        @currentChange              分页页码改变时触发的事件（emits)
        :total                      数据总条数（props) 
        :page                       当前页码（props）
        -->
      <tablePagingAction 
        @currentChange ="ChangedPageEvent" 
        :total= "total" 
        :page="currentPageIndex" 
        />
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
        <userDetail 
            :props_userView="currentDetailData" 
            :props_detailType ="addOrEdit" 
            @CloseEvent="CloseDetailEvent">
        </userDetail>
    </el-drawer>
  </template>

<script setup lang="ts">
/*************************************************************/
import { onMounted, ref } from 'vue';
//导入分页组件
import tablePagingAction from '../../components/normal/tablePagingAction.vue';
//导入消息组件
import { ElMessageBox } from 'element-plus';
//导入与用户管理功能有关的数据存储结构
import { UserView } from '../user/UserView';
//导入Http后台访问接口
import { $api_GetUserViews, $api_DeleteUser, $api_UpdateUserState } from '../../api/UserApi.ts';
//导入用户详情页面
import userDetail from '../../components/user/userDetail.vue';
//导入自定义枚举——详情页类型（add、update）
import { DetailType } from '../DetailType.ts';
//导入全局常量
import { 
    G_add,
    G_update,
    G_Option,
    G_button_enter,
    G_button_cancle,
    G_delete,
    G_user_name,
    G_user_email,
    G_user_phone,
    G_user_userState, 
    G_user_RoleName,
    G_responseHeader_listTotal,
    G_message_tips,
    G_message_AreYouSureDelete,
 } from '../../config/GlobalConst.ts';
/*************************************************************/
//定义用户视图
let userViews = ref<UserView[]>();
//定义详情页面显示开关
let detailIsDrawer = ref<boolean>(false);
//定义“添加”“修改”切换开关
let addOrEdit : DetailType = DetailType.Add;
//当前的明细数据
let currentDetailData = ref<UserView>();
//明细页面标题
let detailTitle = addOrEdit === DetailType.Add ? `${G_add}` : `${G_update}`
//定义详情页面关闭时“是否清空组件的赋值”
let destroyOnClose = true;
//定义数据列表条数
let total = ref<number>(0);
//记录当前页码
let currentPageIndex = ref<number>(1);
/*************************************************************/
//钩子
onMounted(() => {
    //向后台获取用户视图列表
    GetUserViewList();
});
//添加按钮事件处理方法
const AddUserHandle = () => {
    //明细页面类型设置为“添加”
    addOrEdit = DetailType.Add;
    //这个变量本不需要每次都更新值
    destroyOnClose = true;
    //打开抽屉
    detailIsDrawer.value = true;
};
//修改按钮事件处理方法
const UpdateUserHandle = (userView : UserView) => {
    //将选中的用户视图数据赋值给CurrentValue
    currentDetailData.value = userView;
    //明细页面类型设置为"修改“
    addOrEdit = DetailType.Update;
    //这个变量本不需要每次都更新值
    destroyOnClose = true;
    //打开抽屉
    detailIsDrawer.value = true;
};
//删除按钮事件处理方法
const DeleteUserHandle = (userView : UserView) => {
    if (!userView)return;
    ElMessageBox.confirm(
        //内容
        G_message_AreYouSureDelete,
        //标题
        G_message_tips,
        //操作
        {
            confirmButtonText : G_button_enter,
            cancelButtonText : G_button_cancle,
            type : 'warning'
        }
    )
    //“确定”按钮处理方法
    .then(() => {
        //向后台请求删除数据
        $api_DeleteUser(userView.id)
        .then(() => {
            //成功返回则刷新数据
            GetUserViewList();
        })
    });
};

//向后台获取用户视图列表
const GetUserViewList = async () => {
    await $api_GetUserViews(currentPageIndex.value)
    .then((res) => {
        //从响应数据中获取数据总数
        total.value = parseInt(res.headers[G_responseHeader_listTotal]);
        //从响应数据中获取数据列表
        userViews.value = res.data;
    });
};
//分页抛出的“页码更新”的事件处理方法
const ChangedPageEvent = (currentPage : number) => {
    currentPageIndex.value = currentPage;
    //重新向后台请求数据
    GetUserViewList();
};
//明细页面抛出的“页面关闭”的事件处理方法
const CloseDetailEvent = () => {
    //将“详情页开关”关闭，以此触发当前页的“关闭抽屉事件”
    detailIsDrawer.value = false;
};
//抽屉关闭时触发的事件
const CloseDrawerHandle = () => {
    //更新数据列表(添加和更新数据后，需要刷新数据)
    GetUserViewList();
};
//“用户状态”按钮点击事件处理方法
const UpdateUserStateHandle = async (userView : UserView) => {
    await $api_UpdateUserState(userView.id)
    .then(() => {
        //更新数据列表
        GetUserViewList();
    });
};
</script>

<style scoped>

</style>