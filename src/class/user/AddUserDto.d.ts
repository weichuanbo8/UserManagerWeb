//添加用户DTO
export type AddUserDto = {
    public userName : string,
    public password : string,
    public email : string,
    public phone : string,
    public roldId : number;
};