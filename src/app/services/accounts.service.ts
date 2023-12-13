import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Account } from '../models/account.model';
import { Credit } from '../models/credit.model';
import { Debit } from '../models/debit.model';
import { Transfer } from '../models/transfer.model';
import { AccountOperationPage } from '../models/accountDetails.model';
import { AccountPage } from '../models/accountPage.model';

const JWT_LOCALSTORE_KEY="token";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  static minTransact=5;

  constructor(private api:ApiService) { 
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    this.api.setAuthToken(''+token);
  }

  async getAccounts():Promise<Account[]>{
    const accounts=await this.api.get("/accounts")
                              .then((data)=>{
                                return data.body as Account[];
                              });
    return accounts;
  }

  async getAccountsByCustomerName(customerName:string, page:number, size:number):Promise<AccountPage>{
    const accounts=await this.api.get("/accounts/page?name="+customerName+"&page="+page+"&size="+size)
                              .then((data)=>{
                                return data.body as AccountPage;
                              });
    return accounts;
  }

  async getAccountOperations(accountId: string):Promise<AccountOperationPage>{
    const accountOperatioPage=await this.api.get("/accounts/"+accountId+"/operationsPage")
                              .then((data)=>{
                                return data.body as AccountOperationPage;
                              });
    return accountOperatioPage;
  }

  async credit(credit: Credit):Promise<Account>{
    const account=await this.api.post("/accounts/credit", credit)
                            .then((data)=>{
                              alert("amount of $"+credit.amount+" successfully credeted");
                              return data.body as Account;
                            });
    return account;
  }

  async debit(debit: Debit):Promise<Account>{
    const account=await this.api.post("/accounts/debit", debit)
                            .then((data)=>{
                              alert("amount of $"+debit.amount+" successfully debited");
                              return data.body as Account;
                            });
    return account;
  }

  async transfer(transfer: Transfer):Promise<Account>{
    const account=await this.api.post("/accounts/transfer", transfer)
                            .then((data)=>{
                              alert("amount of $"+transfer.amount+" successfully transferred to "+transfer.accountDestinationId);
                              return data.body as Account;
                            });
    return account;
  }
}
