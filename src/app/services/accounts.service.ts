import { Injectable, inject } from '@angular/core';
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
  private api=inject(ApiService);
  static minTransact=5;

  constructor() { 
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    this.api.setAuthToken(''+token);
  }

  async getAccounts():Promise<Account[]>{
    try {
      const data=await this.api.get("/accounts");
      return data.body as Account[];
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }

  async getAccountsByCustomerName(customerName:string, page:number, size:number):Promise<AccountPage>{
    try {
      const data=await this.api.get("/accounts/page?name="+customerName+"&page="+page+"&size="+size);
      return data.body as AccountPage;
    } catch (error) {
      console.error('Error fetching accountPages:', error);
      throw error;
    }
  }

  async getAccountOperations(accountId: string):Promise<AccountOperationPage>{
    try {
      const data=await this.api.get("/accounts/"+accountId+"/operationsPage");
      return data.body as AccountOperationPage;
    } catch (error) {
      console.error('Error fetching AccountOperations:', error);
      throw error;
    }
  }

  async credit(credit: Credit):Promise<Account>{
    try {
      const data=await this.api.post("/accounts/credit", credit);
      alert("amount of $"+credit.amount+" successfully credeted");
      return data.body as Account;
    } catch (error) {
      console.error('Error credit operation:', error);
      throw error;
    }
  }

  async debit(debit: Debit):Promise<Account>{
    try {
      const data=await this.api.post("/accounts/debit", debit);
      alert("amount of $"+debit.amount+" successfully debited");
      return data.body as Account;
    } catch (error) {
      console.error('Error debit operation:', error);
      throw error;
    }
  }

  async transfer(transfer: Transfer):Promise<Account>{
    try {
      const data=await this.api.post("/accounts/transfer", transfer);
      alert("amount of $"+transfer.amount+" successfully transferred to "+transfer.accountDestinationId);
      return data.body as Account;
    } catch (error) {
      console.error('Error transfert operation:', error);
      throw error;
    }
  }

}
