declare var $;
declare var escape:any;
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utility } from '../Utility';

@Component({
  selector: 'app-feed-upload',
  templateUrl: './feed-upload.component.html',
  styleUrls: ['./feed-upload.component.css']
})
export class FeedUploadComponent {
  title = 'Feedtalk';
  verifiedUrl = false;
  isResultError;
  succesdata = "";
  content: string;
  contentPreview :string;  
  views = 0;
  urlLink: string;
  headline: string;
  headLineImage: string;
  catagory: string;
  authourName: string = Utility.getCookie("UserName");
  published = false;
  shared = 0;
  tags:string;
  viewOrder:number;
  constructor(private http: HttpClient,public router:Router) {

  }
  ngOnInit() {
    $("#txtEditor").Editor();
  }
  public isFeedUrlUnique() {
    this.http.get('http://localhost:8080/feed/NewFeed').subscribe(data => {
      if (data == "true") {
        this.verifiedUrl = true;
      }
      else {
        this.verifiedUrl = false;
      }
    }, (err: HttpErrorResponse) => {
      this.isResultError = false;
      this.succesdata = JSON.stringify(JSON.parse(err.error).message);
    });
  }
  public preview() {    
    this.router.navigate(['preview/' +this.urlLink]);
  }
  public upload() {
     
    this.http.post('http://localhost:8080/feed/NewFeed', this.getHeaderJson()).subscribe(data => { 
      $('#succesModal').modal('show');
    }, (err: HttpErrorResponse) => {         
      $('#errorModal').modal('show');
      $("#errorMessage").html(err.message);
    });
   
  }
  public uploadLater() {
    alert("uploadLater");
  }
  public getEncodedContent() {
    return $(".Editor-editor").html();
  }
  public htmlEncode(value:string){    
    return $('<div/>').text(value).html();
  }
  public getHeaderJson() {
    let jsonBody = {
      "content": this.getEncodedContent(),
      contentPreview :this.contentPreview,
      "views": 0,
      "urlLink": this.urlLink,
      "headline": this.headline,
      "headLineImage": this.headLineImage,
      "catagory": this.catagory,
      "authourName": $("#authourName").val(),
      "published": false,
      "shared": 0,
      "publishingDate": null,
      "tags":this.tags,
      "viewOrder":this.viewOrder
    };
    console.log(jsonBody);
    return jsonBody;
  }
}
