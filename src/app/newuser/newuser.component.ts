declare var $: any;
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utility } from '../Utility';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent {

  email: string;
  twitterlink: string;
  usertype: string;
  username: string;
  password: string;
  active: boolean;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  public createUser() {  
    this.saveUser();   
  }
  public getUserJson() {
    var USER = {
      "email": this.email,
      "twitterlink": this.twitterlink,
      "usertype": this.usertype,
      "username": this.username,
      "password": btoa(this.password),
      "active": this.active
    }
    console.log(USER);
    return USER;
  }
  public saveUser() {
    this.http.post('http://localhost:8080/user/newuser/'+Utility.getAuthData(), this.getUserJson()).subscribe(data => { 
     console.log(data);
    }, (err: HttpErrorResponse) => {    
    });

  }

  
}
