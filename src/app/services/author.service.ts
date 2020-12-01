import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  editableJson;
  get getEditableJson(){
    return this.editableJson;
  }
  set setEditableJson(val){
    this.editableJson = val;
  }

  
  constructor(
    private http: HttpClient
  ) { }

  getSingleJsonFile(fileName){
    return this.http.get(environment.hostName +"/getJson?fileName="+fileName).pipe(map((res) => res)).toPromise();
  }

  setSingleJsonFile(data, fileName){
    return this.http.post(environment.hostName + '/postJson', {
      data: {scenes: data},
      fileName: fileName
    }).pipe(map((res) => res)).toPromise();
  }
}
