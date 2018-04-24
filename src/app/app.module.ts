import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { NewuserComponent } from './newuser/newuser.component';
import { PreviewComponent } from './preview/preview.component';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { EditfeedComponent } from './editfeed/editfeed.component';

const appRoutes: Routes = [
  { path: 'feedUpload', component: FeedUploadComponent },
  { path: 'feedList', component: FeedListComponent },
  { path: 'newuser', component:  NewuserComponent },
  { path: 'preview/:Feed', component: PreviewComponent },
  { path: 'edit/:Feed', component: EditfeedComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    FeedUploadComponent,
    FeedListComponent,
    NewuserComponent,
    PreviewComponent,
    EscapeHtmlPipe,
    EditfeedComponent
    
,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
