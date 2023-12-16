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
    try {
      const data=await this.api.get('/customers');
      return data.body as Customer[];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async getCustomersNotUser():Promise<Customer[]>{
    try {
      const data=await this.api.get('/customers/notuser');
      return data.body as Customer[];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async searchCustomers(keyWord:string):Promise<Customer[]>{
    try {
      const data=await this.api.get('/customers/search?word='+keyWord);
      return data.body as Customer[];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async deleteCustomer(idCustomer:number){
    try {
      await this.api.delete('/customers/'+idCustomer);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }
}
