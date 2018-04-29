declare var $;
import {Utility} from '../Utility';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  AllFeeds;
  constructor(private http: HttpClient, public router: Router) {
  }

  ngOnInit() {

    this.loadAllFeeds();
    $(document).ready(function () {
      $('#table_id').DataTable();

    });
  }

  public loadAllFeeds() {
    this.http.get('http://localhost:8080/feed/AllFeeds').subscribe(data => {
      this.AllFeeds = data;
    }, (err: HttpErrorResponse) => {

    });
  }
  public updateFeed(Feed: any, selectBoxId: string) {
    var isPublished = (<HTMLInputElement>document.getElementById("ispublished" + selectBoxId)).value;
    var order = (<HTMLInputElement>document.getElementById("viewOrder" + Feed.feedId)).value;
    Feed["published"] = isPublished;
    Feed["viewOrder"] = order;
    this.http.post('http://localhost:8080/feed/updatefeed/' + Feed.feedId + '/', Feed).subscribe(data => {
      $('#succesModal').modal('show');
      console.log(JSON.stringify(data));
    }, (err: HttpErrorResponse) => {
      $('#errorModal').modal('show');
      $("#errorMessage").html(err.message);

    });
  }
  public preview(urllink: string) {
    this.router.navigate(['preview/' + urllink]);

  }
  public edit(urllink: string) {
    this.router.navigate(['edit/' + urllink]);

  }
  public getTimeInterval(time:number){
    return Utility.getTimeInterval(time);
  }
}
