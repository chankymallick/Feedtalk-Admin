import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedListComponent } from './feed-list/feed-list.component';

const appRoutes: Routes = [
  { path: 'feedUpload', component: FeedUploadComponent },
  { path: 'feedList', component: FeedListComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    FeedUploadComponent,
    FeedListComponent
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
