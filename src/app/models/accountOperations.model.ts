import { Account } from "./account.model";

export interface AccountOperation {
    id:string;
    date:string;
    amount:number;
    description:string;
    type:string,
    bankAccount:Account
}