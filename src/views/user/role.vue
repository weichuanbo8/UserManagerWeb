<template>
    <div>
      <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click = "AddRoleHandle">{{ G_add }}</el-button>
      </div>
      <!-- 列表字段 -->
      <el-table :data="roles" style="width: 90%">
        <el-table-column prop="name" :label="G_role_name" width="120" />
        <el-table-column prop="description" :label="G_role_description" width="200" />
        <!-- 列表按钮 -->
        <el-table-column :label="G_Option">
          <template #default="scope">
            <el-button size="small" type="primary" @click="UpdateRolehandle(scope.row)">{{G_update}}</el-button>
            <el-button size="small" type="danger" @click="DeleteRoleHandle(scope.row)">{{ G_delete }}</el-button>
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
        <roleDetail 
            :props_role="currentDetailData" 
            :props_detailType ="addOrEdit" 
            @CloseEvent="CloseDetailEvent">
        </roleDetail>
    </el-drawer>
</template>

<script setup lang="ts">
/*************************************************************/
import { onMounted, ref } from 'vue';
//导入分页组件
import tablePagingAction from '../../components/normal/tablePagingAction.vue';
//导入消息组件
import { ElMessageBox } from 'element-plus';
//导入角色数据存储结构
import { Role } from '../../class/role/Role';
//导入http后台访问接口
import { $api_GetAllBy, $api_DeleteRole } from '../../api/RoleApi';
//导入角色详情页面
import roleDetail from '../../components/role/roleDetail.vue';
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
    G_role_name,
    G_role_description,
    G_responseHeader_listTotal,
    G_message_tips,
    G_message_AreYouSureDelete
 } from '../../config/GlobalConst';
/*************************************************************/
//定义角色列表
let roles = ref<Role[]>();
//定义详情页显示开关
let detailIsDrawer = ref<Boolean>(false);
//定义“add”“update”切换开关
let addOrEdit : DetailType = DetailType.Add;
//当前明细数据
let currentDetailData = ref<Role>();
//明细页面标题
let detailTitle = addOrEdit == DetailType.Add ? G_add : G_update;
//定义详情页面在关闭时“是否清空组件数据”
let destroyOnClose = true;
//定义数据列表条数
let total = ref<number>(0);
//记录当前页码
let currentPageIndex = ref<number>(1);
/*************************************************************/
//钩子
onMounted(() => {
    //向后台获取角色列表
    GetRoleList();
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
const UpdateRolehandle = (role : Role) => {
    //给currentValue赋值
    currentDetailData.value = role;
    //明细页面类型改为“修改”
    addOrEdit = DetailType.Update;
    //明细页面关闭时，是否清空组件赋值
    destroyOnClose = true;
    //打开抽屉
    detailIsDrawer.value = true;
};
//删除按钮事件处理方法
const DeleteRoleHandle = (role : Role) => {
    //检查入参，如果是空值就不处理（不这样处理，后面的代码会报错）
    if (!role){ return; }
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
        $api_DeleteRole(role.id).then(() => {
            //更新列表
            GetRoleList();
        });
    });
};
//分页组件抛出的“页码更新”事件处理方法
const ChangedPageEvent = (currentPage : number) => {
    //取值
    currentPageIndex.value = currentPage;
    //重新向后台请求数据
    GetRoleList();
};
//明细页面抛出的“页面关闭”事件处理方法
const CloseDetailEvent = () => {
    //触发抽屉组件的关闭事件
    detailIsDrawer.value = false;
};
//抽屉关闭事件处理方法
const CloseDrawerHandle = () => {
    //更新列表
    GetRoleList();
};
//向后台获取角色列表
const GetRoleList = async () => {
    await $api_GetAllBy(currentPageIndex.value)
    .then((res) => {
        //从响应数据中获取数据总数
        total.value = parseInt(res.headers[G_responseHeader_listTotal]);
        //存储服务端数据
        roles.value = res.data;
    });
};
</script>

<style scoped>

</style>