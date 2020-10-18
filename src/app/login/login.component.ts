import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../app.component.css']
})
export class LoginComponent implements OnInit {


  fUsernameControl = new FormControl('',[
    Validators.required,
    Validators.email
  ]);

  fPasswordControl = new FormControl('',[
    Validators.required
  ])


  constructor() { }

  loginTitle = "Login";
  loginIco = faSignInAlt;
  btnLogin = "Login";
  btnSignUp = "Sign Up";

  ngOnInit(): void {
  }

}
