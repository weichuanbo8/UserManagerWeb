import {ControllerAuthority} from './ControllerAuthority'
import { Role } from '../role/Role';

export type RoleAuthority = {
    public role : Role; 
    public controllerAuthorityList : ControllerAuthority[];
}