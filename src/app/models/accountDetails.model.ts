import { AccountOperation } from "./accountOperations.model";

export interface AccountOperationPage {
    accountId:string;
    balance:number;
    currentPage:number;
    totalPages:number;
    pageSize:number;
    accountOperations:AccountOperation[];
}