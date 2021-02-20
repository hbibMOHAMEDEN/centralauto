import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/model.user';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signUpForm: FormGroup;
  errorMsg: string;
  user: User;


  constructor(private formBulder : FormBuilder,
              private authService : AuthService,
              private router : Router) {
    this.user = new User("","","","");
  }

  ngOnInit(): void {
    this._intForm();
  }

  private _intForm() {
    this.signUpForm = this.formBulder.group({
      'firstName':['', Validators.required],
      'lastName' : ['', Validators.required],
      'email' : ['', Validators.required],
      'password' : ['', Validators.required],

    })
  }

  onSubmitSignupForm() {
    this.errorMsg=null;
    this.authService.signUp(this.user)
      .then(()=>{
        this.router.navigate(['dashboard']);
      })
      .catch((errMsg)=>this.errorMsg=errMsg);

  }
}
