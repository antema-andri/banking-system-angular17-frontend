import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountsService } from '../../../services/accounts.service';
import { FormInputComponent } from '../../elts/form-input/form-input.component';
import { TableComponent } from '../../elts/table/table.component';
import { Account } from '../../../models/account.model';
import { AccountPage } from '../../../models/accountPage.model';
import { AccountOperationPage } from '../../../models/accountDetails.model';
import { Debit } from '../../../models/debit.model';
import { Credit } from '../../../models/credit.model';
import { Transfer } from '../../../models/transfer.model';
import { AccountTable } from '../../../models/accountTable.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FormInputComponent,
    TableComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit{
  private fb=inject(FormBuilder);
  private accountServ=inject(AccountsService);
  accounts!:Account[];
  accountPage!:AccountPage;
  accountTabs!:AccountTable[];
  selectedAccount!:Account|null;
  currentPage!:number;
  accountOperationPage!:AccountOperationPage|null;
  searchForm = new FormControl();
  accountFormGroup!:FormGroup;
  operationTypes:string[]=['DEBIT','CREDIT','TRANSFER'];
  operationLabels:string[]=['Debit','Credit','Transfer'];
  defaultSelectValue:string='Select a receiver';
  currentOperation!:string;
  descOperations:string[]=['debit operation','credit operation'];

  ngOnInit(): void {
    this.searchForm.setValue('');
    this.currentPage=0;
    this.selectedAccount=null;
    this.loadFormGroup();
    this.loadAccounts();
    this.updateCurretOp(this.operationTypes[0]);
  }

  async search(page:number){
    this.selectedAccount=this.currentPage==page?this.selectedAccount:null;
    this.currentPage=page;
    this.accountPage=await this.accountServ.getAccountsByCustomerName(this.searchForm.value,page,1);
    this.loadAccountTab();
  }

  loadAccountTab(){
    const temps:AccountTable[]=[];
    for(const acc of this.accountPage.accounts){
      const accountTable:AccountTable={
        id: acc.id,
        balance: acc.balance,
        createdAt: acc.createdAt,
        status: acc.status,
        currency: acc.currency,
        type: acc.type,
        customerName: acc.customer ? acc.customer.name : null,
        customerEmail: acc.customer ? acc.customer.email : null
      }
      temps.push(accountTable);
    }
    this.accountTabs=temps;
  }

  async loadCurrentAccount(account:Account){
    this.selectedAccount=account;
    this.accountFormGroup.patchValue({accountId:this.selectedAccount.id});
  }

  async loadAccounts(){
    this.accounts=await this.accountServ.getAccounts();
  }

  loadFormGroup(){
    this.accountFormGroup=this.fb.group({
      operationType: this.fb.control(this.operationTypes[0]),
      amount: this.fb.control(5, [Validators.required,Validators.min(3)]),
      accountId: this.fb.control('0')
    });
  }

  async sendOperation(){
    if(this.accountFormGroup.value.operationType==this.operationTypes[0]){
      const debit:Debit={
        accountId:this.accountFormGroup.value.accountId,
        amount:this.accountFormGroup.value.amount,
        desc:this.accountFormGroup.value.description
      }
      this.selectedAccount=await this.accountServ.debit(debit);
    }else if(this.accountFormGroup.value.operationType==this.operationTypes[1]){
      const credit:Credit={
        accountId:this.accountFormGroup.value.accountId,
        amount:this.accountFormGroup.value.amount,
        desc:this.accountFormGroup.value.description
      }
      this.selectedAccount=await this.accountServ.credit(credit);
    }else if(this.accountFormGroup.value.operationType==this.operationTypes[2]){
      const transfer:Transfer={
        accountSourceId:this.accountFormGroup.value.accountId,
        accountDestinationId:this.accountFormGroup.value.accountDestination,
        amount:this.accountFormGroup.value.amount
      }
      this.selectedAccount=await this.accountServ.transfer(transfer);
    }
  }

  isCurrentOperation(operationType:string):boolean{
    let result:boolean=false;
    if(this.currentOperation==operationType){
      result=true;
    }
    return result;
  }

  updateCurretOp(operationType:string){
    this.currentOperation=operationType;
    this.accountFormGroup.patchValue({'description':this.getOperationDesc()});
  }

  getOperationDesc():string{
    let op="";
    if(this.currentOperation===this.operationTypes[0]){
      op=this.descOperations[0];
    }else if(this.currentOperation===this.operationTypes[1]){
      op=this.descOperations[1];
    }
    return op;
  }

  clickGenerate(event:any) {
    const idAccountClicked=event;
    const acc:any=this.accounts.find(acc=>acc.id===idAccountClicked)?this.accounts.find(acc=>acc.id===idAccountClicked):{};
    this.loadCurrentAccount(acc);
  }

  paginateClick(event:any){
    const indexPage=event;
    this.search(indexPage);
  }
}
