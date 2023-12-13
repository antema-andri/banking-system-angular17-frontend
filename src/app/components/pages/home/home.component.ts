import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
export class HomeComponent {
  public auth = inject(AuthService);

  
}
