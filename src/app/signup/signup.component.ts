import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  signUp()
  {
    let userEmail =  (document.getElementById("username") as HTMLInputElement).value;
    let userPassword =  (document.getElementById("password") as HTMLInputElement).value;
    let confirm =  (document.getElementById("confirm-password") as HTMLInputElement).value;

    if(userPassword.match(confirm))
    {
      this.http.post('http://localhost:5000/user/signup',{
        email: userEmail,
        password: userPassword
      })
      .subscribe(Response => {
        console.log(Response)
      });
    }
    else{
      console.log("Passwords do not match");
    }
  };

  signUpIco = faUserPlus;
  signUpTitle = "Sign up" ;
  btnCreate = "Create Account" ;

  ngOnInit(): void {
  }

}
