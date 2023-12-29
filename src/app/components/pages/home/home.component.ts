import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Account } from '../../../models/account.model';
import { AccountsService } from '../../../services/accounts.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
      CommonModule,
      ReactiveFormsModule,
      RouterModule, 
      NavbarComponent
    ]
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  authServ = inject(AuthService);
  accountServ = inject(AccountsService);
  accounts!:Account[]; 

  ngOnInit(): void {
    if(this.authServ.checkRole("ADMIN")){
      this.router.navigate(['home/user-list']);
    }else {
      this.loadAccounts();
    }
  }

  async loadAccounts(){
    if(this.authServ.getCutomer()){
      const customerId:string=String(this.authServ.getCutomer().id);
      this.accounts=await this.accountServ.getAccountsByCustomerId(customerId);
      this.router.navigate(['home/operation-list/',this.accounts[0].id]);
    }
  }

}
