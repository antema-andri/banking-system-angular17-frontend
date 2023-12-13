import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit{
  public auth=inject(AuthService);
  private router=inject(Router);
  currentUser!:User;
  jwt!:boolean;

  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas(){
    this.currentUser=this.auth.user;
    this.jwt=this.auth.isAuth;
  }

  logout(){
    this.auth.clearSession();
    this.router.navigate(['']);
  }
}
