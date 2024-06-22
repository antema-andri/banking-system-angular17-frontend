import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { InfoUser } from '../models/info-user.model';
import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';

const JWT_LOCALSTORE_KEY="token";
const USER_LOCALSTORE_KEY="user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  user!:User;
  roles=['ADMIN', 'USER']

  constructor(private api:ApiService) {}

  async signInApi(login:string , pswd:string):Promise<any>{
    const res=await this.api.post('/auth/token', {username: login, password: pswd})
    this.user=res.body as User;
    const infoUser:InfoUser={
      token: res.headers.get("Authorization"),
      user: this.user,
    }
    this.makeSession(infoUser)
  }

  makeSession(infoUser: InfoUser){
    if(infoUser.token && infoUser.user){
      this.isAuth=true;
      this.user=infoUser.user as User;
      localStorage.setItem(JWT_LOCALSTORE_KEY, infoUser.token);
      localStorage.setItem(USER_LOCALSTORE_KEY, JSON.stringify(this.user));
    }
  }

  clearSession(){
    localStorage.clear();
    this.isAuth=false;
  }

  checkRole(role:string){
    return this.user.appRole.roleName==role;
  }

  getCutomer():Customer{
    return this.user.customer;
  }
}
