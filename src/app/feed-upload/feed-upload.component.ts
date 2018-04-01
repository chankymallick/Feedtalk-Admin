declare var $;
declare var escape:any;
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  authourName: string = "Chanky Mallick";
  published = true;
  shared = 0;

  constructor(private http: HttpClient) {

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
    console.log(this.getHeaderJson());
  }
  public upload() {
    $('.modal1').modal('show');   
    this.http.post('http://localhost:8080/feed/NewFeed', this.getHeaderJson()).subscribe(data => {
 
      // this.isResultError = true;
      // this.succesdata = JSON.stringify("Feed uploaded Succesfully");   
      console.log(JSON.stringify(data));
    }, (err: HttpErrorResponse) => {
      console.log(JSON.stringify(err));
 
      // this.isResultError = false;
      // this.succesdata = JSON.stringify(JSON.parse(err.error).message);  
    });
    $('.modal1').modal('hide');
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
      "authourName": this.authourName,
      "published": true,
      "shared": 1,
      "publishingDate": null
    };
    console.log(jsonBody);
    return jsonBody;
  }
}
