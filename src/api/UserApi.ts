//导入自定义的axios封装类
import {httpData, httpResponse} from '../http';
import { AddUserDto } from '../class/user/AddUserDto';
import { UserView } from '../class/user/UserView';
import { User } from'../class/user/User';


//添加用户
export const $api_AddUser = async (userView: UserView) => {
    return await httpData<UserView>({
        url: "User/Add",
        method: "POST",
        data: userView,
    });
};

//修改用户
export const $api_UpdateUser = async (id : number, userView : UserView) => {
    return await httpData<User>({
        url : `/User/Update/${id}`,
        method : 'Put',
        data : userView,
    });
};

//删除用户
export const $api_DeleteUser = async (id: number) => {
    return await httpData<number>({
        url : `/User/Del/${id}`,
        method : 'Delete'
    });
};

//获取用户详情
export const $api_GetUser = async (id: number) => {
    return await httpData<User>({
        url : `/User/GetOne/${id}`,
        method : 'Get'
    });
};

//获取用户详情列表
export const $api_GetAllUsers = async (pageIndex : number) => {
    return await httpResponse<User[]>({
        url : `User/GetAll/${pageIndex}`,
        method : 'Get',
    });
};

//设置用户头像
export const $api_SetUserPhone = async () => {
    //TODO
};
//获取用户头像
export const $api_GetUserPhone = async () => {
    //TODO
};

//获取用户视图详情
export const $api_GetUserView = async (id : number) => {
    return await httpData<UserView>({
        url : `User/GetUserView/${id}`,
        method : 'Get'
    });
};

//获取用户视图列表
export const $api_GetUserViews = async (pageIndex : number) => {
    return await httpResponse<UserView[]>({
        url : `User/GetUserViews/${pageIndex}`,
        method : 'Get'
    });
};

export const $api_UpdateUserState = async (id : number) => {
    return await httpData<boolean>({
        url : `User/UpdateUserState/${id}`,
        method : 'Put'
    });
};