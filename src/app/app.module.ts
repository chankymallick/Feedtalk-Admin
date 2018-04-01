import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { NewuserComponent } from './newuser/newuser.component';

const appRoutes: Routes = [
  { path: 'feedUpload', component: FeedUploadComponent },
  { path: 'feedList', component: FeedListComponent },
  { path: 'newuser', component:  NewuserComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FeedUploadComponent,
    FeedListComponent,
    NewuserComponent
    
,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
