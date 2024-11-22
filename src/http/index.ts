
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
//全局变量
import { useUserViewStore, clear } from "../store";
//全局常量
import {G_baseURL_current} from '../config/GlobalConst'
//对话框组件
import { ElMessage } from 'element-plus';
//跳转登录页面的方法
import {RouterToLogin} from '../router'

//axios实例
const instance = axios.create({
    baseURL: G_baseURL_current,
  });

//请求拦截器
instance.interceptors.request.use(
    //参数是两个委托，分别在成功和失败时执行
    //sucess
    function(config) {
        //为请求头添加token
        let Accesstoken = useUserViewStore();
        config.headers.Authorization = `${Accesstoken.userView?.accessToken}`;
        return config;
    },
    //error
    function(error) {
        //常规写法，作用是会将错误抛出
        Promise.reject(error);
    }
)
//响应拦截器
instance.interceptors.response.use(
    //参数是也是两个委托，分别在成功和失败时执行
    //sucess
    function(response) {
        switch (response.status) {
            case 200 : {
                ElMessage({message: response.config.url + '服务器响应成功', type: 'success'});
                break;
            }
            case 201 : {
                ElMessage({message: response.config.url + '提交成功', type: 'success'});
                break;
            }
            case 204 : {
                ElMessage({message: response.config.url + '删除成功', type: 'success'});
                break;
            }
        }
        return response;
    },
    //error
    function(error) {
        //根据HTTP状态码提示用户
        switch (error.response.status) {
            case 401 :
            case 403 :{
                ElMessage({message: '错误：' + '无权访问', type: 'warning'});
                //清空session
                //clear();
                //跳转回登陆页面
                //RouterToLogin();
                break;
            }
            case 500 :{
                ElMessage({message: '错误：' + '服务器错误', type: 'warning'});
                break;
            }
            case 400 :
            default : {
                console.log( error.response.data);
                ElMessage({message: '错误：' + error.response.data, type: 'warning'});
                break;
            }
        }
        //这行代码的作用似乎是让错误继续暴露，以便后面的代码可以捕捉到
        return Promise.reject(error);
    }
)

//发起http请求，直接返回data
const httpData = async <T>(config: AxiosRequestConfig): Promise<Result<T>> => {
    const { data } = await instance.request<Result<T>>(config);
    return data;
};

const httpResponse = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse> => {
    const res = await instance.request<Result<T>>(config);
    return res;
};

  
export {httpData, httpResponse};