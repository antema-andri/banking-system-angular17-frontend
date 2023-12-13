import { Customer } from "./customer.model";

export interface Account {
    id: string;
    balance:number;
    createdAt:string;
    status:string;
    currency:string;
    customer:Customer;
    type:string;
}