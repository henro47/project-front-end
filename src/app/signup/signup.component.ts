import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../app.component.css']
})
export class SignupComponent implements OnInit {

  fUsernameControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  fPasswordControl = new FormControl('',[
    Validators.required
  ])

  fConfirmPWdControl = new FormControl('',
  [
    Validators.required
  ]);

  constructor() { }

  signUpIco = faUserPlus;
  signUpTitle = "Sign up" ;
  btnCreate = "Create Account" ;

  ngOnInit(): void {
  }

}
