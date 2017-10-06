declare var $;

import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-feed-upload',
  templateUrl: './feed-upload.component.html',
  styleUrls: ['./feed-upload.component.css']
})
export class FeedUploadComponent{
  title = 'Feedtalk';
  isResultError;
  succesdata = "";
  content: string;
  views = 0;
  urlLink: string;
  headline: string;
  headLineImage: string;
  catagory: string;
  authourName: string = "Chanky Mallick";
  published = true;
  shared = 0;

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    $("#txtEditor").Editor();
  }
  public isFeedUrlUnique() {
    alert(true);
  }
  public preview() {
    console.log(this.getHeaderJson());
  }
  public upload() {
    this.http.post('https://localhost:8443/feed/NewFeed', this.getHeaderJson()).subscribe(data => {
      this.isResultError = true;
      this.succesdata = JSON.stringify("Feed uploaded Succesfully");
    }, (err: HttpErrorResponse) => {
      this.isResultError = false;
      this.succesdata = JSON.stringify(JSON.parse(err.error).message);
    });
  }
  public uploadLater() {
    alert("uploadLater");
  }
  public getEncodedContent() {
    return encodeURI($(".Editor-editor").html());
  }
  public getHeaderJson() {
    let jsonBody = {
      "content": this.getEncodedContent(),
      "views": 0,
      "urlLink": this.urlLink,
      "headline": this.headline,
      "headLineImage": this.headLineImage,
      "catagory": this.catagory,
      "authourName": this.authourName,
      "published": true,
      "shared": 1,
      "publishingDate": "1997-07-08"
    };
    console.log(jsonBody);
    return jsonBody;
  }
}
