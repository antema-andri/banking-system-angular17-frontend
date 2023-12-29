import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormInputComponent } from '../../elts/form-input/form-input.component';
import { TableComponent } from '../../elts/table/table.component';
import { AccountOperation } from '../../../models/accountOperations.model';
import { AccountOperationTable } from '../../../models/accountOperationTable.model';
import { AccountsService } from '../../../services/accounts.service';
import { AuthService } from '../../../services/auth.service';
import { AccountOperationPage } from '../../../models/accountDetails.model';
import { Account } from '../../../models/account.model';

@Component({
  selector: 'app-operation-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FormInputComponent,
    TableComponent
  ],
  templateUrl: './operation-list.component.html',
  styleUrl: './operation-list.component.css'
})
export class OperationListComponent implements OnInit {
  private route=inject(ActivatedRoute);
  private accountServ=inject(AccountsService);
  private authServ=inject(AuthService);
  operations!:AccountOperation[];
  operationPage!:AccountOperationPage;
  operationTabs!:AccountOperationTable[];
  accountId!:string|null;
  accounts!:Account[];

  ngOnInit(): void {
    this.loadAccounts();
    this.getParam();
  }

  async loadAccounts(){
    const customerId=this.authServ.getCutomer().id;
    this.accounts=await this.accountServ.getAccountsByCustomerId(String(customerId));
  }

  async loadAccountId(){
    this.authServ.user.customer;
  }

  getParam(){
    this.route.params.subscribe(params => {
      const paramValue = params['accountType'];
      this.accountId = paramValue;
      this.loadOperationTab();
    });
  }

  async loadOperations(){
    const accountId:string=this.accountId ? this.accountId : "";
    this.operationPage=await this.accountServ.getAccountOperations(accountId);
  }

  async loadOperationTab(){
    await this.loadOperations();
    const temp:AccountOperationTable[]=[];
    for(const accOp of this.operationPage.accountOperations){
      const accountTable:AccountOperationTable={
        id: accOp.id,
        date: accOp.date,
        amount: accOp.amount,
        description: accOp.description,
        accountType: accOp.bankAccount.type,
        operationType: accOp.type
      }
      temp.push(accountTable);
    }
    this.operationTabs=temp;
  }

}
