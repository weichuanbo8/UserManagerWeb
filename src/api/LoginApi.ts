//导入自定义的axios封装类
import {httpData} from '../http';
//导入自定义的数据类
import { LoginRequest } from '../class/login/LoginRequest';
import { LoginResponce } from '../class/login/LoginResponce';
import { PasswordDto } from '../class/login/PasswordDto';

//登陆
export const $api_Login = async (loginRequest: LoginRequest) => {
    return await httpData<LoginResponce>({
        url: "login/login",
        method: "POST",
        data: loginRequest,
    });
};

//修改密码
export const $api_ChangePassword = async (passwrodDto : PasswordDto) => {
    return await httpData<PasswordDto>({
        url : `Login/ChangePassword/${passwrodDto.id}`,
        method : '',
        data : passwrodDto
    });
};

