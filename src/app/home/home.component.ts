import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://project-2-api-hfr.herokuapp.com/helloworld') 
    .subscribe(Response => { 
  
      // If response comes hideloader() function is called 
      // to hide that loader  
      console.log(Response) 
    }); 
  }
}
