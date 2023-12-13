import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user.model';

const JWT_LOCALSTORE_KEY="token";
const USER_LOCALSTORE_KEY="user";

@Injectable({
  providedIn: 'root'
})
class AuthGuardService {

  constructor(private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const jwt=localStorage.getItem(JWT_LOCALSTORE_KEY) as any;
    const user:User=JSON.parse(String(localStorage.getItem(USER_LOCALSTORE_KEY)));
    if (jwt && user) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

};

export const isAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const permissionsService = inject(AuthGuardService);
  return permissionsService.canActivate(route, state);
};
