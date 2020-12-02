import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadJson(formData) {
    return this.http.post(environment.hostName + '/uploadJson', formData).pipe(map((res) => res)).toPromise();
  }

  getAllJsonFiles(){
    return this.http.get(environment.hostName +"/getAllJson").pipe(map((res) => res)).toPromise();
  }

  deleteFile(fileName){
    return this.http.delete(environment.hostName + '/deleteJson?fileName='+fileName).pipe(map((res) => res)).toPromise();
  }

}
