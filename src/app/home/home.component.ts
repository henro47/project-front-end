import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { faFileUpload, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

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

  validateID(idNumber:String)
  {
    var evenSum = "";
    var oddSum = 0 ;
    let multiSum = 0 ;
    for(let i =0;i<idNumber.length-1;i++)
    {
      var numAtIndex = parseInt(idNumber[i]);
      if(i%2 ==0)
      {
        oddSum += numAtIndex;
      }
      else
      {
        evenSum += numAtIndex
        console.log(evenSum);
      }
    }

    multiSum = parseInt(evenSum) * 2 ;
    let finalSum = 0 ;

    for(let i =0; i< multiSum.toString().length;i++)
    {
      var numAtIndex = parseInt(multiSum.toString()[i]);
      finalSum += numAtIndex;
    }

    if((oddSum + finalSum)%10==0)
    {
      return true;
    }
    return false;
  }

  inputChange(fileInputEvent: any) {
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

          if(lines[i].includes('contact') || lines[i].includes('number'))
          {
            var data = lines[i].split(':');
            (document.getElementById("contact") as HTMLInputElement).value = data[1];
          }

          if(lines[i].includes('nat') || lines[i].includes('origin'))
          {
            var data = lines[i].split(':');
            (document.getElementById("nat") as HTMLInputElement).value = data[1];
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

  btnSubmitTitle = "Submit" ;

  constructor(private http: HttpClient) { 
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

    if(this.validateID(id))
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
      });
    }
  }
  

  ngOnInit(): void {
    /*this.http.get('https://project-2-api-hfr.herokuapp.com/helloworld') 
    .subscribe(Response => { 
      console.log(Response);
      var result = [];
      for(var i in Response)
      {
        result.push([i,Response[i]]);
      }
      console.log("Array: " + result);
      //document.getElementById("test").innerHTML = result.toString();
    }); 
    */

  }
}
