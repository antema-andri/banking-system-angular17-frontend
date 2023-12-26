import { Customer } from "./customer.model";

export interface CreateUser {
    username:string;
    password:string;
    roleName:string;
    customerId:string;
}