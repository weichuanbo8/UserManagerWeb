<template>
  <div class="login">
      <div class="box">
        <h2>{{G_systemTitle + G_systemVersion}}</h2>
          <!-- 
              ref="FormRef"                                 表单实例
              :model="loginRequest"                         绑定数据实体
              :rules="rules                                 绑定数据验证
              @keyup.enter.native="submitForm(FormRef)">    “回车键”触发提交事件
          -->
          <el-form ref="FormRef" size="small" :model="loginRequest" status-icon :rules="rules"
              label-width="40px" @keyup.enter.native="submitForm(FormRef)">
              <!--
                    el-form-item                            每组数据表单项
                    label="账号"                            标签
                    prop="name"                             “绑定数据实体”的某个属性项
                    v-model.number="loginRequest?.name"     用当前数据实体实例给表单组件赋值且响应式
                    type="password"                         表单组件是密码值（隐藏值）
                -->
              <el-form-item :label="G_user_name" prop="name">
                  <el-input v-model="loginRequest.name" />
              </el-form-item>
              <el-form-item :label="G_user_password" prop="password">
                  <!--
                      autocomplete="off"              input属性，是否模糊匹配                     
                    -->
                  <el-input v-model="loginRequest.password" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                  <!--
                      submitForm(FormRef)           表单提交，以“表单实例”作为参数 
                      resetForm(FormRef)            表单重置，参数同上
                    -->
                  <el-button type="primary" @click="submitForm(FormRef)" :disabled="disabled">{{ G_button_submit }}</el-button>
                  <el-button @click="resetForm(FormRef)">{{ G_button_cancle }}</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script setup lang="ts">
/*************************************************************/
//导入组合式api
import { reactive, ref, onMounted, computed } from 'vue'
//导入element-plus
import type { FormInstance, FormRules } from 'element-plus'
//导入自定义类
import { LoginRequest } from '../class/login/LoginRequest';
import { LoginResponce } from '../class/login/LoginResponce';
//导入api请求
import { $api_Login } from '../api/LoginApi';
//导入调转至Index页面方法
import {RouterToIndex} from '../router';
//导入pinia全局状态
import {useUserViewStore} from '../store';
//导入MD5方法
import {get_Md5} from '../api/toolApi.ts';
//导入全局常量
import {G_systemTitle, G_systemVersion}  from '../config/GlobalConst.ts';
import {G_user_name, G_user_password} from '../config/GlobalConst.ts';
import {G_button_cancle, G_button_submit, G_message_pleaseEnter} from '../config/GlobalConst.ts';
/*************************************************************/
//定义一个ref对象
const FormRef = ref<FormInstance>()
//存储登陆请求和响应的变量
let loginResponce = ref<LoginResponce>();
let loginRequest = reactive<LoginRequest>({
  name : '',
  password : ''
});
//全局变量
const userViewStore = useUserViewStore();
//控制提交按钮的“禁用”状态
let disabled = computed<boolean>(() =>{
    return loginRequest?.name === '' || loginRequest?.password === '' ? true : false
});
/*************************************************************/
onMounted(() => {
  //判断是否已经登陆，如是直接跳转到主页面
  if (userViewStore.userView)
  {
    //跳转
    RouterToIndex();
  }
});
//密码格式验证
const validateLoginPWD = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(G_message_pleaseEnter + G_user_password ))
  } else {
    callback()
    }
 };
  //ID格式验证
const validateLoginName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(G_message_pleaseEnter + G_user_name))
  } else {
    callback()
    }
 };
//验证对象
const rules = reactive<FormRules<typeof loginRequest>>({
  name : [{ validator: validateLoginName, trigger: 'blur' }],
  password: [{ validator: validateLoginPWD, trigger: 'blur' }],
});
//表单提交
const submitForm = (formEl: FormInstance | undefined) => {
  //判断是否有表单实例，无则返回
  if (!formEl) return;
  //验证输入项，不通过则返回
  formEl.validate( async (valid) => {
      if (!valid) {return;}//不通过
      else //通过
      {
        if (!loginRequest)return;
        //MD5加密
        loginRequest.password = get_Md5(loginRequest.password);
        console.log(`登陆密码：${loginRequest.password}`);
        //发起服务器请求
        $api_Login(loginRequest)
        .then((res) => {
          loginResponce.value = res as any as LoginResponce;
          //console.log(loginResponce.value.id)
          //console.log(loginResponce.value.accessToken);
          //将登录账号信息存入pinia的User中
          userViewStore.setUserView(loginResponce.value);
          // console.log(userViewStore.userView?.accessToken);
          //跳转到主页面
          RouterToIndex();
        });
      }
  });
};
//重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
};
</script>

<style scoped lang="scss">
.login{
    width:100vw;
    height:100vh;
    background: linear-gradient(to bottom, #142334, #406ea3);
    display:flex;
    justify-content:center;
    align-items:center;
}
.box{
    width:400px;
    border:1px solid #fff;
    padding:20px;
    ::v-deep(.el-form-item__label) {
    color:#fff;
  }
  h2{
    color:white;
    font-size:28px;
    text-align:center;
    margin-bottom:20px;
    font-family: sxt;
  }
}
</style>