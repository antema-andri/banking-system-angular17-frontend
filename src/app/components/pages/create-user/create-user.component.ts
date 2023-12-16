import { Component, OnInit, inject } from '@angular/core';
import { FormInputComponent } from '../../elts/form-input/form-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../../models/customer.model';
import { Role } from '../../../models/role.model';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule } from '@angular/common';
import { AppUserService } from '../../../services/app-user.service';
import { CreateUser } from '../../../models/createUser.model';
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
  currentRoleId:String='';

  ngOnInit(): void {
    this.loadFormGroup();
    this.loadCustomers();
    this.loadRoles();
  }

  async sendNewAppUser(){
    const createUser:CreateUser={
      username:this.createUserFormGroup.value.username,
      password:this.createUserFormGroup.value.password,
      customerId:this.createUserFormGroup.value.customerId,
      roleId:this.createUserFormGroup.value.roleId
    }

    const newUser:User=await this.userServ.createUser(createUser)
    this.loadCustomers();
    this.resetFormGroup();
    this.createUserFormGroup.markAsDirty();
  }

  resetFormGroup(){
    this.createUserFormGroup.patchValue({'username':''});
    this.createUserFormGroup.patchValue({'password':''});
    this.createUserFormGroup.patchValue({'roleId':''});
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

  setCurrentRole(roleId:string){
    this.currentRoleId=roleId;
  }
  
}
