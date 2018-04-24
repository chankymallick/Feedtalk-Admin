declare var FB:any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


interface Feed {
  feedId?: number;
  urlLink?: string;
  headline?: string;
  content?: string;
  contentPreview?: string;
  headLineImage?: string;
  catagory?: string;
  authourName?: string;
  publishingDate?: string;
  published?: boolean;
  views?: number;
  shared?: number;
  likes?: number;
  dislikes?: number;
  comments?: string;
}
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  public APIHost = "http://192.168.1.6:8080";
  public feed:Feed;
  public parameterLink:string; 
  public MostRead;
  constructor(public route: ActivatedRoute, public http: HttpClient) {
    this.route.params.subscribe(params => {     
      this.parameterLink = params.Feed;   
    });
    this.getArticle();
    //this.getMostRead();
  }
  public getArticle() {
    this.http.get(this.APIHost + "/feed/FeedByUrl/"+this.parameterLink+"/").subscribe(data => {
      this.feed = data;     
    });

  }
  public shareLinks(){
    FB.ui({
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){});
  }
  public getMostRead() {
    this.http.get(this.APIHost + "/feed/mostread/top6").subscribe(data => {
      this.MostRead = data;
    });
  }
  ngOnInit() {
  }

}
