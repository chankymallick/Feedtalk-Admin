declare var $;
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  AllFeeds;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
 
    this.loadAllFeeds();
    $(document).ready( function () {      
      $('#table_id').DataTable();
      
  } );
  }

  public loadAllFeeds() {
    this.http.get('http://localhost:8080/feed/AllFeeds').subscribe(data => {
      this.AllFeeds = data;     
    }, (err: HttpErrorResponse) => {
   
    });
  }
  public updateFeed(Feed:any,selectBoxId:string){
    var isPublished = (<HTMLInputElement>document.getElementById("ispublished"+selectBoxId)).value;   
    this.http.post('http://localhost:8080/feed/updatepublish/'+Feed.feedId+'/'+isPublished+'',"").subscribe(data => {
     alert(data)
    }, (err: HttpErrorResponse) => {
      alert(err)
     
    });
  }
}
