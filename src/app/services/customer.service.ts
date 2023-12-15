import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Customer } from '../models/customer.model';

const JWT_LOCALSTORE_KEY="token";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private api:ApiService) { 
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    this.api.setAuthToken(''+token);
  }

  async getCustomers():Promise<Customer[]>{
    const customers=await this.api.get('/customers')
            .then((data)=>{
              return data.body as Customer[];
            });
    return customers;
  }

  async getCustomersNotUser():Promise<Customer[]>{
    const customers=await this.api.get('/customers/notuser')
            .then((data)=>{
              return data.body as Customer[];
            });
    return customers;
  }

  async searchCustomers(keyWord:string):Promise<Customer[]>{
    const customers=await this.api.get('/customers/search?word='+keyWord)
            .then((data)=>{
              return data.body as Customer[];
            });
    return customers;
  }

  async deleteCustomer(idCustomer:number){
    await this.api.delete('/customers/'+idCustomer);
  }
}
