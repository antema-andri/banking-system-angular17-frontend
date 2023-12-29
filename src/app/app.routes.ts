import { Routes } from '@angular/router';
import { isAuthenticated } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./components/pages/loginform/loginform.component').then(mod => mod.LoginformComponent)
    },
    {
        path:'home',
        loadComponent: () => import('./components/pages/home/home.component').then(mod => mod.HomeComponent),
        canActivate:[isAuthenticated],
        children: [
            {
                path: 'user-list',
                loadComponent: () => import('./components/pages/user-list/user-list.component').then(mod => mod.UserListComponent),
            },
            {
                path: 'add-user',
                loadComponent: () => import('./components/pages/create-user/create-user.component').then(mod => mod.CreateUserComponent),
            },
            {
                path: 'operation-list/:accountType',
                loadComponent: () => import('./components/pages/operation-list/operation-list.component').then(mod => mod.OperationListComponent)
            }
        ]
    },
    {
        path:'customers', 
        loadComponent: () => import('./components/pages/customers/customers.component').then(mod => mod.CustomersComponent),
        canActivate:[isAuthenticated]
    },
    {
        path:'accounts', 
        loadComponent: () => import('./components/pages/accounts/accounts.component').then(mod => mod.AccountsComponent),
        canActivate:[isAuthenticated]
    }
];
