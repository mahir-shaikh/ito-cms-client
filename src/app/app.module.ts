import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutes } from './app.routing';
import { UploadService } from './services/upload.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './author/author.component';
import { AuthorService } from './services/author.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes
  ],
  declarations: [		
    AppComponent,
    UploadComponent,
      AuthorComponent
   ],
  providers: [UploadService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
