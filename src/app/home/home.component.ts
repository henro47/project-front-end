import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { faFileUpload, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {idNumberValidator} from '../validators/id-number.validator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../app.component.css']
})
export class HomeComponent implements OnInit {
  fIDNumberControl = new FormControl('',[
    Validators.required,
    idNumberValidator
  ]);

  fNameControl = new FormControl('',[
    Validators.required,
    Validators.minLength(1)
  ]);

  fLastControl = new FormControl('',[
    Validators.required,
    Validators.minLength(1)
  ]);

  fContact = new FormControl('',[
    Validators.required,
    Validators.minLength(10)
  ]);

  fNationality = new FormControl('',[
    Validators.required,
    Validators.minLength(2)
  ]);

  readText(reader: FileReader)
  {
    reader.onload = function() {
      console.log(reader.result);
      var lines = reader.result.toString().split('\n');
      for(let i = 0; i <lines.length;i++)
      {
        var data = lines[i].split(':');
        if(lines[i].includes('first'))
        {
          (document.getElementById("first-name") as HTMLInputElement).value = data[1];
        }

        if(lines[i].includes('last'))
        {
          (document.getElementById("last-name") as HTMLInputElement).value = data[1];
        }

        if(lines[i].includes('id'))
        {
          (document.getElementById("id") as HTMLInputElement).value = data[1];
        }

        if(lines[i].includes('contact') || lines[i].includes('number'))
        {
          (document.getElementById("contact") as HTMLInputElement).value = data[1];
        }

        if(lines[i].includes('nat') || lines[i].includes('origin'))
        {
          (document.getElementById("nat") as HTMLInputElement).value = data[1];
        }
      }
    };
    reader.onerror = function() {
      console.log(reader.error);
    };
  }
  
  inputChange(fileInputEvent: any) {
    var file = fileInputEvent.target.files[0] ;
    if(file != null)
    {
      if(file.name.toString().includes('.txt') || file.name.toString().includes('.csv'))
      {
        var reader = new FileReader();
        reader.readAsText(file);
        console.log(file.name);
        this.readText(reader);
      }
    }   
  };

  uploadTitle = "Upload" ;
  uploadSub = "Upload your file here";
  btnUploadTitle = "Upload File";
  uploadIco = faFileUpload;

  infoTitle = "Personal Information" ;
  infoSubtitle = "Check your personal info";
  infoIco = faInfoCircle;

  btnSubmitTitle = "Submit" ;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submitInfo(){
    let firstName =  " " ;
    let lastName = " " ;
    let id = " " ;
    let con = " " ;
    let nat = " " ;
    
    firstName = (document.getElementById("first-name") as HTMLInputElement).value ;
    lastName = (document.getElementById("last-name") as HTMLInputElement).value ;
    id = (document.getElementById("id") as HTMLInputElement).value ;
    con = (document.getElementById("contact") as HTMLInputElement).value ;
    nat = (document.getElementById("nat") as HTMLInputElement).value ;

    this.fIDNumberControl.setValue(id);
    this.fNameControl.setValue(firstName);
    this.fLastControl.setValue(lastName);
    this.fContact.setValue(con);
    this.fNationality.setValue(nat);

    if(this.fIDNumberControl.valid)
    {
      if(this.fNameControl.valid)
      {
        if(this.fLastControl.valid)
        {
          if(this.fContact.valid)
          {
            if(this.fNationality.valid)
            {
              let userEmail = localStorage.getItem('email');
              let token = 'Bearer ' ;
              token += localStorage.getItem('token'); 
          
              let httpHeaders = new HttpHeaders()
              .set('Authorization', token);
          
              var data = [
                {'propName' : 'idNum', 'value': id},
                {'propName' : 'fName', 'value': firstName},
                {'propName' : 'lName', 'value': lastName},
                {'propName' : 'contact', 'value': con},
                {'propName' : 'national', 'value': nat}
              ]
          
              console.log("data:" + data);
              console.log('ID IS VALID');
          
              this.http.patch('https://project-2-api-hfr.herokuapp.com/user/'+ userEmail, data ,{headers: httpHeaders})
              .subscribe(Response => {
                console.log(Response);

                var result = [];
                for(var i in Response)
                {
                  result.push([i,Response[i]]);
                }
                console.log(result);
                if(result[0][1].toString().includes('success'))
                {
                  localStorage.setItem('token',result[1][1]);
                  localStorage.setItem('email',userEmail);
                }
                this.openSnackBar(result[0][1].toString(),"Close");
              });
            }
            else
            {
              this.openSnackBar("Please provide your nationality","Close");
            }
          }
          else
          {
            this.openSnackBar("Please provide your contact number","Close");
          }
        }
        else
        {
          this.openSnackBar("Please provide your last name","Close");
        }
      }
      else
      {
        this.openSnackBar("Please provide your first name","Close");
      }
    }
    else
    {
      this.openSnackBar("Please provide your identification number (RSA)","Close");
    }
  }
  

  ngOnInit(): void {

  }
}
