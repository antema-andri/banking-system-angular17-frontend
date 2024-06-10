import { Customer } from "./customer.model";
import { Role } from "./role.model";

export interface User {
    id:string|null|number;
    username: string;
    password: string;
    customer: Customer;
    appRole: Role;
}
