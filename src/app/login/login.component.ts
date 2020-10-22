import { Component, OnInit, Type } from '@angular/core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
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
  routerLink = "/";

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
              console.log(Response);
             
              var result = [];
              for(var i in Response)
              {
                result.push([i,Response[i]]);
              }
              console.log(result[1][1]);
              if(result[0][1].toString().includes('success'))
              {
                localStorage.setItem('token',result[1][1]);
                this.openSnackBar("logged in successfully!","Close");
                this.routerLink = '/home';
              }
    });
  }

  ngOnInit(): void {
  }

}
