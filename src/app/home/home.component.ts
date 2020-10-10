import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { visitFunctionBody } from 'typescript';
import { faFileUpload} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../app.component.css']
})
export class HomeComponent implements OnInit {

  uploadTitle = "Upload" ;
  uploadSub = "Upload your file here";
  btnUploadTitle = "Upload file";
  uploadIco = faFileUpload;

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
