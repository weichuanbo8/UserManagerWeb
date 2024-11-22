<template>
  <el-form ref="FormRef" size="small" :model="formData" status-icon :rules="rules">
      <!-- 用户名 -->
    <el-form-item :label="G_user_name" prop="userName" >
      <!--
           disabled          不可改？
       -->
      <el-input v-model="formData.userName" :disabled="disabled"/>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item :label="G_user_password" prop="password">
      <el-input v-model="formData.password" type="password" :disabled="disabled"/>
    </el-form-item>
    <!-- 邮箱 -->
    <el-form-item :label="G_user_email" prop="email">
      <el-input v-model="formData.email" />
    </el-form-item>
    <!-- 电话 -->
    <el-form-item :label="G_user_phone" prop="phone">
      <el-input v-model="formData.phone"  />
    </el-form-item>
    <!-- 角色 -->
    <el-form-item :label="G_user_RoleName" prop="roleName">
      <!--
          placeholder                占位符，默认为“Select”
          v-model                    绑定值
       -->      
      <el-select v-model="formData.roleName" :placeholder=placeholder @change="ChangedRoleItemHandle" >
        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item >
      <el-button type="primary" @click="submitForm(FormRef)">{{ submitButtonValue }}</el-button>
      <el-button @click="resetForm(FormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
/*************************************************************/
import {reactive, ref, onMounted} from 'vue';
//导入element的表单组件
import { FormInstance, FormRules } from 'element-plus';
//导入数据存储单元
import { UserView } from '../../class/user/UserView';
//导入http后台访问api
import { $api_AddUser, $api_UpdateUser } from '../../api/UserApi';
import { $api_GetAllRoles } from '../../api/RoleApi';
//导入明细页面类型
import { DetailType } from '../../class/DetailType.ts';
//导入全局常量
import {
    G_add,
    G_update, 
    G_message_pleaseEnter,
    G_message_pleaseSelect,
    G_role_class,
    G_user_name,
    G_user_password,
    G_user_email,
    G_user_phone,
    G_user_RoleName,
    G_regexp_string,
    G_regexp_string_error,
    G_regexp_phone,
    G_regexp_phone_error,
    G_regexp_password,
    G_regexp_password_error,
 } from '../../config/GlobalConst'; 
import { Role } from '../../class/role/Role';
import { get_Md5 } from '../../api/toolApi';
/*************************************************************/
//定义表单实例
const FormRef = ref<FormInstance>();
//定义存储单元实例
let formData = ref<UserView>({
  id : 0,
  userName : '',
  password : '',
  email : '',
  phone : '',
  roleId : 0,
  userState : 0,
  accessToken : '',
  roleName : '',
  description : '',
  userStateDescription : ''
});
//定义页面属性
const props = defineProps<{props_userView : UserView | undefined; 
    props_detailType : DetailType | undefined}>();
//定义事件
const emits = defineEmits(['CloseEvent']);
//角色列表
let roles = ref<Role[]>([]);
//提交按钮名称
let submitButtonValue = ref<string>();
//角色下拉列表显示的缺省名
let placeholder = G_message_pleaseSelect + G_role_class;
//字段不可改
let disabled = props.props_detailType == DetailType.Update ? true : false;
/*************************************************************/
//钩子
onMounted(() => {
  //添加
  if (props.props_detailType == DetailType.Add){
      //赋值提交按钮的value值
      submitButtonValue.value = G_add;
  }
  //修改
  else if (props.props_detailType == DetailType.Update && props.props_userView)
  {
      //赋值提交按钮的value值
      submitButtonValue.value = G_update;
      //当前userView赋值
      formData.value = props.props_userView;
  }
  //获取角色列表数据并赋值
  GetRoleList();
});
//格式验证——用户名
const validateName = (rule : any, value: string, callback: any) => {
  if (value === '') {
    //不许为空
    callback(new Error(G_message_pleaseEnter + G_user_name))
  } 
  else {
    //用正则表达式验证输入合法性
    let regex = new RegExp(G_regexp_string);
    if (!regex.test(value)) {
      callback(new Error(G_regexp_string_error));
    }
    else {callback();}
  }
}
//格式验证——密码
const validatePassword = (rule : any, value: string, callback: any) => {
  //修改状态下不验证
  if (props.props_detailType == DetailType.Update){callback();}
  //不能为空
  if (value === '') {
    callback(new Error(G_message_pleaseEnter + G_user_password));
  } else {
    //用正则表达式验证输入合法性
    let regex = new RegExp(G_regexp_password);
    if (!regex.test(value)) {
      callback(new Error(G_regexp_password_error));
    } 
    else {callback();}
  }
}
//格式验证——邮箱
//格式验证——角色
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    //不允许为空
    callback(new Error(G_message_pleaseEnter + G_user_email));
    //正则表达式验证忽略
    //...
  } 
  else {callback();}
}
//格式验证——电话
const validatePhone = (rule: any, value: any, callback: any) => {
  if (value === '') {
    //不允许为空
    callback(new Error(G_message_pleaseEnter + G_user_phone))
  } 
  else {
    //用正则表达式验证输入合法性
    let regex = new RegExp(G_regexp_phone);
    if (!regex.test(value)){
      callback(new Error(G_regexp_phone_error));
    } 
    else {callback();}
  }
}
//格式验证——角色
const validateRoleName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    //不允许为空
    callback(new Error(G_message_pleaseSelect + G_role_class));
  } 
  else {callback();}
}

//集中验证表单对象
/*
    formData        表单实例绑定的数据存储单元
*/
const rules = reactive<FormRules<typeof formData>>({
    /* 
        格式：[属性名] : [{validator : [方法名], trigger : [触发方式]}];
        触发方式 —— blur        失去焦点时触发
                   change       值发生改变时触发
    */
    userName : [{validator : validateName, trigger : 'blur'}],
    password : [{validator : validatePassword, trigger : 'blur'}],
    email : [{validator : validateEmail, trigger : 'blur'}],
    phone : [{validator : validatePhone, trigger : 'blur'}],
    roleName : [{validator : validateRoleName, trigger : 'blur'}],
})
//角色列表改变选项事件处理方法
const ChangedRoleItemHandle = (val : Role) => {
    if (!formData.value) return;
    else{
        formData.value.roleId = val.id;
        formData.value.roleName = val.name;
        console.log(formData.value)
    }

};
//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  else
  {
    formEl.resetFields()
    emits("CloseEvent");
  }
}
//提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
    //表单实例为空？返回
    if (!formEl)return;
    //验证表单
    formEl.validate( async (valid) =>{
      //表单验证成功
      if (valid && formData.value){
          //定义局部变量，记录向后台发起请求的结果
          let result = false;
          //向后台发情请求
          switch (props.props_detailType) 
          {
              case DetailType.Add :
                  //MD5加密
                  formData.value.password = get_Md5(formData.value.password);
                  //添加用户
                  await $api_AddUser(formData.value).then(() => {
                    result = true;
                  });
                  break;
              case DetailType.Update :
                  //修改用户
                  await $api_UpdateUser(formData.value.id, formData.value)
                  .then(() => {
                    result = true;
                  });
                  break;
          }
          console.log(result);
          //成功提交后，清空字段关联的值，并关闭明细页面
          if (result) {
              formEl.resetFields();
              emits("CloseEvent");
          }
      }
    });
};
//获取角色列表全部数据
const GetRoleList = async () => {
  await $api_GetAllRoles()
  .then((res) => {
    roles.value = res.data as Role[];
  });
};
</script>

<style scoped>

</style>