import { Customer } from "./customer.model";
import { Role } from "./role.model";

export interface User {
    id:string;
    username: string;
    password: string;
    customer: Customer;
    appRole: Role;
}
