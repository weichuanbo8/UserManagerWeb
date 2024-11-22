<template>
    <el-form ref="FormRef" size="small" :model="formData" status-icon :rules="rules">
        <!-- 角色名 -->
      <el-form-item :label="G_role_name" prop="name" >
        <el-input v-model="formData.name" />
      </el-form-item>
      <!-- 简介 -->
      <el-form-item :label="G_role_description" prop="email">
        <el-input v-model="formData.description" />
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="submitForm(FormRef)">{{ submitButtonValue }}</el-button>
        <el-button @click="resetForm(FormRef)">{{ G_button_cancle }}</el-button>
      </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
/*************************************************************/
import {reactive, ref, onMounted} from 'vue';
//导入element的表单组件
import { FormInstance, FormRules } from 'element-plus';
//导入数据存储单元
import { Role } from '../../class/role/Role';
//导入http后台访问api
import { $api_AddRole, $api_UpdateRole } from '../../api/RoleApi.ts';
//导入明细页面类型
import { DetailType } from '../../class/DetailType.ts';
//导入全局常量
import {
    G_add,
    G_update, 
    G_message_pleaseEnter,
    G_role_name,
    G_role_description,
    G_regexp_string,
    G_regexp_string_error,
    G_button_cancle,
 } from '../../config/GlobalConst'; 
/*************************************************************/
//定义表单实例
const FormRef = ref<FormInstance>();
//定义存储单元实例
let formData = ref<Role>({
  id : 0,
  name : '',
  description : ''
});
//定义页面属性
const props = defineProps<{props_role : Role | undefined; 
    props_detailType : DetailType | undefined}>();
//定义事件
const emits = defineEmits(['CloseEvent']);
//提交按钮名称
let submitButtonValue = ref<string>();
/*************************************************************/
//钩子
onMounted(() => {
  //添加
  if (props.props_detailType == DetailType.Add){
      //赋值提交按钮的value值
      submitButtonValue.value = G_add;
  }
  //修改
  else if (props.props_detailType == DetailType.Update && props.props_role)
  {
      //赋值提交按钮的value值
      submitButtonValue.value = G_update;
      //当前userView赋值
      formData.value = props.props_role;
  }
});
//格式验证——角色名
const validateName = (rule : any, value: string, callback: any) => {
  if (value === '') {
    //不许为空
    callback(new Error(G_message_pleaseEnter + G_role_name))
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
    name : [{validator : validateName, trigger : 'blur'}],
})
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
                  //添加
                  await $api_AddRole(formData.value).then(() => {
                    result = true;
                  });
                  break;
              case DetailType.Update :
                  //修改
                  await $api_UpdateRole(formData.value.id, formData.value)
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
</script>

<style scoped>

</style>