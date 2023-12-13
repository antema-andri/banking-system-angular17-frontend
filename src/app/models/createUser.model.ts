import { Customer } from "./customer.model";

export interface CreateUser {
    username:string;
    password:string;
    roleId:string;
    customerId:string;
}