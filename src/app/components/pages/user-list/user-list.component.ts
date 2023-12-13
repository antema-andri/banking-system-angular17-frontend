import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../elts/table/table.component';
import { User } from '../../../models/user.model';
import { AppUserService } from '../../../services/app-user.service';
import { UserTable } from '../../../models/userTable.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  private userServ=inject(AppUserService);
  users!:User[];
  userTabs!:UserTable[];
  searchForm:FormControl=new FormControl();

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(){
    this.users=await this.userServ.getAppUsers();
    const temps:UserTable[]=[];
    for(const user of this.users){
      const userTab:UserTable={
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.customer ? user.customer.name:null,
        email: user.customer ? user.customer.email:null,
        roleName: user.appRole.roleName
      }
      temps.push(userTab);
    }
    this.userTabs=temps;
  }

  search(nb:number){

  }
}
