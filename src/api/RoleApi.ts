//导入自定义的axios封装类
import {httpData, httpResponse} from '../http';
import { Role } from '../class/role/Role';

//添加角色
export const $api_AddRole = async (role: Role) => {
    return await httpData<Role>({
        url: "Role/Add",
        method: "POST",
        data: role,
    });
};

//修改角色
export const $api_UpdateRole = async (id : number, role: Role) => {
    return await httpData<Role>({
        url : `/Role/Update/${id}`,
        method : 'Put',
        data : role,
    });
};

//删除角色
export const $api_DeleteRole = async (id: number) => {
    return await httpData<number>({
        url : `/Role/Del/${id}`,
        method : 'Delete'
    });
};

//获取用户详情
export const $api_GetRole = async (id: number) => {
    return await httpData<Role>({
        url : `/Role/GetOne/${id}`,
        method : 'Get'
    });
};

//角色列表（指定页码）
export const $api_GetAllBy = async (pageIndex : number) => {
    return await httpResponse<Role[]>({
        url: `Role/GetAllBy/${pageIndex}`,
        method: "Get"
    });
};
//全部角色列表
export const $api_GetAllRoles = async () => {
    return await httpResponse<Role[]>({
        url: "Role/GetAllRoles",
        method: "Get"
    });
};