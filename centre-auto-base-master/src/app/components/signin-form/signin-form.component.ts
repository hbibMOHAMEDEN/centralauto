import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signInForm: FormGroup;
  errorMsg: string;
  password: string;
  email: string

  constructor(private formbuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this._initForm();
  }

  _initForm() {
    this.signInForm = this.formbuilder.group({
      'email' : ['' , Validators.required],
      'password' : ['', Validators.required]
    })
  }
  onSubmitSignInForm() {
    this.errorMsg=null;
    this.authService.signIn(this.password, this.email)
        .then(()=>{
          this.router.navigate(['dashboard']);
        })
        .catch((errMsg)=>this.errorMsg=errMsg);

  }
}
