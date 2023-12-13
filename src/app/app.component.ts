import { CommonModule } from '@angular/common';
import {Component, OnInit, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

const JWT_LOCALSTORE_KEY="token";
const USER_LOCALSTORE_KEY="user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  private authServ:AuthService=inject(AuthService);
  title = 'banking System';

  constructor(){}

  ngOnInit(): void {
    this.checkData();
  }

  checkData(){
    const jwt=localStorage.getItem(JWT_LOCALSTORE_KEY) as any;
    const user:User=JSON.parse(String(localStorage.getItem(USER_LOCALSTORE_KEY)));
    if(jwt && user.username){
      this.authServ.user=user;
      this.authServ.isAuth=true;
    }
  }
}
