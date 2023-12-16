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
    try {
      const data=await this.api.get("/users");
      return data.body as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getRoles():Promise<Role[]>{
    try{
      const data=await this.api.get("/roles")
      return data.body as Role[];
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  async createUser(createUser:CreateUser):Promise<User>{
    try{
      const data=await this.api.post("/users", createUser)
      alert("user "+data.body.username+" successfully created");
      return data.body as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}
