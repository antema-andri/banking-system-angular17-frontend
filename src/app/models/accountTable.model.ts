export interface AccountTable {
    id: string;
    balance:number;
    createdAt:string;
    status:string;
    currency:string;
    type:string;
    customerName: string|null;
    customerEmail: string|null;
}