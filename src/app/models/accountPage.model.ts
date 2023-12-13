import { Account } from "./account.model";

export interface AccountPage{
    currentPage:number;
    totalPages:number;
    pageSize:number;
    accounts: Account[];
}