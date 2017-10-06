declare var $;
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  isResultError;
  succesdata;
  AllFeeds;
  constructor(private http: HttpClient) {
    alert("hi2");
  }

  ngOnInit() {
 
    this.loadAllFeeds();
    $(document).ready( function () {      
      $('#table_id').DataTable();
      
  } );
  }

  public loadAllFeeds() {
    this.http.get('https://localhost:8443/feed/Top20Feeds').subscribe(data => {
      this.AllFeeds = data;     
    }, (err: HttpErrorResponse) => {
      this.isResultError = false;
      this.succesdata = JSON.stringify(JSON.parse(err.error).message);
    });
  }
}
