import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { visitFunctionBody } from 'typescript';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { faFileUpload, faInfoCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../app.component.css']
})
export class HomeComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  fIDNumberControl = new FormControl('',[
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);

  fNameControl = new FormControl('',[
    Validators.required,
    Validators.minLength(1)
  ]);

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    var file = fileInputEvent.target.files[0] ;
    var reader = new FileReader();

    if(file != null)
    {
      reader.readAsText(file);

      reader.onload = function() {
        console.log(reader.result);
      };
    
      reader.onerror = function() {
        console.log(reader.error);
      };
    }
    else
    {
      console.log("No file has been selected");
    }
     
  };

  uploadTitle = "Upload" ;
  uploadSub = "Upload your file here";
  btnUploadTitle = "Upload File";
  uploadIco = faFileUpload;

  infoTitle = "Personal Information" ;
  infoSubtitle = "Check your personal info";
  infoIco = faInfoCircle;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://project-2-api-hfr.herokuapp.com/helloworld') 
    .subscribe(Response => { 
      console.log(Response);
      var result = [];
      for(var i in Response)
      {
        result.push([i,Response[i]]);
      }
      console.log("Array: " + result);
      // If response comes hideloader() function is called 
      // to hide that loader  
      //document.getElementById("test").innerHTML = result.toString();
    }); 

  }
}
