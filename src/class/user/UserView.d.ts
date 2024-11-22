// 完整的用户视图详情
export type UserView = {
    public id : number,
    public userName : string,
    public password : string,
    public email : string,
    public phone : string,
    public roleId : number,
    public userState : number,
    public accessToken : string,
    public roleName : string,
    public description : string,
    public userStateDescription : string;
};
