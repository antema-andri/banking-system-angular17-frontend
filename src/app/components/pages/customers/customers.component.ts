import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CustomerService } from '../../../services/customer.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TableComponent } from '../../elts/table/table.component';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    TableComponent 
  ],
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit{
  private customerService=inject(CustomerService);
  public auth=inject(AuthService);
  customers!:Customer[];
  searchForm = new FormControl();

  ngOnInit(): void {
    this.loadCustomers();
    this.searchForm.setValue('');
  }

  async loadCustomers(){
    this.customers=await this.customerService.searchCustomers('');
  }

  async search(){
    this.customers=await this.customerService.searchCustomers(this.searchForm.value);
  }

  isUserApp(customer:Customer):boolean{
    return customer.id%2==0 ? true : false;
  }

  async deleteCustomer(customer: Customer) {
    const confirmed = confirm("Are you sure ?");
    if (!confirmed) return;
  
    try {
      await this.customerService.deleteCustomer(customer.id);
      const index = this.customers.indexOf(customer);
      
      if (index !== -1) {
        this.customers = [...this.customers.slice(0, index), ...this.customers.slice(index + 1)];
      } else {
        console.error("Customer not found in the list.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }
  
  onClickDeleteButton(event: any) {
    const idCustomer = event;
    const customer: any = this.customers.find(cust => cust.id == idCustomer);
  
    if (customer) {
      this.deleteCustomer(customer);
    } else {
      console.error("Customer not found for deletion.");
    }
  }
  
}
