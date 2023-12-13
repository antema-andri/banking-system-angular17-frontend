import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { CreateUser } from '../models/createUser.model';

const JWT_LOCALSTORE_KEY="token";

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  private api=inject(ApiService);

  constructor() { 
    const token = localStorage.getItem(JWT_LOCALSTORE_KEY);
    this.api.setAuthToken(''+token);
  }

  async getAppUsers():Promise<User[]>{
    const appUsers=await this.api.get("/users")
                            .then((data)=>{
                              return data.body as User[];
                            });
    return appUsers;
  }

  async getRoles():Promise<Role[]>{
    const roles=await this.api.get("/roles")
                          .then((data)=>{
                            return data.body as Role[];
                          });
    return roles;
  }

  async createUser(createUser:CreateUser):Promise<User>{
    const appUser=await this.api.post("/users", createUser)
                            .then((data)=>{
                              return data.body as User;
                            });
    return appUser;
  }
}
