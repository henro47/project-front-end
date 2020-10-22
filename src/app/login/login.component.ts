import { Component, OnInit } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';


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


  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  loginTitle = "Login";
  loginIco = faSignInAlt;
  btnLogin = "Login";
  btnSignUp = "Sign Up";

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login()
  {
    let userEmail =  (document.getElementById("username") as HTMLInputElement).value;
    let userPassword =  (document.getElementById("password") as HTMLInputElement).value;
    //localStorage('','')

    this.http.post('http://localhost:5000/user/login',{
              email: userEmail,
              password: userPassword
            },)
            .subscribe(Response => {
              console.log(Response)
              this.openSnackBar(Response.toString(),"Close");
              localStorage.setItem('token',Response.toString());
            });
  }

  ngOnInit(): void {
  }

}
