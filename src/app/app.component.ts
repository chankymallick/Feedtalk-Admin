declare var $;
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { Utility } from './Utility';
import { Inject, Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



interface Response {
  ATHOURIZED?: string;
  USER_TYPE?: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Utility]
})
export class AppComponent {


  LoginEmail: any;
  LoginPassword: any;

  constructor(public utility: Utility) {

  }
  ngOnInit() {
    document.getElementById("myNav").style.width = "100%";
  }

  public login() {
    Utility.setCookie("LoginEmail", btoa(this.LoginEmail), 5);
    Utility.setCookie("LoginPassword", btoa(this.LoginPassword), 5);
    Utility.setCookie("Authourized", "TRUE", 5);
    
    this.utility.httpPostRequest("user/authenticate/", "").subscribe(data => {
      var status: any = data;
      if (status != null || status != "") {
        if (status.ATHOURIZED == "TRUE") {
          Utility.setCookie("UserName", status.USER_NAME, 5);
          document.getElementById("myNav").style.display = "none";
        }
        else {
          document.getElementById("wrong_password").style.display = "block";
        }
      }
      else {
        document.getElementById("wrong_password").style.display = "block";
      }
    });
  }
}
