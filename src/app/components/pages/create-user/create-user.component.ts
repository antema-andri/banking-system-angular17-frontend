import { Component, OnInit, inject } from '@angular/core';
import { FormInputComponent } from '../../elts/form-input/form-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../../models/customer.model';
import { Role } from '../../../models/role.model';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { AppUserService } from '../../../services/app-user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  private fb=inject(FormBuilder);
  private customerServ=inject(CustomerService);
  private userServ=inject(AppUserService);
  createUserFormGroup!:FormGroup;
  customers!:Customer[];
  roles!:Role[];

  ngOnInit(): void {
    this.loadCustomers();
    this.loadRoles();
    this.loadFormGroup();
  }

  async sendNewAppUser(){
    const appUser:User={
      id:0,
      username:this.createUserFormGroup.value.username,
      password:this.createUserFormGroup.value.password,
      customer:{id: this.createUserFormGroup.value.customerId, name:'', email:'', bankAccounts:[]},
      appRole:{id:0, roleName:this.createUserFormGroup.value.roleName}
    }
  
    const newUser:User=await this.userServ.createAppUser(appUser);
    this.loadCustomers();
    this.resetFormGroup();
    this.createUserFormGroup.markAsDirty();
  }

  resetFormGroup(){
    this.createUserFormGroup.patchValue({'username':''});
    this.createUserFormGroup.patchValue({'password':''});
    this.createUserFormGroup.patchValue({'roleName':''});
  }
  
  loadFormGroup(){
    this.createUserFormGroup=this.fb.group({});
  }

  async loadCustomers(){
    this.customers=await this.customerServ.getCustomersNotUser();
  }

  async loadRoles(){
    this.roles=await this.userServ.getRoles();
  }
}
