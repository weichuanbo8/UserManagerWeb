/*------------------------------服务器地址-----------------------------------*/
//开发环境地址
export const G_baseURL_dev : string = "http://localhost:5124/";
//生产环境地址
export const G_baseURL_pro : string = "http://localhost:5124/";
//测试环境地址
export const G_baseURL_test : string = "http://localhost:5124/";
//当前使用的地址
export const G_baseURL_current : string = G_baseURL_dev;
/*------------------------------routes-----------------------------------*/
export const G_routes_default : string = '/';
export const G_routes_Login : string = 'Login';
export const G_routes_Index : string = 'Index';
export const G_routes_User : string = 'User';
export const G_routes_Role : string = 'Role';
export const G_routes_Authority : string = 'Authority';
export const G_routes_RoleAuthority : string = 'RoleAuthority';
export const G_routes_Mine : string = 'Mine';
export const G_routes_ChangePassword = 'ChangePassword';
/*------------------------------正则-----------------------------------*/
//普通字符串验证——只能输入大小写字母和数字
export const G_regexp_string : string = '^[A-Za-z0-9]+$';
export const G_regexp_string_error : string = '只能输入数字、大小写字母';
//普通字符串验证——只能输入大小写字母和数字
export const G_regexp_onlyLetter : string = '^[A-Za-z]+$';
export const G_regexp_onlyLetter_error : string = '只能输入大小写字母';
//电话格式验证 **注：d{1}是为了方便，应该是d{9}
export const G_regexp_phone : string = '^1[3|5|7|8]\\d{1}$';
export const G_regexp_phone_error : string = '不是有效的手机号码';
//密码格式验证——只能输入大消息字母和数字，且长度在3~10位之间
export const G_regexp_password : string = '^[A-Za-z0-9]{3,10}$';
export const G_regexp_password_error : string = '密码只能包含3~10位的数字、大小写字母和下划线';

/*------------------------------杂项-----------------------------------*/
//用户头像文件在服务端的相对地址
export const G_relativeURL_photo : string = "User/getPhoto/";
//上传图片最大尺寸限制，小于此值用Base64存储在数据库中，大于此值转为图片
export const G_uploadImage_maxSize = 1 * 1024 * 1024; //1M
//为下拉列表赋值时，为了不限制后台数据条数设定的阈值
export const G_drpoDownMax = 1024;
//向后天获取分页数据列表时，在响应头中返回数据总数，此处定义响应头的key
export const G_responseHeader_listTotal : string = 'ctm-list-total';
/*------------------------------全局话术-----------------------------------*/
export const G_systemTitle : string = '用户管理系统'; 
export const G_systemVersion : string = 'V0.92';
export const G_button_cancle : string = '取消';
export const G_button_submit : string = '提交';
export const G_button_enter : string = '确定';
export const G_Manager : string = '管理';
export const G_update = '修改';
export const G_add = '添加';
export const G_delete = '删除';
export const G_Exit = '退出';
export const G_Option = '操作';
export const G_Query = '搜索';
export const G_message_Success = '成功';
export const G_message_fail = '失败';
export const G_message_warning = '警告';
export const G_message_tips = '提示';
export const G_message_pleaseEnter : string = '请输入';
export const G_message_pleaseSelect : string = '请选择';
export const G_message_AreYouSureDelete = '确定删除数据？';
/*------------------------------角色-----------------------------------*/
export const G_role_class : string = `角色`;
export const G_role_name : string = '角色名称';
export const G_role_description : string = '简介';
/*------------------------------权限-----------------------------------*/
export const G_authority_class : string = `权限`;
export const G_authority_name : string = `权限名`;
export const G_authority_controllerValue : string = `控制器`;
export const G_authority_actionValue : string = `方法`;
export const G_authority_actionPath : string = `路径`;
/*------------------------------角色权限-----------------------------------*/
export const G_roleAuthor_class : string = `角色权限`;
/*------------------------------用户-----------------------------------*/
export const G_user_class : string = `用户`;
export const G_user_name : string = '用户名';
export const G_user_password : string = '密码';
export const G_user_email : string = '邮箱';
export const G_user_phone : string = '电话';
export const G_user_userState : string = '状态';
export const G_user_accessToke : string = '令牌';
export const G_user_RoleName : string = G_role_name;
export const G_user_mine : string = '个人中心';

export const G_user_userState_on : string = '在用';
export const G_user_userState_off : string = '禁用';