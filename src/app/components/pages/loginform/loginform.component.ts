import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit{

  validateLoginForm: FormGroup;
  error: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.validateLoginForm=this.fb.group({});
  }

  ngOnInit(): void {
    this.initValidationForm();
  }

  initValidationForm(){
    this.validateLoginForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',Validators.required]
    });
  }

  async onSignin(){
    const formValue = this.validateLoginForm.value;
    await this.authService.signInApi(formValue['username'], formValue['password']);
    this.router.navigate(['home']);
  }

}
