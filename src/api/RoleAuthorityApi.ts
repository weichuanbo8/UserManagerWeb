//导入自定义的axios封装类
import {httpData} from '../http';
import { RoleAuthority } from '../class/roleAuthority/RoleAuthority';
import { ControllerAuthority } from '../class/roleAuthority/ControllerAuthority';

//根据角色id获取权限列表
export const $api_GetAuthoritiesByRoleId = async (roleId: number) => {
    return await httpData<RoleAuthority>({
        url: `RoleAuthority/GetByRoleId/${roleId}`,
        method: "Get"
    });
};
//给指定角色赋权限值
export const $api_UpdateRoleAuthority = async (roleId : number, controllerAuthorityList : ControllerAuthority[]) => {
    return await httpData<number>({
        url: `RoleAuthority/AddRange/${roleId}`,
        method: "Post",
        data : controllerAuthorityList
    });
};