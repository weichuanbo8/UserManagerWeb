// 完整的用户详情
export type User = {
    public id : number,
    public userName : string,
    public password : string,
    public email : string,
    public phone : string,
    public roleId : number,
    public userState : number,
    public accessToken : string;
};