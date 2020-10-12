import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
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
        var lines = reader.result.toString().split('\n');
        for(let i = 0; i <lines.length;i++)
        {
          if(lines[i].includes('first'))
          {
            
            var data = lines[i].split(':');
            (document.getElementById("first-name") as HTMLInputElement).value = data[1];
          }

          if(lines[i].includes('last'))
          {
            
            var data = lines[i].split(':');
            (document.getElementById("last-name") as HTMLInputElement).value = data[1];
          }

          if(lines[i].includes('id'))
          {
            var data = lines[i].split(':');
            (document.getElementById("id") as HTMLInputElement).value = data[1];
          }

          if(lines[i].includes('email'))
          {
            var data = lines[i].split(':');
            (document.getElementById("email") as HTMLInputElement).value = data[1];
            console.log("email is included" + data[1]);
          }
        }
      };
    
      reader.onerror = function() {
        console.log(reader.error);
      };
    }    
  };

  uploadTitle = "Upload" ;
  uploadSub = "Upload your file here";
  btnUploadTitle = "Upload File";
  uploadIco = faFileUpload;

  infoTitle = "Personal Information" ;
  infoSubtitle = "Check your personal info";
  infoIco = faInfoCircle;
  
  public emailInput: String ;

  constructor(private http: HttpClient) { 
    this.emailInput = "Intial value" ;
  }

  

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
