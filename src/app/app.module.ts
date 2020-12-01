import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutes } from './app.routing';
import { UploadService } from './services/upload.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes
  ],
  declarations: [	
    AppComponent,
    UploadComponent
   ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
