import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
    Validators.required,
    Validators.minLength(8)
  ])

  fConfirmPWdControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(8)
  ]);

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  signUp()
  {
    let userEmail =  this.fUsernameControl.value;
    let userPassword =  this.fPasswordControl.value
    let confirm =  this.fConfirmPWdControl.value;
    
    if(this.fUsernameControl.valid)
    {
      if(this.fPasswordControl.valid)
      {
        if(this.fConfirmPWdControl.valid)
        {
          if(userPassword.match(confirm))
          {
            this.http.post('https://project-2-api-hfr.herokuapp.com/user/signup',{
              email: userEmail,
              password: userPassword
            })
            .subscribe(Response => {
              console.log(Response)
              this.openSnackBar("User Created Successfully","Close");
              this.router.navigate(['/login']);
            });
          }
          else
          {
            this.openSnackBar("Passwords do not match","Close");
          }
        }
        else
        {
          this.openSnackBar("Password minimum length of 8 characters","Close");
        }
      }
      else
      {
        this.openSnackBar("Password minimum length of 8 characters","Close");
      }
    }
    else{
      this.openSnackBar("Please enter a valid email address","Close");
    }
  };

  signUpIco = faUserPlus;
  signUpTitle = "Sign up" ;
  btnCreate = "Create Account" ;

  ngOnInit(): void {
  }

}
