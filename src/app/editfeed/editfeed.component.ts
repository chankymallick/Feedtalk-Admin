declare var $;
declare var escape: any;
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


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
  tags?: string;
  viewOrder?: number;
}
@Component({
  selector: 'app-editfeed',
  templateUrl: './editfeed.component.html',
  styleUrls: ['./editfeed.component.css']
})

export class EditfeedComponent {
  title = 'Feedtalk';
  verifiedUrl = false;
  isResultError;
  succesdata = "";
  content: string;
  contentPreview: string;
  views = 0;
  urlLink: string;
  headline: string;
  headLineImage: string;
  catagory: string;
  authourName: string;
  published: boolean;
  shared = 0;
  tags: string;
  viewOrder: number;
  feedId: number;

  public APIHost = "http://localhost:8080";
  public feed: Feed;
  public parameterLink: string;
  constructor(public route: ActivatedRoute, private http: HttpClient, public router: Router) {
    this.route.params.subscribe(params => {
      this.parameterLink = params.Feed;
    });
    this.getArticle();
  }
  public getArticle() {
    this.http.get(this.APIHost + "/feed/FeedByUrl/" + this.parameterLink + "/").subscribe(data => {
      this.headline = data["headline"];
      this.urlLink = data["urlLink"];
      this.headLineImage = data["headLineImage"];
      this.authourName = data["authourName"];
      this.catagory = data["catagory"];
      this.contentPreview = data["contentPreview"];
      this.tags = data["tags"];
      this.published = data["published"];
      this.viewOrder = data["viewOrder"];
      $(".Editor-editor").html(data["content"]);
      this.feedId = data["feedId"];
    });

  }
  ngOnInit() {
    $("#txtEditor").Editor();
  }
  public isFeedUrlUnique() {
    this.http.get('http://localhost:8080/feed/editfeed').subscribe(data => {
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
    this.router.navigate(['preview/' + this.urlLink]);
  }
  public upload() {
    this.http.post('http://localhost:8080/feed/updatefeed/' + this.feedId + '/', this.getHeaderJson()).subscribe(data => {
      $('#succesModal').modal('show');
      console.log(JSON.stringify(data));
    }, (err: HttpErrorResponse) => {
      console.log(JSON.stringify(err));
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
  public htmlEncode(value: string) {
    return $('<div/>').text(value).html();
  }
  public getHeaderJson() {
    let jsonBody = {
      "content": this.getEncodedContent(),
      contentPreview: this.contentPreview,
      "urlLink": this.urlLink,
      "headline": this.headline,
      "headLineImage": this.headLineImage,
      "catagory": this.catagory,
      "authourName": $("#authourName").val(),
      "published": this.published,
      "tags": this.tags,
      "viewOrder": this.viewOrder
    };
    console.log(jsonBody);
    return jsonBody;
  }

}
