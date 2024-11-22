//导入自定义的axios封装类
import {httpData, httpResponse} from '../http';
import { Authority } from '../class/authority/Authority';

//添加权限
export const $api_AddAuthority = async (authority: Authority) => {
    return await httpData<Authority>({
        url: "Authority/Add",
        method: "POST",
        data: authority,
    });
};

//修改权限
export const $api_UpdateAuthority = async (id : number, authority: Authority) => {
    return await httpData<Authority>({
        url : `/Authority/Update/${id}`,
        method : 'Put',
        data : authority,
    });
};

//删除权限
export const $api_DeleteAuthority = async (id: number) => {
    return await httpData<number>({
        url : `/Authority/Del/${id}`,
        method : 'Delete'
    });
};

//获取权限详情
export const $api_GetAuthority = async (id: number) => {
    return await httpData<Authority>({
        url : `/Authority/GetOne/${id}`,
        method : 'Get'
    });
};

//权限列表（指定控制器）
export const $api_GetAuthoritiesBy = async (constrollerValue : string) => {
    return await httpResponse<Authority[]>({
        url: `Authority/GetByController/${constrollerValue}`,
        method: "Get"
    });
};

//全部权限列表
export const $api_GetAllAuthority = async () => {
    return await httpData<Authority[]>({
        url: `Authority/GetAll`,
        method: "Get"
    });
};
//获取控制器名列表
export const $api_GetControllers = async () => {
    return await httpData<string[]>({
        url: `Authority/GetControllers`,
        method: "Get"
    });
};